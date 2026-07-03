let products = [];
let cart = [];

// 🛒 ১. পেজ সুইচিং কন্ট্রোলার (মাল্টি-পেজ লজিক)
function showPage(pageId) {
    document.querySelectorAll('.page-view').forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById(`page-${pageId}`).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 📦 ২. ডাটাবেজ (ফেসবুকের মতো টেস্ট ডাটা, যা ডিক্যাপ CMS দিয়ে পরিবর্তন হবে)
products = [
    { id: 1, title: "Premium M10 TWS Earbuds True Wireless", price: 490, oldPrice: 950, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=500", category: "gadget", badge: "Flash Sale" },
    { id: 2, title: "T500 Smart Watch with Heart Rate Monitor", price: 1150, oldPrice: 1990, image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=500", category: "watch", badge: "Best Seller" },
    { id: 3, title: "Premium Minimalist Leather Wallet for Men", price: 350, oldPrice: 700, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=500", category: "lifestyle", badge: "Hot" }
];

// 🛍️ ৩. দারাজ স্টাইল কার্ড রেন্ডারিং
function renderDarazProducts(items) {
    const grid = document.getElementById('darazProductGrid');
    if (!grid) return;
    grid.innerHTML = '';

    items.forEach(product => {
        const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
        grid.innerHTML += `
            <div class="bg-white hover:shadow-md transition rounded-sm overflow-hidden flex flex-col justify-between cursor-pointer border border-gray-200/60" onclick="openProductDetails(${product.id})">
                <div>
                    <div class="aspect-square bg-gray-100 relative">
                        <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover">
                        ${product.badge ? `<span class="absolute top-1 left-1 bg-[#ff6a00] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">${product.badge}</span>` : ''}
                    </div>
                    <div class="p-2.5">
                        <h3 class="text-xs md:text-sm text-gray-800 font-normal line-clamp-2 h-9 mb-1.5">${product.title}</h3>
                        <div class="text-[#ff6a00] font-bold text-sm md:text-base">৳${product.price}</div>
                        <div class="flex items-center space-x-1.5 text-[11px] text-gray-400 mt-0.5">
                            <span class="line-through">৳${product.oldPrice}</span>
                            <span class="text-gray-700">-${discount}%</span>
                        </div>
                    </div>
                </div>
                <div class="p-2.5 pt-0" onclick="event.stopPropagation();">
                    <button onclick="addToCart(${product.id})" class="w-full bg-[#ff6a00] hover:bg-orange-600 text-white text-xs font-bold py-1.5 rounded transition">
                        <i class="fas fa-shopping-cart mr-1"></i> কার্টে নিন
                    </button>
                </div>
            </div>
        `;
    });
}

// 🔍 ৪. দারাজ লাইভ প্রোডাক্ট ডিটেইলস পেজ জেনারেটর
function openProductDetails(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const container = document.getElementById('dynamicDetailsContainer');
    container.innerHTML = `
        <div class="aspect-square bg-gray-50 rounded-lg overflow-hidden border">
            <img src="${product.image}" class="w-full h-full object-cover">
        </div>
        <div class="flex flex-col justify-between">
            <div>
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-2">${product.title}</h2>
                <div class="flex items-center space-x-2 text-xs mb-4">
                    <span class="text-yellow-500"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></span>
                    <span class="text-blue-600">(১২টি কাস্টমার রিভিউ)</span>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg mb-4">
                    <div class="text-2xl font-black text-[#ff6a00]">৳${product.price}</div>
                    <div class="text-xs text-gray-400 line-through">আগের মূল্য: ৳${product.oldPrice}</div>
                </div>
                <p class="text-xs text-gray-600 mb-4 leading-relaxed"><i class="fas fa-check-circle text-[#25D366] mr-1"></i> এটি একটি প্রিমিয়াম কোয়ালিটির আসল পণ্য। ফাস্ট ডেলিভারি ও চেক করে পেমেন্ট করার সুবিধা রয়েছে।</p>
            </div>
            <div class="space-y-2">
                <button onclick="addToCart(${product.id})" class="w-full bg-[#ff6a00] text-white py-3 rounded font-bold shadow hover:bg-orange-600 transition">কার্টে যুক্ত করুন</button>
                <button onclick="directWhatsApp(${product.id})" class="w-full bg-[#25D366] text-white py-3 rounded font-bold shadow hover:bg-green-600 transition"><i class="fab fa-whatsapp mr-1"></i> সরাসরি ওয়ান-ক্লিক অর্ডার</button>
            </div>
        </div>
    `;
    showPage('details');
}

// 🗂️ ৫. ক্যাটাগরি ফিল্টার লজিক
function filterCategory(cat) {
    if (cat === 'all') {
        renderDarazProducts(products);
    } else {
        const filtered = products.filter(p => p.category === cat);
        renderDarazProducts(filtered);
    }
}

// 🛒 ৬. কার্ট ও চেকআউট ম্যানেজমেন্ট
function toggleCart() { document.getElementById('cartModal').classList.toggle('hidden'); }
function openCheckout() { if(cart.length===0) return alert('কার্ট খালি!'); document.getElementById('checkoutModal').classList.remove('hidden'); }
function closeCheckout() { document.getElementById('checkoutModal').classList.add('hidden'); }

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) { cartItem.qty++; } else { cart.push({ ...product, qty: 1 }); }
    updateCart();
}

function updateCart() {
    const sideCount = document.getElementById('cartCountSide');
    const mainCount = document.getElementById('cartCount');
    const itemsContainer = document.getElementById('cartItems');
    const totalContainer = document.getElementById('cartTotal');
    
    let totalQty = 0, totalPrice = 0;
    itemsContainer.innerHTML = '';

    cart.forEach(item => {
        totalQty += item.qty;
        totalPrice += (item.price * item.qty);
        itemsContainer.innerHTML += `
            <div class="flex items-center justify-between border-b pb-2 text-xs">
                <div class="flex items-center space-x-2">
                    <img src="${item.image}" class="w-10 h-10 object-cover rounded">
                    <div>
                        <h4 class="font-bold text-gray-800 line-clamp-1">${item.title}</h4>
                        <p class="text-gray-500">৳${item.price} x ${item.qty}</p>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-red-500"><i class="fas fa-trash"></i></button>
            </div>`;
    });

    sideCount.innerText = totalQty;
    mainCount.innerText = totalQty;
    totalContainer.innerText = totalPrice;
}

function removeFromCart(id) { cart = cart.filter(i => i.id !== id); updateCart(); }

function handleOrderSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const address = document.getElementById('custAddress').value;
    let list = ''; let total = 0;
    cart.forEach(item => { list += `- ${item.title} (${item.qty}টি) - ৳${item.price*item.qty}\n`; total += (item.price*item.qty); });
    const text = `*নতুন অর্ডার - Trend Cart BD*\n\n*ক্রেতার তথ্য:*\nনাম: ${name}\nফোন: ${phone}\nঠিকানা: ${address}\n\n*অর্ডার আইটেম:*\n${list}\n*সর্বমোট বিল:* ৳${total}`;
    window.open(`https://wa.me/8801315121561?text=${encodeURIComponent(text)}`, '_blank');
}

// ⏳ ৭. কাউন্টডাউন টাইমার
setInterval(() => {
    let s = document.getElementById('tsec'), m = document.getElementById('tmin'), h = document.getElementById('thour');
    if(!s) return;
    let sec = parseInt(s.innerText), min = parseInt(m.innerText), hr = parseInt(h.innerText);
    sec--;
    if(sec<0){ sec=59; min--; }
    if(min<0){ min=59; hr--; }
    s.innerText = sec.toString().padStart(2,'0'); m.innerText = min.toString().padStart(2,'0'); h.innerText = hr.toString().padStart(2,'0');
}, 1000);

window.onload = () => { renderDarazProducts(products); };
