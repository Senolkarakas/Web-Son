# Implementation Plan - Kullanıcı İskelet Güncellemeleri

Kullanıcının özel istekleri doğrultusunda web sitesi içeriğinde aşağıdaki revizyonlar yapılmaktadır:

## User Review Required

> [!IMPORTANT]
> **Yapılacak Değişiklikler:**
> 1. **Hero Section (Manşet)**: Ana büyük başlık sadece **"Filistin'e Özgürlük"** olacak, üstünde ise **"Filistin Direnişinin Kazanması için Bir Aradayız"** ifadesi yer alacak.
> 2. **Köşe Yazarları**: Yazar listesi güncellenerek: Fatma Akdokur, Ümit Aktaş, Melek Ulagay, Şenol Karakaş, Fatma Örgel, Kamile Batur, Nimet Yallıaltın, Şebnem Sözer, Mehmet Ali Devecioğlu ve Hakan Tahmaz isimleri eklenecek.
> 3. **Kültür Fotoğraf Galerisi**: Bu bölüm tamamen kaldırılacak.
> 4. **Eylem ve Etkinlik Çağrısı**: Canlı geri sayım sayacının yanında **Eylem Duyuruları Alanı** ve **Stant Çağrıları Alanı** (Bilgilendirme stantları & bildiri dağıtımı) oluşturulacak.
> 5. **Filistin'e Özgürlük Tartışmaları**: Bu bölüm platformun **YouTube Programları, Canlı Yayınları ve Video Söyleşilerinin** yayınlandığı dijital yayın merkezine dönüştürülecek.

## Proposed Changes

### [Frontend Components]

#### [MODIFY] [index.html](file:///Users/yoda/.gemini/antigravity/scratch/filistine-ozgurluk/index.html)
- Hero bölümü metinleri güncellendi.
- Yazar kartları 10 yazarın ismiyle yapılandırıldı.
- `#galeri` bölümü HTML'den tamamen çıkarıldı.
- Eylem bölümünde "Miting & Yürüyüş Duyuruları" ve "Stant & Bildiri Çağrıları" ayrıştırıldı.
- Tartışmalar bölümü "Filistin'e Özgürlük YouTube Programları" konseptine dönüştürüldü.

#### [MODIFY] [style.css](file:///Users/yoda/.gemini/antigravity/scratch/filistine-ozgurluk/style.css)
- Hero başlık boyutu ve rozet stili güncellendi.
- 10 yazarlık grid yapısı ve YouTube video player kart stilleri eklendi.
- Stant duyuruları ve eylem kartları için özel rozetler tanımlandı.

#### [MODIFY] [script.js](file:///Users/yoda/.gemini/antigravity/script.js)
- Galeri kodu temizlendi.
- YouTube video oynatıcı simülasyonu ve yazar makaleleri 10 yazara göre güncellendi.

## Verification Plan

### Manual Verification
- Manşette büyük yazıyla "Filistin'e Özgürlük" ve üstünde "Filistin Direnişinin Kazanması için Bir Aradayız" yazısının göründüğünün teyit edilmesi.
- 10 yazarın (Fatma Akdokur, Ümit Aktaş, Melek Ulagay vd.) kartlarının düzgün görüntülendiğinin kontrolü.
- Fotoğraf galerisi bölümünün kaldırıldığının doğrulanması.
- Eylem duyuruları ve Stant çağrıları kartlarının ayrı sekmeler/alanlar halinde sunduğunun kontrolü.
- YouTube Programları video oynatıcısının işlevselliğinin testi.
