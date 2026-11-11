window.addEventListener('load', () => {
  setTimeout(() => {
    const l = document.getElementById('loader');
    if (l) { l.style.opacity = '0'; setTimeout(() => l.remove(), 600); }
  }, 2400);
});
let cart = [];
const modal = document.getElementById('cartModal'), itemsEl = document.getElementById('cartItems');
const countEl = document.getElementById('cartCount'), totalEl = document.getElementById('cartTotal');
const fmt = (n) => n.toLocaleString('uz-UZ') + " so'm";
const renderCart = () => {
  countEl.textContent = String(cart.reduce((s, i) => s + i.qty, 0));
  totalEl.textContent = fmt(cart.reduce((s, i) => s + i.price * i.qty, 0));
  if (!cart.length) return itemsEl.innerHTML = '<p style="text-align:center;color:#94a3b8;font-size:13px;padding:30px 0;">Savatchangiz bo\'sh.</p>';
  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item-row">
      <img src="${item.img}" class="cart-item-thumb" alt="${item.name}">
      <div class="cart-item-details">
        <h5 class="cart-item-name">${item.name}</h5>
        <p class="cart-item-price">${fmt(item.price)}</p>
        <div class="cart-qty-row">
          <button onclick="window.changeQty('${item.id}', -1)" class="btn-qty">-</button>
          <span class="cart-qty-val">${item.qty}</span>
          <button onclick="window.changeQty('${item.id}', 1)" class="btn-qty">+</button>
        </div>
      </div>
      <button onclick="window.delItem('${item.id}')" class="btn-item-del">&times</button>
    </div>
  `).join('');
};
window.changeQty = (id, d) => {
  const it = cart.find(i => i.id === id);
  if (it) { it.qty += d; if (it.qty <= 0) cart = cart.filter(i => i.id !== id); renderCart(); }
};
window.delItem = (id) => {
  cart = cart.filter(i => i.id !== id); renderCart();
};
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.onclick = () => {
    const id = btn.dataset.id, name = btn.dataset.name, price = Number(btn.dataset.price), img = btn.dataset.img;
    const ex = cart.find(i => i.id === id);
    if (ex) ex.qty++; else cart.push({ id, name, price, img, qty: 1 });
    renderCart(); modal.classList.remove('hidden');
  };
});
document.getElementById('openCart')?.addEventListener('click', () => modal.classList.remove('hidden'));
document.getElementById('closeCart')?.addEventListener('click', () => modal.classList.add('hidden'));
document.getElementById('checkoutBtn')?.addEventListener('click', () => {
  if (!cart.length) return alert("Savatchangiz bo'sh!");
  alert("Buyurtmangiz qabul qilindi! Operatorlarimiz tez orada bog'lanadi.");
  cart = []; renderCart(); modal.classList.add('hidden');
});
document.getElementById('calcBtn')?.addEventListener('click', () => {
  const h = Number(document.getElementById('userHeight')?.value) || 175;
  const d = Number(document.getElementById('userDistance')?.value) || 25;
  const w = Number(document.getElementById('userWeight')?.value) || 70;
  const size = h < 160 ? 'XS (14 dyuym)' : h < 170 ? 'S (16 dyuym)' : h < 182 ? 'M (18 dyuym)' : h < 190 ? 'L (20 dyuym)' : 'XL (22 dyuym)';
  document.getElementById('resFrame').textContent = size;
  document.getElementById('resCalories').textContent = `~${Math.round(d * w * 0.35)} kkal`;
  document.getElementById('resCo2').textContent = `${(d * 0.13).toFixed(2)} kg toza havo`;
});
document.querySelectorAll('.faq-item').forEach(item => {
  item.onclick = () => {
    const ans = item.querySelector('.faq-ans'), icon = item.querySelector('.faq-icon');
    if (ans && icon) icon.textContent = ans.classList.toggle('hidden') ? '+' : '-';
  };
});
const form = document.getElementById('driveForm');
if (form) form.onsubmit = (e) => {
  e.preventDefault(); form.reset();
  document.getElementById('formSuccess')?.classList.remove('hidden');
};