
$CodePicTemplate = @'

# {0}

![]({1})

'@

$AdditionalPic = @'

![]({0})

'@

if (-not (Test-Path -Path "./generated-code-pictures"))
{
    New-Item -ItemType directory -Path "./generated-code-pictures"
}

cd generated-code-pictures

Get-ChildItem -Path "../src" -Filter "*.tsx" -Recurse -File | ForEach-Object {
    $lines = [Math]::Ceiling((Get-Content $_.FullName | Measure-Object -Line).Lines / 25)
    echo $lines
    for ($i = 0; $i -lt $lines; $i += 1)
    {
        carbon-now $_.FullName -p csp-pic -t ($_.BaseName+$_.Extension+"--$i") -s ($i * 25) -e (($i * 25) + 24)
    }
}

Get-ChildItem -Path "../src" -Filter "*.css" -Recurse -File | ForEach-Object {
    $lines = [Math]::Ceiling((Get-Content $_.FullName | Measure-Object -Line).Lines / 24)
    echo $lines
    for ($i = 0; $i -lt $lines; $i += 1)
    {
        carbon-now $_.FullName -p csp-pic -t ($_.BaseName+$_.Extension+"--$i") -s ($i * 25) -e (($i * 25) + 24)
    }
}

$MarkdownFile = ""

Get-Childitem -Path "." -Filter "*.png" -File | ForEach-Object {
    $splitname = $_.BaseName.Split("--")
    if ($splitname[2] -eq "0")
    {
        $MarkdownFile = $MarkdownFile + [string]::Format($CodePicTemplate, $splitname[0], $_.BaseName+$_.Extension)
    }
    else
    {
        $MarkdownFile = $MarkdownFile + [string]::Format($AdditionalPic, $_.BaseName+$_.Extension)
    }
}

Out-File -FilePath .\Document.md -InputObject $MarkdownFile -Encoding utf8

pandoc -o Document.docx -f markdown -t docx Document.md

cd ..
