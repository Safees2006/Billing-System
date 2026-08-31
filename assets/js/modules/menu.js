export function filterProducts(products, searchText, category) {
  const search = searchText.trim().toLowerCase();
  return products.filter((product) => {
    const matchesText = product.name.toLowerCase().includes(search);
    const matchesCategory = category === "all" || product.category === category;
    return matchesText && matchesCategory;
  });
}

export function renderMenu(menuGrid, products, onAddToCart) {
  if (!products.length) {
    menuGrid.innerHTML = "<p>No items found.</p>";
    return;
  }

  menuGrid.innerHTML = products
    .map((item) => {
      const disabled = item.stock <= 0 ? "disabled" : "";
      return `
        <article class="menu-card">
          <img src="${item.image}" alt="${item.name}">
          <h4>${item.name}</h4>
          <p>${item.category}</p>
          <p>Price: ${item.price.toFixed(2)}</p>
          <p>Stock: ${item.stock}</p>
          <button data-product-id="${item.id}" ${disabled}>
            ${item.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </article>
      `;
    })
    .join("");

  menuGrid.querySelectorAll("button[data-product-id]").forEach((button) => {
    button.addEventListener("click", () => {
      onAddToCart(button.dataset.productId);
    });
  });
}

export function renderManageList(container, products, onEdit, onDelete) {
  if (!products.length) {
    container.innerHTML = "<p>No products available.</p>";
    return;
  }

  container.innerHTML = products
    .map(
      (item) => `
      <div class="manage-row">
        <div>
          <strong>${item.name}</strong> - ${item.category} - ${item.price.toFixed(2)} - Stock: ${item.stock}
        </div>
        <div>
          <button data-edit-id="${item.id}">Edit</button>
          <button data-delete-id="${item.id}" class="danger">Delete</button>
        </div>
      </div>
    `
    )
    .join("");

  container.querySelectorAll("[data-edit-id]").forEach((button) => {
    button.addEventListener("click", () => onEdit(button.dataset.editId));
  });

  container.querySelectorAll("[data-delete-id]").forEach((button) => {
    button.addEventListener("click", () => onDelete(button.dataset.deleteId));
  });
}
