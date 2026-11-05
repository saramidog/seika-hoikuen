# 清華保育園サイトの表示フォント

Google Fonts 配布の M PLUS Rounded 1c（400 / 700）、Kaisei Decol（400）を、サイト全9ページの文字に絞って取得した WOFF2 です。原ライセンスを同梱しています。

- 配布元: https://fonts.google.com/
- 最適化方法: https://developers.google.com/fonts/docs/getting_started#optimizing_your_font_requests
- 取得日: 2026-10-01
- 追加取得: 2026-11-05 — こども誰でも通園制度のページで新しく使った15字（仰勢吸呼庁泣渡療盆短硬落薬補複）を、M PLUS Rounded 1c 400 / 700 の `*-5.woff2` として同じ版から取得し、`home.css` に `unicode-range` 付きで追加しました。
- 本文に新しい漢字等を追加したとき、収録外の文字はCSSに指定した日本語フォールバックフォントで表示されます。必要に応じて配布元から対象文字を含むサブセットを再取得してください。

500 の文字は 400、700 の文字は 700 の実フォントを使用しています。

更新用スクリプト（`tools/update-display-fonts.py`）はこのリポジトリに含まれていません。文字を追加した場合は、配布元の `text=` 指定で必要な文字を含むサブセットを再取得し、`home.css` の `BEGIN LOCAL FONTS`〜`END LOCAL FONTS` の範囲とこのフォルダーのWOFF2を置き換えてください。
