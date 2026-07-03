 
let products = [];
let cart = [];

// ЁЯЪА ржЕрзНржпрж╛ржбржорж┐ржи ржкрзНржпрж╛ржирзЗрж▓ ржерзЗржХрзЗ ржЕржЯрзЛржорзЗржЯрж┐ржХ ржкрзНрж░рзЛржбрж╛ржХрзНржЯ ржбрж╛ржЯрж╛ рж▓рзЛржб ржХрж░рж╛
async function loadProducts() {
    try {
        // GitHub ржмрж╛ Netlify ржерзЗржХрзЗ ржкрзНрж░рзЛржбрж╛ржХрзНржЯ ржбрж╛ржЯрж╛ рж▓рж┐рж╕рзНржЯ ржЖржирж╛
        // ржкрзНрж░ржержоржмрж╛рж░ ржЯрзЗрж╕рзНржЯ ржХрж░рж╛рж░ ржЬржирзНржп ржирж┐ржЪрзЗ ржХрж┐ржЫрзБ ржбрзЗржорзЛ ржкрзНрж░рзЛржбрж╛ржХрзНржЯ ржжрзЗржУрзЯрж╛ рж╣рж▓рзЛ
        products = [
            { id: 1, title: "TWS M10 Premium Earbuds", price: 450, oldPrice: 800, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=500", badge: "Hot" },
            { id: 2, title: "Smart Watch Ultra 9", price: 1250, oldPrice: 2200, image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=500", badge: "10% Off" }
        ];
        renderProducts(products);
    } catch (error) {
        console.error("ржкрзНрж░рзЛржбрж╛ржХрзНржЯ рж▓рзЛржб ржХрж░рж╛ ржпрж╛рзЯржирж┐:", error);
    }
}

function renderProducts(items) {
    const grid = document.getElementById('productGrid');
    if(!grid) return;
    grid.innerHTML = '';
    
    items.forEach(product => {
        grid.innerHTML += `
            <div class="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between p-3 relative border border-slate-200/60">
                ${product.badge ? `<span class="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">${product.badge}</span>` : ''}
                <div>
                    <div class="overflow-hidden rounded-xl bg-slate-100 aspect-square mb-3">
                        <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover">
                    </div>
                    <h3 class="font-bold text-sm line-clamp-2 h-10 mb-1">${product.title}</h3>
                </div>
                <div>
                    <div class="flex items-baseline space-x-1.5 mb-2">
                        <span class="text-blue-700 font-extrabold text-base">рз│${product.price}</span>
                        ${product.oldPrice ? `<span class="text-slate-400 line-through text-xs">рз│${product.oldPrice}</span>` : ''}
                    </div>
                    <button onclick="addToCart(${product.id})" class="w-full bg-blue-600 text-white text-xs font-bold py-2 rounded-xl hover:bg-blue-700 transition">
                        <i class="fas fa-shopping-cart mr-1"></i> ржХрж╛рж░рзНржЯрзЗ рж░рж╛ржЦрзБржи
                    </button>
                </div>
            </div>
        `;
    });
}

function toggleCart() {
    document.getElementById('cartModal').classList.toggle('hidden');
}

function addToCart(id) {
    const product = products.find(p => p.id == id);
    const cartItem = cart.find(item => item.id == id);
    if (cartItem) { cartItem.qty++; } else { cart.push({ ...product, qty: 1 }); }
    updateCart();
    document.getElementById('cartModal').classList.remove('hidden');
}

function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    let totalQty = 0, totalPrice = 0;
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        totalQty += item.qty;
        totalPrice += (item.price * item.qty);
        cartItems.innerHTML += `
            <div class="flex items-center justify-between border-b pb-2">
                <div class="flex items-center space-x-3">
                    <img src="${item.image}" class="w-12 h-12 rounded-lg object-cover">
                    <div>
                        <h4 class="font-bold text-xs line-clamp-1">${item.title}</h4>
                        <p class="text-xs text-slate-500">рз│${item.price} x ${item.qty}</p>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-red-500 text-sm"><i class="fas fa-trash"></i></button>
            </div>`;
    });
    cartCount.innerText = totalQty;
    cartTotal.innerText = totalPrice;
}

function openCheckout() { document.getElementById('checkoutModal').classList.remove('hidden'); }
function closeCheckout() { document.getElementById('checkoutModal').classList.add('hidden'); }

function handleOrderSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const address = document.getElementById('custAddress').value;
    const payment = document.querySelector('input[name="payment"]:checked').value;
    
    let productList = '';
    let total = 0;
    cart.forEach(item => {
        productList += `- ${item.title} (Qty: ${item.qty}) - рз│${item.price * item.qty}\n`;
        total += (item.price * item.qty);
    });
    
    const message = `*ржирждрзБржи ржЕрж░рзНржбрж╛рж░ - Trend Cart BD*\n\n*ржХрж╛рж╕рзНржЯржорж╛рж░ ржбрж┐ржЯрзЗржЗрж▓рж╕:*\nржирж╛ржо: ${name}\nржлрзЛржи: ${phone}\nржарж┐ржХрж╛ржирж╛: ${address}\n\n*ржЕрж░рзНржбрж╛рж░ ржЖржЗржЯрзЗржорж╕ржорзВрж╣:*\n${productList}\n*ржорзЛржЯ ржмрж┐рж▓:* рз│${total}\n*ржкрзЗржорзЗржирзНржЯ ржорзЗржержб:* ${payment}`;
    window.open(`https://wa.me/8801315121561?text=${encodeURIComponent(message)}`, '_blank');
}

window.onload = loadProducts;
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed', err));
}