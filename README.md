# Bozkurt Robotik — V3.6 (masaüstü + yayın önbelleği düzeltmesi)

Bu ZIP, **tam sitenin tüm dosyalarını** içerir. `/` ve `/en/` sayfaları, ürün kartları, logolar, 404 sayfaları, animasyonlar ve bütün statik kaynaklar dahildir.

## Yapılan düzeltmeler

- Yeni HTML, eski CSS/JS ile karışmasın diye içerik hash'li dosyalar kullanır: `styles-918c1de88797.css` ve `script-558e20d3e2f1.js`.
- `styles.css` ve `script.js` düzenlenebilir kaynak kopyaları olarak ayrıca korunur; sayfanın kullandığı dosyalar üstteki hash'li sürümlerdir. İleride kodu değiştirirsen yeni hash'li dosya oluşturup HTML bağlantısını da yenile.
- Motor kontrolcü ve standart IMU render görselleri yeni dosya adlarıyla bağlandı (`-v36`), böylece eski görsel önbelleği etkisiz kalır.
- Cloudflare `_headers` içindeki `/assets/*` için **24 saat önbellekleme** kuralı kaldırıldı. Cloudflare Pages'in otomatik revalidation davranışı kullanılacak.
- Masaüstünde özellikle 961–1240 piksel aralığında hero ve ürün kartlarının taşma/yerleşim kuralları güçlendirildi; 961–1100 px aralığında birinci ürün kartı iki sütuna yayılır.
- Mobil düzen ve mevcut görsel animasyonları korunmuştur.

## Tam güncelleme — GitHub ve Cloudflare Pages

1. Mevcut GitHub `main` sürümünün bir yedeğini al.
2. ZIP'i **çıkar**; ZIP dosyasının kendisini GitHub'a yükleme.
3. Eski site dosyalarını kaldıracaksan arşivdeki **tüm dosyaları ve klasörleri** repo köküne yükle. `assets/` ve `en/` klasörlerinin tam yüklendiğini kontrol et.
4. `main` dalına commit et; Cloudflare Pages dağıtımının **Success** olduğunu doğrula.
5. Yeni bir proje veya alan adı açma. Cloudflare ayarları: Framework None; build command boş; output directory `/`; branch `main`.
6. `https://bozkurtrobotik.com/styles-918c1de88797.css` ve `https://bozkurtrobotik.com/script-558e20d3e2f1.js` adreslerinin 200 döndüğünü, içeriğin CSS/JavaScript olduğunu kontrol et.
7. Siteyi bilgisayarda Ctrl+Shift+R ile yenile ve gizli pencerede test et. Gerekirse Cloudflare Caching > Configuration > Purge Everything uygulamasını **yalnızca hâlâ eski sürüm geliyorsa** dene.

**Önemli:** GitHub'a yalnızca `index.html` yükleyip CSS/JS dosyalarını eksik bırakmak sitenin biçimini bozar. Tek commit içinde bütün arşiv içeriği bulunmalıdır.

## Dosya düzeni

- `index.html`, `en/index.html`, `404.html`, `en/404.html`
- `styles-918c1de88797.css` ve `script-558e20d3e2f1.js` (**aktif** CSS/JavaScript)
- `styles.css`, `script.js` (aynı içeriklerin düzenlenebilir kök kopyaları)
- `assets/` (tüm amblem ve render görselleri)
- `robots.txt`, `sitemap.xml`, `_headers`

## Doğrulama kapsamı

Bu dosyalar için bütünlük, görsel/dosya bağlantıları, iki dilde CSS/JS URL'leri ve JavaScript/CSS sözdizimi **statik olarak** kontrol edilir. Canlı tarayıcı ekran görüntüsü veya Cloudflare dağıtımı bu ortamdan doğrulanamadı; canlıda her sorunun çözüldüğü garanti edilmez.
