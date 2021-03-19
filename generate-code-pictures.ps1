
# Template string for the first picture of a set of pictures
$CodePicTemplate = @'

# {0}

![]({1})

'@

# Additional code pictures
$AdditionalPic = @'

![]({0})

'@

# Create /generated-code pictures if not generated
if (-not (Test-Path -Path "./generated-code-pictures"))
{
    New-Item -ItemType directory -Path "./generated-code-pictures"
}

# Go into /generated-code-pictures. This is the output directory
cd generated-code-pictures

function GeneratePics($filter)
{
    # Recursively search through /src for all files that match the filter
    Get-ChildItem -Path "../src" -Filter $filter -Recurse -File | ForEach-Object {
        # Get the amount of 25 line segments
        $lines = [Math]::Ceiling((Get-Content $_.FullName | Measure-Object -Line).Lines / 25)
        echo $lines
        # Make a picture for each of those 25 line segments
        for ($i = 0; $i -lt $lines; $i += 1)
        {
            carbon-now $_.FullName -p csp-pic -t ($_.BaseName+$_.Extension+"--$i") -s ($i * 25) -e (($i * 25) + 24)
            if ($?) # if error
            {
                $i -= 1 # decrement $i to try to generate the pic again
            }
        }
    }
}

# Generate code pictures
GeneratePics "*.tsx"
GeneratePics "*.css"

# Output markdown file
$MarkdownFile = ""

# For every picture in the folder (hopefully ordered)
Get-Childitem -Path "." -Filter "*.png" -File | ForEach-Object {
    # Split the name of the file
    $splitname = $_.BaseName.Split("--") # Output: @("filename", "", "number") # Don't ask why it generates an empty string at [1]. Thats just powershell...
    if ($splitname[2] -eq "0") # If the number in the file name is 0
    {
        # Create the title and picture markup
        $MarkdownFile = $MarkdownFile + [string]::Format($CodePicTemplate, $splitname[0], $_.BaseName+$_.Extension)
    }
    else # If it is any other number or string
    {
        # Create the picture markup
        $MarkdownFile = $MarkdownFile + [string]::Format($AdditionalPic, $_.BaseName+$_.Extension)
    }
}

# Output the markdown
Out-File -FilePath .\Document.md -InputObject $MarkdownFile -Encoding utf8

# Run the markdown through pandoc to create a docx file
pandoc -o Document.docx -f markdown -t docx Document.md

# Go back to the starting folder
cd ..

# And that, my dudes, is the Art of the Bodge!
