#!/bin/bash

# Fetch HTML from localhost:1234
html_content=$(curl -s http://localhost:1234/)

# Extract the CSS path using awk
css_path=$(echo "$html_content" | awk -F'href="' '/<link rel="stylesheet" href="\/[^"]+\.css"/{split($2,a,"\""); print a[1]}')

# Check if css_path is found
if [ -z "$css_path" ]; then
    echo "CSS path not found."
    exit 1
fi

# Replace the CSS path in src/admin/index.js
sed -i '' "s@CMS.registerPreviewStyle(\".*\")@CMS.registerPreviewStyle(\"$css_path\")@" ./src/admin/index.js

echo "Updated CSS path to $css_path in src/admin/index.js"
