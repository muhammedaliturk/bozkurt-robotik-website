# Bozkurt Robotik — Tam site paketi V3.5

Bu ZIP, mevcut sitenin **tamamını** içerir ve depodaki önceki site dosyalarının yerini alabilir. Modern derleyici, paket yöneticisi veya harici JavaScript/CSS bağımlılığı yoktur.

## Ürün görselleri — V3.5

- Akıllı DC Motor Kontrolcü: gönderilen PCB render'ı `assets/motor-controller-render.png` ve optimize WebP sürümü. Arka planı şeffaflaştırıldı, kartın animasyonu etkinleştirildi. Görsel HTML'ye doğrudan bağlandı; JavaScript kapalı olsa bile gösterilir.
- Standart 9 DoF IMU: özgün render `assets/imu-standard-render.png` ve WebP sürümü. Görsel kartın içindeki ayrılmış alanla sınırlandırıldı; etiket, başlık ve ürün açıklamalarının üzerine taşamaz.
- Her iki üründe yavaş süzülme, hafif ışık ve gölge, masaüstünde fare hareketiyle sınırlı perspektif animasyonu bulunur.
- Animasyonları durdur/oynat ve işletim sistemi 'hareketi azalt' tercihi desteklenir.
- Türkçe ve İngilizce sayfalar eşdeğerdir.

## Dosya yapısı

- `index.html` — Türkçe ana sayfa
- `en/index.html` — İngilizce ana sayfa
- `404.html` ve `en/404.html` — hata sayfaları
- `styles.css` — responsive tasarım ve animasyonlar
- `script.js` — etkileşimler
- `assets/` — Bozkurt logosu/amblem/favicon ve iki ürünün PNG/WebP render görselleri
- `_headers`, `robots.txt`, `sitemap.xml` — site yapılandırması

## Mevcut GitHub deposunda yayınlama

1. Geri dönüş imkanı için mevcut `main` commit'ini veya ZIP yedeğini saklayın.
2. Arşivi çıkarın. İçeriği (dış klasörü değil) mevcut `muhammedaliturk/bozkurt-robotik-website` deposunun köküne yükleyin.
3. `index.html`, `styles.css`, `script.js`, `en/`, `assets/` dahil paket içindeki dosyaların kökte kalmasına dikkat edin.
4. `main` dalına commit edin. Cloudflare Pages aynı projeyi yeniden yayımlar.
5. `/` ve `/en/` sayfalarını, standart IMU ve motor kartlarını kontrol edin. Gerekirse Ctrl+F5 ile yenileyin.

Yeni repo, yeni Cloudflare projesi, DNS, SSL veya e-posta ayarı oluşturmayın.
Cloudflare Pages: branch `main`; framework preset `None`; build command boş; output directory `/`.

## Testler ve notlar

- Her iki HTML'de ürün görsellerinin `src/srcset` adresleri dosyalarda bulunur.
- Görsel alanı ile metin ayrı HTML/CSS grid satırlarında tutulur.
- Ürün detay pencereleri, diğer sayfalar ve bağlantılar korunmuştur.
- Dosya bütünlüğü ve sözdizimi kontrol edildi; canlı domaine gönderim yapılmadı.
- Marka amblemi ve logolar önceki tam site paketinden korundu.
