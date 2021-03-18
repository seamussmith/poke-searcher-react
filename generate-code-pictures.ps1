
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

cd ..
