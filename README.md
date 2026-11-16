# Bozkurt Robotik — Website V3.7

Bilingual static website with IMU resource downloads. No build step. Source pages: `index.html`, `en/index.html`.

## Changes
- BRX-100 opens a dedicated product page from the full card on each homepage. Specifications and downloads are at `brx-100.html` and `en/brx-100.html`.
- Founder/team cards removed from both pages. Company About section retained.
- New BR-IMU-M1 downloads area is linked from the standard IMU product card.
- Original Arduino driver 0.2.1 and previously authored bilingual Rev B datasheet bundled unchanged.
- Teensy, ESP32 and STM32 HAL previews are newly produced integration packages, **not** validated production releases.
- Media, animations and mobile/desktop design from V3.6 preserved; new hashed CSS filename avoids stale browser cache.

## Installation / Yükleme
1. Extract the ZIP. The contents of THIS folder go directly to the existing GitHub repository root.
2. Include **all** files and the `docs/`, `downloads/`, `assets/`, `en/` directories.
3. Remove obsolete hashed CSS and JS files from the GitHub repo if replacing all site files; do not remove the current hashed file referenced by the HTML.
4. Push to `main` for Cloudflare Pages. No new project, DNS or build configuration is necessary.
5. Check `/`, `/en/`, `/docs/BR-IMU-M1_Datasheet_Bilingual_RevB.pdf`, and each `/downloads/*.zip` URL on the live domain after deployment.
6. Open in a private browser tab or do a hard refresh if the old CSS is cached.

## Important technical note
The original `IMU_ZR_Arduino_v0.2.1.zip` includes hardware validation for the six-axis LSM6DSOX path on Arduino Mega. Its 9-axis path is not validated because the magnetometer did not respond in the tested board configuration. The provided datasheet is Rev B preliminary, not a guarantee of board-level qualification. Port-specific previews require compilation and electrical validation on each target before any product/field use.

## Software download contents
- Arduino: original `IMU_ZR_Arduino_v0.2.1.zip`, unchanged.
- Teensy 4.x: original Arduino-core driver plus Teensy example, preview.
- ESP32: original Arduino-core driver plus generic ESP32 DevKit example, preview.
- STM32: native STM32Cube HAL LSM6DSOX six-axis driver preview, plus separate STM32duino Arduino-core port as alternative; no native magnetometer or fusion support.

All links are static same-origin resources served by Cloudflare Pages; no backend or download service is required.
