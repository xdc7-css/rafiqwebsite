#!/usr/bin/env python3
import os

print('=== Gallery Removal Verification ===')
print()

# Check all files for gallery references
all_good = True
for file in ['index.html', 'css/main.css', 'css/responsive.css', 'css/animations.css', 'js/main.js', 'config.json']:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        if 'gallery' in content.lower():
            print('X', file, ': contains gallery references')
            all_good = False
        else:
            print('O', file, ': clean')
    except FileNotFoundError:
        print('X', file, ': not found')
        all_good = False

print()
if all_good:
    print('SUCCESS: Gallery section completely removed from website!')
    print()
    print('Changes verified:')
    print('  - HTML: Gallery navigation removed')
    print('  - HTML: Gallery section removed')
    print('  - CSS: All gallery styling removed')
    print('  - CSS: All gallery animations removed')
    print('  - JS: Gallery render functions removed')
    print('  - Config: Gallery screenshots removed')
else:
    print('Gallery references still exist')
