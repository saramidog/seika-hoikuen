"""公開用フォルダーの中で、ページが参照するファイルとページ内リンクがそろっているかを確認する。

使い方: python3 .github/scripts/check-site.py _site
（リポジトリ直下を指定すれば、手元のファイルのままでも確認できる）
"""
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(sys.argv[1] if len(sys.argv) > 1 else '.').resolve()
CSS_URL = re.compile(r"url\(\s*['\"]?([^'\")]+)['\"]?\s*\)")


class Collector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        for name in ('src', 'href'):
            if attrs.get(name) and not (tag == 'link' and attrs.get('rel') == 'canonical'):
                self.refs.append(attrs[name])
        for candidate in (attrs.get('srcset') or '').split(','):
            if candidate.strip():
                self.refs.append(candidate.split()[0])


def is_local(ref):
    return not re.match(r'^(?:[a-z]+:|//|#)', ref, re.I)


pages = {}
problems = []
for page in sorted(ROOT.glob('*.html')):
    collector = Collector()
    collector.feed(page.read_text(encoding='utf-8'))
    pages[page.name] = collector

for name, collector in pages.items():
    for ref in collector.refs:
        if ref.startswith('#'):
            if ref[1:] and ref[1:] not in collector.ids:
                problems.append(f'{name}: ページ内リンク先がありません {ref}')
            continue
        if not is_local(ref):
            continue
        parts = urlsplit(ref)
        target = unquote(parts.path)
        if not (ROOT / target).exists():
            problems.append(f'{name}: ファイルがありません {ref}')
        elif parts.fragment and target in pages and parts.fragment not in pages[target].ids:
            problems.append(f'{name}: リンク先の見出しがありません {ref}')

for sheet in sorted(ROOT.glob('*.css')):
    for ref in CSS_URL.findall(sheet.read_text(encoding='utf-8')):
        if is_local(ref) and not (sheet.parent / unquote(urlsplit(ref).path)).exists():
            problems.append(f'{sheet.name}: ファイルがありません {ref}')

if problems:
    print('\n'.join(problems))
    sys.exit(1)
print(f'OK: {len(pages)}ページの参照ファイルとリンク先を確認しました。')
