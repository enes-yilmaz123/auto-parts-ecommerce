const AutoPartsApp = {

    data: {
        // Ürünler bir "Dizi" (Array) içinde tutulur. Her ürün bir "Obje"dir (Object).
        products: [
            {id:1, name:"Canter Full Face Cabin", brand:"Canter", subcat:"Cabin", price:1899.99, icon:"🚛"},
            {id:2, name:"Canter Gearbox 5-Speed", brand:"Canter", subcat:"Gearbox", price:1250.00, icon:"⚙️"},
            {id:3, name:"Canter 4D34 Engine",     brand:"Canter", subcat:"Engine", price:2450.00, icon:"🔩"},
            {id:4, name:"Heavy Duty Caliper",     brand:"Universal", subcat:"Brake", price:189.99, icon:"🛞"}
        ],
        // Kategoriler
        categories: {
            Aracdis:     { icon: "🚛", desc: "Araç dış parçaları" },
            Aracic:      { icon: "🚚", desc: "Araç iç parçaları" },
            Kaputalti:     { icon: "🔩", desc: "Kaput atltı parçaalr " },
            Lastik:    { icon: "⚙️", desc: "Lastik Aksesuarları" }
        }
    },

    // =========================================================================
    // 2. STATE (UYGULAMANIN O ANKİ DURUMU / HAFIZASI)
    // =========================================================================
    state: {
        cart: [],             // Sepetteki ürünleri tutan boş dizi
        currentPage: 'home'   
    },

    // =========================================================================
    // 3. BAŞLATICI FONKSİYON (INIT)
    // =========================================================================
    init() {
        this.cacheDOM();     // Önce HTML etiketlerini bul ve hafızaya al
        this.bindEvents();   // Sonra butonları dinlemeye başla (tıklamaları bekle)
        this.renderHome();   // Anasayfa tasarımını ekrana çiz
        this.renderCart();   // Sepeti hesapla ve rozeti güncelle
    },

    // =========================================================================
    // 4. HTML ELEMANLARINI BULMA (DOM CACHING)
    // =========================================================================
    cacheDOM() {
        this.root = document.getElementById("root");             // Ürünlerin basılacağı ana alan
        this.cartBadge = document.getElementById("cartBadge");   // Sepetteki "0" yazan kırmızı yuvarlak
        this.cartBody = document.getElementById("cartBody");     // Sepetin içi
        this.cartTotal = document.getElementById("cartTotal");   // Toplam fiyat yazısı
    },

    // =========================================================================
    // 5. OLAY DİNLEYİCİLERİ (EVENT LISTENERS)
    // =========================================================================
    bindEvents() {
        // "cartBtn" ID'li butona "click" (tıklama) olursa, toggleCart(true) çalıştır.
        // Buradaki "() =>" gösterimi Modern JavaScript'te fonksiyon yazmanın kısa yoludur (Arrow Function).
        document.getElementById("cartBtn").addEventListener("click", () => this.toggleCart(true));
        document.getElementById("cartClose").addEventListener("click", () => this.toggleCart(false));
        document.getElementById("cartOverlay").addEventListener("click", () => this.toggleCart(false));

        // Menüdeki (Tüm Parçalar, Kategoriler vb.) tüm linkleri (a etiketlerini) bul
        const menuLinkleri = document.querySelectorAll('.nav-links a');
        
        // forEach, bir dizi içindeki her bir eleman için tek tek döngü oluşturur (for döngüsü gibi)
        menuLinkleri.forEach(link => {
            link.addEventListener('click', (olay) => {
                // e.preventDefault() -> Linke tıklayınca sayfanın yenilenmesini (yukarı zıplamasını) engeller
                olay.preventDefault(); 
                
                // Tıklanan linkin içindeki data-page="home" gibi veriyi alıp navigate fonksiyonuna gönder
                const gidilecekSayfa = olay.target.dataset.page;
                this.navigate(gidilecekSayfa);
            });
        });
    },

    // =========================================================================
    // 6. SAYFA YÖNLENDİRME (ROUTING).
    // =========================================================================
    navigate(page) {
        this.state.currentPage = page; // Hafızayı güncelle

        // Menüdeki kırmızı alt çizginin (active) yerini değiştir
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.toggle('active', link.dataset.page === page);
        });

        // Hangi sayfa istendiyse onun çizim fonksiyonunu çağır (if-else mantığı)
        if (page === 'home') this.renderHome();
        else if (page === 'categories') this.renderCategories();
        else if (page === 'about') this.renderAbout();
        else if (page === 'contact') this.renderContact();
    },

    // =========================================================================
    // 7. EKRAN ÇİZİM FONKSİYONLARI (RENDER)
    // =========================================================================
