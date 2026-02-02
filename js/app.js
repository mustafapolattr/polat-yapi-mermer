const galleryGrid = document.getElementById('gallery-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

function createCardHTML(item) {
    const imgSource = item.img ? item.img : `https://placehold.co/600x400?text=${item.title}`;
    
    // Etiket Rengi (Malzemeye Göre)
    let badgeClass = "bg-gray-700 text-white";
    if(item.material === 'granit') badgeClass = "bg-slate-900 text-yellow-400";
    if(item.material === 'mermer') badgeClass = "bg-white text-slate-900 border border-gray-200";
    if(item.material === 'cimstone') badgeClass = "bg-blue-600 text-white";

    return `
        <div class="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-100">
            <div class="relative h-56 overflow-hidden">
                <img src="${imgSource}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-700">
                <div class="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition"></div>
                <span class="absolute top-3 left-3 ${badgeClass} text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    ${item.material.toUpperCase()}
                </span>
            </div>
            <div class="p-5 flex flex-col flex-grow">
                <div class="flex justify-between items-start mb-2">
                    <h4 class="text-lg font-bold text-slate-800">${item.title}</h4>
                </div>
                <p class="text-gray-500 text-sm mb-4 flex-grow">${item.desc}</p>
                <a href="https://wa.me/905324360962?text=${item.title} fiyatı nedir?" target="_blank" 
                   class="w-full text-center bg-slate-50 hover:bg-green-500 hover:text-white border border-slate-200 text-slate-800 py-2 rounded-lg text-sm font-bold transition-colors">
                   Fiyat Al 💬
                </a>
            </div>
        </div>
    `;
}

// YENİLENMİŞ FİLTRE FONKSİYONU (ÇİFT YÖNLÜ)
function renderGallery(filterValue, filterGroup) {
    galleryGrid.innerHTML = '';
    
    let filteredItems = [];

    if (filterValue === 'all') {
        filteredItems = productData;
    } else {
        // Hangi gruba göre filtreleyeceğini seçiyoruz (type veya material)
        // filterGroup: 'type' (uygulama) veya 'material' (malzeme)
        filteredItems = productData.filter(item => item[filterGroup] === filterValue);
    }

    if (filteredItems.length > 0) {
        galleryGrid.innerHTML = filteredItems.map(item => createCardHTML(item)).join('');
    } else {
        galleryGrid.innerHTML = `
            <div class="col-span-full text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                <p class="text-gray-400 font-medium">Bu kategoride henüz görsel eklenmedi.</p>
            </div>`;
    }
}

// Button Listener
filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Görsel efekt: Tüm butonları pasif yap
        filterButtons.forEach(b => {
            b.classList.remove('bg-slate-900', 'text-white', 'ring-2', 'ring-offset-2', 'ring-slate-900');
            b.classList.add('bg-white', 'text-slate-600', 'border', 'border-gray-200');
        });

        // Tıklananı aktif yap
        const target = e.target.closest('button'); // icona tıklansa bile butonu seç
        target.classList.remove('bg-white', 'text-slate-600', 'border', 'border-gray-200');
        target.classList.add('bg-slate-900', 'text-white', 'ring-2', 'ring-offset-2', 'ring-slate-900');

        // Filtreleme verilerini al (HTML'den gelecek)
        const value = target.getAttribute('data-value');
        const group = target.getAttribute('data-group'); // 'material' veya 'type'

        renderGallery(value, group);
    });
});

// Başlangıç
document.addEventListener('DOMContentLoaded', () => renderGallery('all', 'all'));