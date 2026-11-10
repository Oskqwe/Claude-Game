"""Bundle The Member into one self-contained HTML file (CSS and scripts inlined).

Usage:  python3 tools/bundle.py [out.html] [--fragment]
  --fragment  omit <!doctype>/<html>/<head>/<body> (for hosts that add their own skeleton)
"""
import re
import sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
args = [a for a in sys.argv[1:] if not a.startswith('--')]
fragment = '--fragment' in sys.argv
out = Path(args[0]) if args else root / 'dist' / 'the-member.html'

html = (root / 'index.html').read_text(encoding='utf-8')
html = html.replace('<link rel="stylesheet" href="css/theme.css">',
                    '<style>\n' + (root / 'css/theme.css').read_text(encoding='utf-8') + '\n</style>')
html = re.sub(r'<script src="([^"]+)"></script>',
              lambda m: '<script>\n' + (root / m.group(1)).read_text(encoding='utf-8') + '\n</script>', html)

if fragment:
    head = re.search(r'<head>(.*?)</head>', html, re.S).group(1)
    head = re.sub(r'<meta (charset|name="viewport")[^>]*>\s*', '', head)
    body = re.search(r'<body>(.*?)</body>', html, re.S).group(1)
    html = head.strip() + '\n' + body.strip() + '\n'

out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(html, encoding='utf-8')
print(f'wrote {out} ({out.stat().st_size // 1024} KB)')
