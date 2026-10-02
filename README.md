# Bozkurt Robotik — Web Sitesi V2

Türkçe ve İngilizce, hareketli kurumsal ürün tanıtım sitesi.
Statik HTML / CSS / JavaScript. Paket yöneticisi, derleme veya sunucu kodu gerektirmez.

## Önce bilgisayarda inceleyin
ZIP dosyasını bir klasöre çıkarın ve `index.html` dosyasını açın.
Üstteki TR / EN düğmeleri, ürün ayrıntıları, yazılım sekmeleri ve animasyon kontrolü kullanılabilir.
İletişim bağlantıları e-posta uygulamasını açar; siteden otomatik e-posta gönderilmez.

## Mevcut siteyi güncelleme
1. Mevcut `muhammedaliturk/bozkurt-robotik-website` reposunu açın.
2. `Add file` > `Upload files` seçin.
3. ZIP dosyasını DEĞİL, çıkarılmış dosya ve klasörlerin tamamını yükleyin.
   Dıştaki `bozkurt-robotik-v2` klasörünü yüklemeyin.
   `index.html`, `styles.css`, `script.js`, `en` ve `assets` repo kökünde kalmalıdır.
4. Aynı adlı dosyaları bu sürümle güncelleyin. Yeni `en` klasörünü de ekleyin.
5. Değişiklikleri `main` dalına kaydedin (Commit changes).
6. Cloudflare Pages otomatik dağıtımının başarıyla tamamlanmasını bekleyin.
7. Türkçe ana sayfayı ve `/en/` sayfasını kontrol edin. Gerekirse Ctrl+F5 ile yenileyin.

Yeni repo veya yeni Cloudflare projesi açmayın.
DNS, alan adı, SSL ve e-posta kayıtlarını değiştirmeyin.

Mevcut Cloudflare ayarları:
- Production branch: main
- Framework preset: None
- Build command: boş
- Build output directory: /

## Dil yapısı
- `index.html`: Türkçe
- `en/index.html`: İngilizce
- `script.js`: iki dilde etkileşimli içerikler ve ürün ayrıntıları
- Firma adı iki dilde de Bozkurt Robotik olarak kalır.
- Dil düğmeleri mevcut sayfa bölümünün bağlantısını korur.
- Başlık, açıklama, alternatif dil ve canonical etiketleri iki sürümde ayrı tanımlıdır.
- Ana sayfanın bütün metni JavaScript olmadan da okunabilir.
- 404 sayfaları da her dil için hazırlanmıştır.

## Animasyonlar
- Fare hareketine hafif tepki veren, matematiksel olarak çizilen üç boyutlu görünümlü halka.
- Konum / Hız / Akım düğmeleriyle değişen kavram gösterimi.
- Kaydırma ile değişen kontrol akışı vurguları.
- Görünür olduklarında açılan içerik geçişleri.
- Sekmeli yazılım arayüzü ve gösterim amaçlı grafik geçişleri.
- Ürün kartlarında hareket ve etkileşim.
- Üst menüde animasyonları durdurma / oynatma düğmesi.
- İşletim sisteminin azaltılmış hareket tercihine destek.
- Sayfa veya animasyon alanı görünmüyorken sürekli çizim durdurulur.
- Mobilde kare hızı ve piksel yoğunluğu sınırlandırılmıştır.
- Harici animasyon kütüphanesi, yazı tipi dosyası veya video indirmesi gerekmez.

## Logolar
- `assets/bozkurt-robotik-logo.png`: şeffaf zeminli tam logo
- `assets/bozkurt-robotik-logo.webp`: optimize edilmiş tam logo
- `assets/bozkurt-amblem.webp`: üst menü ve animasyon için amblem
- `assets/favicon.png`: tarayıcı simgesi

Beyaz arka plan, kullanıcının verdiği orijinal görüntü üzerinden temizlenmiştir.
Çizim yeniden üretilmemiştir. Tam logo korunmuştur.

## İçerik ve dürüst gösterim
Ürün görselleri ve yazılım grafikleri mimari / kavram gösterimidir.
Gerçek ürün fotoğrafı, motor telemetrisi, doğrulanmış performans veya çalışan
ürün arayüzü olarak sunulmaz. Gerçek ürün çekimleri geldiğinde değiştirilmelidir.

Motor kontrolcü ve ileri seviye IMU geliştirme durumları açıkça belirtilmiştir.
15–20 dakikalık ifade yalnızca hedeflenen kullanıcı deneyimidir.
Göreli altı haftalık satış takvimi ve doğrulanmamış elektriksel özellikler eklenmemiştir.
Yeni sensör veya motor özellikleri eklemeden önce teknik verileri doğrulayın.

## E-posta
`info@bozkurtrobotik.com` bağlantıları e-posta uygulamasını açar.
Bu paket MX, SPF, DKIM veya DMARC ayarı yapmaz.
Posta kutusunun gönderme / alma testi ve DKIM / DMARC çalışmaları ayrı süreçtir.

## Kontroller
Her iki dilde 320, 360, 390, 768, 1024, 1280 ve 1440 piksel genişlikte yerel
Chromium görüntüleme ve etkileşim testleri yapılmıştır.
Menü, dil bağlantı hedefleri, ürün pencereleri, Escape ile kapatma, sekmeler,
klavye okları, hareketi durdurma, azaltılmış hareket, JavaScript kapalı içerik,
görsel dosyaları ve yerel dosya yolları kontrol edilmiştir.
Canlı sunucuya dağıtım veya gerçek iPhone / Safari testi yapılmış değildir.

## Düzenleme
Statik sayfa metinleri için iki HTML dosyasını birlikte güncelleyin.
Ürün penceresi veya etkileşimli metin değişikliklerinde `script.js` içindeki
Türkçe ve İngilizce karşılıklarını birlikte düzenleyin.
Renk, boyut ve düzen ayarları `styles.css` içindedir.

## English quick start
Extract the archive and open index.html. The English version is en/index.html.
Upload the CONTENTS of this folder to the existing repository root and commit
to main. Keep the existing Cloudflare Pages configuration unchanged.
This is a static presentation website, not an e-commerce or email backend.

Reference documentation:
https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/
https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository


## V3 refinements
- Responsive overlap prevention across desktop/tablet/mobile breakpoints.
- Team section redesigned as equal capability cards.
- Mehmet Can Yıldız profile updated to reflect graduation and current engineering career.
- Additional layout polish for hero, software tabs, products and contact area.


## V3.1 correction
- Mehmet Can Yıldız education corrected to Fatih Sultan Mehmet Vakıf University, Electrical and Electronics Engineering.
- Professional status updated to indicate he is a graduate and currently works as an engineer.
