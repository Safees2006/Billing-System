export function validateStockBeforePayment(cart, products) {
  for (const line of cart) {
    const product = products.find((p) => p.id === line.productId);
    if (!product) return { ok: false, message: "One cart item is missing from menu." };
    if (line.qty > product.stock) {
      return {
        ok: false,
        message: `${product.name} has only ${product.stock} stock available.`
      };
    }
  }
  return { ok: true, message: "" };
}

export function finalizePayment(cart, bill, products, sales) {
  const updatedProducts = products.map((product) => {
    const line = cart.find((entry) => entry.productId === product.id);
    if (!line) return product;
    return { ...product, stock: product.stock - line.qty };
  });

  const sale = {
    id: `sale_${Date.now()}`,
    createdAt: new Date().toISOString(),
    items: bill.items,
    subtotal: bill.subtotal,
    total: bill.total
  };

  return {
    updatedProducts,
    updatedSales: [...sales, sale],
    sale
  };
}

export function buildInvoiceHTML(sale) {
  const itemLines = sale.items
    .map(
      (item) =>
        `<p>${item.name} - Qty: ${item.qty} - ${item.lineTotal.toFixed(2)}</p>`
    )
    .join("");

  return `
    <h2>Invoice</h2>
    <p>Date: ${new Date(sale.createdAt).toLocaleString()}</p>
    ${itemLines}
    <p>Subtotal: ${sale.subtotal.toFixed(2)}</p>
    <p><strong>Total: ${sale.total.toFixed(2)}</strong></p>
  `;
}