renderHome() {
        const anaSayfaUrunleri = this.data.products.slice(0, 4); 
        
        this.root.innerHTML = `
            <section class="hero">
                <div class="hero-bg-glow"></div>
                <div class="hero-grid">
                    <div class="hero-text">
                        <div class="hero-badge">🚀 YENİ NESİL YEDEK PARÇA</div>
                        <h1>AĞIR VASITA<br><span>PREMIUM</span> PARÇALAR</h1>
                        <p>Canter, Isuzu ve Mazda için orijinal, garantili ve yüksek performanslı e-ticaret çözümleri.</p>
                        <div class="hero-buttons">
                            <button class="btn-primary" onclick="AutoPartsApp.navigate('categories')">Kategorileri Keşfet <i class="fas fa-arrow-right"></i></button>
                            <button class="btn-secondary" onclick="AutoPartsApp.navigate('about')">Hakkımızda</button>
                        </div>
                    </div>
                    
                    <div class="hero-visual">
                        <div class="glass-card-stack">
                            <div class="glass-card card-1">
                                <i class="fas fa-boxes"></i>
                                <span>Geniş Stok Ağı</span>
                            </div>
                            <div class="glass-card card-2">
                                <i class="fas fa-shield-check"></i>
                                <span>Garantili Ürünler</span>
                            </div>
                            <div class="glass-card card-3">
                                <i class="fas fa-shipping-fast"></i>
                                <span>Hızlı Tedarik</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section">
                <h2 class="section-title">ÖNE ÇIKAN <em>PARÇALAR</em></h2>
                <div class="featured-grid">
                    ${anaSayfaUrunleri.map(urun => this.createProductCard(urun)).join('')}
                </div>
            </section>
        `;

        this.bindAddToCartButtons();
    },

    renderCategories() {
        // Object.entries, bizim categories objesini [isim, bilgi] şeklinde bir diziye çevirir.
        this.root.innerHTML = `
            <section class="section">
                <h2 class="section-title">TÜM <em>KATEGORİLER</em></h2>
                <div class="cat-grid">
                    ${Object.entries(this.data.categories).map(([kategoriIsmi, icerik]) => `
                        <div class="cat-card">
                            <span class="cat-icon">${icerik.icon}</span>
                            <div class="cat-name">${kategoriIsmi}</div>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    },

    renderAbout() {
        this.root.innerHTML = `<div class="info-page"><h2>HAKKIMIZDA</h2><p>Biz bir yazılım harikasıyız.</p></div>`;
    },

    renderContact() {
        this.root.innerHTML = `<div class="info-page"><h2>İLETİŞİM</h2><p>kodlar@vebiz.com</p></div>`;
    },

    // =========================================================================
    // 8. BİLEŞEN ÜRETİCİSİ (COMPONENT CREATOR)
    // Ürün kartının HTML kalıbı. Her ürün için bu kalıp tekrar tekrar kullanılır.
    // =========================================================================
    createProductCard(urun) {
        return `
            <div class="product-card">
                <div class="pc-img">${urun.icon}</div>
                <div class="pc-body">
                    <div class="pc-cat">${urun.brand} - ${urun.subcat}</div>
                    <div class="pc-name">${urun.name}</div>
                    <div class="pc-price">$${urun.price}</div>
                    <button class="add-btn" data-id="${urun.id}"><i class="fas fa-plus"></i></button>
                </div>
            </div>
        `;
    },

    // Sepete Ekle butonlarına tıklandığında ne olacağını belirleyen kulak (Dinleyici)
    bindAddToCartButtons() {
        const butonlar = document.querySelectorAll('.add-btn');
        butonlar.forEach(buton => {
            buton.addEventListener('click', (olay) => {
                // Tıklanan butonun içindeki data-id'yi alıp sayıya (Integer) çevirir
                const urunId = parseInt(olay.currentTarget.dataset.id);
                // Aldığı ID'yi asıl işi yapacak olan fonksiyona yollar
                this.addToCart(urunId);
            });
        });
    },

    // =========================================================================
    // 9. İŞ ALGORİTMALARI (BUSINESS LOGIC - SEPET İŞLEMLERİ)
    // Verilerin manipüle edildiği, matematiksel işlemlerin yapıldığı asıl beyin kısmı.
    // =========================================================================
    addToCart(id) {
        // find() metodu veritabanına gider, verilen id ile eşleşen ilk ürünü bulup getirir
        const eklenecekUrun = this.data.products.find(p => p.id === id);
        
        if (!eklenecekUrun) return; // Güvenlik kontrolü: Ürün yoksa fonksiyonu durdur

        // Sepeti kontrol et: Bu üründen daha önce sepete eklenmiş mi?
        const sepettekiUrun = this.state.cart.find(item => item.id === id);
        
        if (sepettekiUrun) {
            // Varsa adet (quantity - qty) miktarını 1 arttır
            sepettekiUrun.qty++;
        } else {
            // Yoksa, ürünün kopyasını al ve qty: 1 diyerek sepete (cart dizisine) fırlat (push)
            this.state.cart.push({ ...eklenecekUrun, qty: 1 });
        }
        
        // Sepetteki veriler değiştiği için ekrandaki sepeti de güncelle (yeniden çiz)
        this.renderCart();
        // Ekrana yeşil "Eklendi" balonu çıkart
        this.showNotification(`${eklenecekUrun.name} sepete eklendi!`);
    },

    renderCart() {
        // reduce() dizideki elemanların belli bir değerini (qty) toplayıp tek bir sayı üretir.
        // Burada sepetteki toplam ürün adedini buluyoruz.
        const toplamUrunAdedi = this.state.cart.reduce((toplam, urun) => toplam + urun.qty, 0);
        
        // Sağ üstteki kırmızı yuvarlağın içine sayıyı yaz
        this.cartBadge.innerText = toplamUrunAdedi;

        // Eğer sepet boşsa
        if (this.state.cart.length === 0) {
            this.cartBody.innerHTML = `<div style="text-align:center; padding:20px;">Sepetiniz boş.</div>`;
            this.cartTotal.innerText = "$0.00";
            return; // Fonksiyonu burada kes
        }

        let toplamFiyat = 0;
        
        // Sepet doluysa, içindeki her ürünü dönerek HTML üret ve toplam fiyatı hesapla
        this.cartBody.innerHTML = this.state.cart.map(urun => {
            toplamFiyat += (urun.price * urun.qty); // Fiyat * Adet
            
            return `
                <div class="cart-item">
                    <div class="ci-icon">${urun.icon}</div>
                    <div class="ci-info">
                        <div class="ci-name">${urun.name}</div>
                        <div class="ci-price">$${(urun.price * urun.qty).toFixed(2)}</div>
                        <div style="font-size: 0.8rem; margin-top: 5px;">Adet: ${urun.qty}</div>
                    </div>
                </div>
            `;
        }).join('');

        // Hesaplanan toplam fiyatı ekrana yaz (toFixed(2) virgülden sonra 2 basamak bırakır)
        this.cartTotal.innerText = `$${toplamFiyat.toFixed(2)}`;
    },

    // Sepeti sağdan kaydırarak açan veya kapatan fonksiyon
    toggleCart(acikMi) {
        // classList.toggle(classAdi, sart) -> Şart doğruysa class'ı ekler, yanlışsa siler
        document.getElementById("cartPanel").classList.toggle("open", acikMi);
        document.getElementById("cartOverlay").classList.toggle("open", acikMi);
    },

    // Sağ alttan çıkan uyarı mesajını oluşturan fonksiyon
    showNotification(mesaj) {
        // Sıfırdan bir "div" elemanı yarat (Henüz ekranda değil, sanal hafızada)
        const uyariDivi = document.createElement('div');
        uyariDivi.className = 'notif'; // CSS'teki .notif tasarımını alması için
        uyariDivi.innerHTML = `<i class="fas fa-check-circle" style="color:var(--red)"></i> ${mesaj}`;
        
        // Yarattığımız div'i sayfanın (body) en altına fiziksel olarak yerleştir
        document.body.appendChild(uyariDivi);
        
        // 2500 milisaniye (2.5 saniye) sonra bu elemanı sayfadan sil (çöp toplama)
        setTimeout(() => uyariDivi.remove(), 2500);
    }
};

// =========================================================================
// SİSTEMİ ATEŞLEME (Tetikleyici)
// Tarayıcı "DOMContentLoad" uyarısı verdiğinde, yani HTML dosyasını baştan 
// sona okumayı bitirdiğinde, bizim yazdığımız AutoPartsApp'i başlatır.
// Bu sayede sistem güvenli çalışır.
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    AutoPartsApp.init();
});