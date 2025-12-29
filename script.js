let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

function addToCart(name, price, img) {
  
  const found = cart.find(i => i.name === name && i.price === price && i.img === img);
  if (found) {
    found.qty = (found.qty || 1) + 1;
  } else {
    cart.push({ name, price, img, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();

  alert(name + ' added to cart!');
}


function updateCartCount(){
  const el = document.getElementById('cart-count');
  if(el) el.innerText = cart.reduce((s,i)=> s + (i.qty || 1), 0);
}


function renderCartPage(){
  if (!window.location.pathname.includes('cart.html')) return;
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cart-items');
  container.innerHTML = '';
  if (!cart.length) {
    container.innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById('cart-total').innerText = '₹0';
    return;
  }


  cart.forEach((item, idx) => {
    const row = document.createElement('div');
    row.className = 'cart-row';
    row.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div style="min-width:220px">
        <h3 style="margin:0">${item.name}</h3>
        <div style="color:#666">₹${item.price} each</div>
      </div>

      <div class="qty-controls">
        <button onclick="changeQty(${idx}, -1)">−</button>
        <div style="min-width:28px; text-align:center">${item.qty}</div>
        <button onclick="changeQty(${idx}, 1)">+</button>
        <button style="margin-left:12px; background:#ff4d4d; color:white; border:none; padding:6px 8px; border-radius:6px; cursor:pointer"
                onclick="removeItem(${idx})">Remove</button>
      </div>
    `;
    container.appendChild(row);
  });

  updateTotal();
}

function changeQty(index, delta){
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cart[index]) return;
  cart[index].qty = (cart[index].qty || 1) + delta;
  if (cart[index].qty <= 0) {

    cart.splice(index,1);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartPage();
  updateCartCount();
}


function removeItem(index){
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cart[index]) return;
  if (!confirm('Remove "' + cart[index].name + '" from cart?')) return;
  cart.splice(index,1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartPage();
  updateCartCount();
}

function updateTotal(){
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((s,i) => s + i.price * (i.qty || 1), 0);
  const el = document.getElementById('cart-total');
  if(el) el.innerText = '₹' + total;
}


function checkout(){
  if (!cart.length) {
    alert('Cart is empty.');
    return;
  }
  alert('Thank you! Order placed (demo).');
  cart = [];
  localStorage.removeItem('cart');
  renderCartPage();
  updateCartCount();
}


document.addEventListener('DOMContentLoaded', function(){
  renderCartPage();
  updateCartCount();
});