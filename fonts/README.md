# 清華保育園サイトの表示フォント

Google Fonts 配布の M PLUS Rounded 1c（400 / 700）、Kaisei Decol（400）を、サイト全9ページの文字に絞って取得した WOFF2 です。原ライセンスを同梱しています。

- 配布元: https://fonts.google.com/
- 最適化方法: https://developers.google.com/fonts/docs/getting_started#optimizing_your_font_requests
- 取得日: 2026-10-01
- 本文に新しい漢字等を追加したとき、収録外の文字はCSSに指定した日本語フォールバックフォントで表示されます。必要に応じて配布元から対象文字を含むサブセットを再取得してください。

500 の文字は 400、700 の文字は 700 の実フォントを使用しています。

更新用スクリプト: `python3 tools/update-display-fonts.py`（Google Fontsへの読み取り通信と、フォント・home.cssの更新を行います）。
