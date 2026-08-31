export function addToCart(cart, productId) {
  const existing = cart.find((line) => line.productId === productId);
  if (existing) {
    existing.qty += 1;
    return [...cart];
  }
  return [...cart, { productId, qty: 1 }];
}

export function updateCartQuantity(cart, productId, delta) {
  return cart
    .map((line) =>
      line.productId === productId ? { ...line, qty: line.qty + delta } : line
    )
    .filter((line) => line.qty > 0);
}

export function removeFromCart(cart, productId) {
  return cart.filter((line) => line.productId !== productId);
}

export function clearCart() {
  return [];
}

export function calculateBill(cart, products) {
  const items = cart
    .map((line) => {
      const product = products.find((p) => p.id === line.productId);
      if (!product) return null;
      const lineTotal = product.price * line.qty;
      return {
        productId: product.id,
        name: product.name,
        qty: line.qty,
        price: product.price,
        lineTotal
      };
    })
    .filter(Boolean);

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const total = subtotal;

  return { items, subtotal, total };
}

export function renderCart(cartContainer, bill, onQtyChange, onRemove) {
  if (!bill.items.length) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartContainer.innerHTML = bill.items
    .map(
      (item) => `
      <div class="cart-row">
        <div>
          <strong>${item.name}</strong><br>
          ${item.price.toFixed(2)} x ${item.qty} = ${item.lineTotal.toFixed(2)}
        </div>
        <div class="qty-controls">
          <button data-dec="${item.productId}">-</button>
          <span>${item.qty}</span>
          <button data-inc="${item.productId}">+</button>
        </div>
        <button data-remove="${item.productId}" class="danger">Remove</button>
      </div>
    `
    )
    .join("");

  cartContainer.querySelectorAll("[data-inc]").forEach((button) => {
    button.addEventListener("click", () => onQtyChange(button.dataset.inc, 1));
  });
  cartContainer.querySelectorAll("[data-dec]").forEach((button) => {
    button.addEventListener("click", () => onQtyChange(button.dataset.dec, -1));
  });
  cartContainer.querySelectorAll("[data-remove]").forEach((button) => {
    button.addEventListener("click", () => onRemove(button.dataset.remove));
  });
}
