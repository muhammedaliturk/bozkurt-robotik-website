# Bozkurt Robotik website

Bilingual static website, served by Cloudflare Pages from the GitHub `main` branch. No build command, server-side framework or runtime package installation is required.

| Page | Turkish | English |
| --- | --- | --- |
| Home | `/` | `/en/` |
| Products | `/#products` | `/en/#products` |
| BRX-100 | `/brx-100` | `/en/brx-100` |

## Design revision 4.0

The shared design system improves typography, contrast, navigation, product cards and responsive layouts. `design-tokens.css` owns common tokens, `styles.css` shared components, `home-layout.css` homepage layouts and `brx-100.css` product details. Current pages share `script.js`. Historical hashed assets remain for cached clients.

The BRX-100 assembly animation plays once per tab session and retains one assembled PCB image on repeat visits. Product measurements, logo, datasheet, five library downloads and URL redirects are preserved.

Validation before publication: 58 Chromium checks passed, covering six pages at seven viewport widths, keyboard navigation, downloads, reduced motion and home-to-product/repeat-visit animation flows. The reusable authoring and test project is maintained separately from this public deployment directory.

The bilingual datasheet is `docs/BRX-100_Datasheet_RevC.pdf`. Platform libraries are in `downloads/`; preview packages retain their documented scope. Keep these filenames stable.

For local review, run `python -m http.server 8765 --bind 127.0.0.1` from this folder and open the `.html` URLs. Production supports extensionless routes. Before publishing, verify both home-to-product links, language switching, datasheet and library downloads.
