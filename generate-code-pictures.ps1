
$CodePicTemplate = @'

# {0}

![]({1})

'@

if (-not (Test-Path -Path "./generated-code-pictures"))
{
    New-Item -ItemType directory -Path "./generated-code-pictures"
}

cd generated-code-pictures

Get-ChildItem -Path "../src" -Filter "*.tsx" -Recurse -File | ForEach-Object {
    carbon-now $_.FullName -p csp-pic -t ($_.BaseName+$_.Extension)
}

Get-ChildItem -Path "../src" -Filter "*.css" -Recurse -File | ForEach-Object {
    carbon-now $_.FullName -p csp-pic -t ($_.BaseName+$_.Extension)
}

$MarkdownFile = ""

Get-Childitem -Path "." -Filter "*.png" -File | ForEach-Object {
    $MarkdownFile = $MarkdownFile + [string]::Format($CodePicTemplate, $_.BaseName+$_.Extension, $_.BaseName+$_.Extension)
}

Out-File -FilePath .\Document.md -InputObject $MarkdownFile -Encoding utf8

pandoc -o Document.docx -f markdown -t docx Document.md

cd ..
