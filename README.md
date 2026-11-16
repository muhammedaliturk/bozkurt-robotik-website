# Bozkurt Robotik website

A bilingual static site served through Cloudflare Pages from the GitHub `main` branch. No build command is required.

| Page | Turkish | English |
| --- | --- | --- |
| Home | `index.html` | `en/index.html` |
| Products | `index.html#products` | `en/index.html#products` |
| BRX-100 | `brx-100.html` | `en/brx-100.html` |

The current bilingual datasheet is `docs/BRX-100_Datasheet_RevC.pdf`. Platform libraries are under `downloads/`. Keep distribution filenames stable for existing links.

For local review, run `python -m http.server 8765 --bind 127.0.0.1` at the repository root. Verify both home-to-product links, the language switch, datasheet and library downloads before publishing.
