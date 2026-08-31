import { defaultProducts, getProductImageByName } from "./data/products.js";
import { KEYS, loadJSON, saveJSON } from "./utils/storage.js";
import { filterProducts, renderManageList, renderMenu } from "./modules/menu.js";
import {
  addToCart,
  calculateBill,
  clearCart,
  removeFromCart,
  renderCart,
  updateCartQuantity
} from "./modules/cart.js";
import {
  buildInvoiceHTML,
  finalizePayment,
  validateStockBeforePayment
} from "./modules/billing.js";
import { renderDailyReport } from "./modules/reports.js";

function shouldUpgradeToNewCatalog(products) {
  if (!Array.isArray(products) || !products.length) return true;

  return products.length < defaultProducts.length;
}

const storedProducts = loadJSON(KEYS.products, defaultProducts);

const state = {
  products: shouldUpgradeToNewCatalog(storedProducts) ? defaultProducts : storedProducts,
  cart: loadJSON(KEYS.cart, []),
  sales: loadJSON(KEYS.sales, []),
  search: "",
  category: "all"
};

const elements = {
  menuGrid: document.getElementById("menuGrid"),
  searchInput: document.getElementById("searchInput"),
  categoryFilter: document.getElementById("categoryFilter"),
  cartItems: document.getElementById("cartItems"),
  subtotalValue: document.getElementById("subtotalValue"),
  totalValue: document.getElementById("totalValue"),
  statusMessage: document.getElementById("statusMessage"),
  payNowBtn: document.getElementById("payNowBtn"),
  printBillBtn: document.getElementById("printBillBtn"),
  clearCartBtn: document.getElementById("clearCartBtn"),
  productForm: document.getElementById("productForm"),
  productId: document.getElementById("productId"),
  productName: document.getElementById("productName"),
  productCategory: document.getElementById("productCategory"),
  productPrice: document.getElementById("productPrice"),
  productStock: document.getElementById("productStock"),
  productImage: document.getElementById("productImage"),
  resetFormBtn: document.getElementById("resetFormBtn"),
  manageList: document.getElementById("manageList"),
  ordersToday: document.getElementById("ordersToday"),
  salesToday: document.getElementById("salesToday"),
  salesList: document.getElementById("salesList"),
  invoiceTemplate: document.getElementById("invoiceTemplate")
};

function getDefaultProductImage(productName) {
  return getProductImageByName(productName);
}

function setStatus(message, isError = false) {
  elements.statusMessage.textContent = message;
  elements.statusMessage.style.color = isError ? "#d92d20" : "#027a48";
}

function persist() {
  saveJSON(KEYS.products, state.products);
  saveJSON(KEYS.cart, state.cart);
  saveJSON(KEYS.sales, state.sales);
}

function getFilteredProducts() {
  return filterProducts(state.products, state.search, state.category);
}

function updateBillView() {
  const bill = calculateBill(state.cart, state.products);
  elements.subtotalValue.textContent = bill.subtotal.toFixed(2);
  elements.totalValue.textContent = bill.total.toFixed(2);
  return bill;
}

function renderAll() {
  renderMenu(elements.menuGrid, getFilteredProducts(), handleAddToCart);
  renderManageList(elements.manageList, state.products, handleEditProduct, handleDeleteProduct);

  const bill = calculateBill(state.cart, state.products);
  renderCart(elements.cartItems, bill, handleQuantityChange, handleRemoveFromCart);
  elements.subtotalValue.textContent = bill.subtotal.toFixed(2);
  elements.totalValue.textContent = bill.total.toFixed(2);

  renderDailyReport(state.sales, elements.ordersToday, elements.salesToday, elements.salesList);
}

function handleAddToCart(productId) {
  const product = state.products.find((item) => item.id === productId);
  if (!product || product.stock <= 0) {
    setStatus("Item unavailable.", true);
    return;
  }

  const alreadyInCart = state.cart.find((line) => line.productId === productId);
  if (alreadyInCart && alreadyInCart.qty >= product.stock) {
    setStatus("Cannot add more than available stock.", true);
    return;
  }

  state.cart = addToCart(state.cart, productId);
  persist();
  renderAll();
  setStatus(`${product.name} added to cart.`);
}

function handleQuantityChange(productId, delta) {
  const product = state.products.find((item) => item.id === productId);
  const line = state.cart.find((entry) => entry.productId === productId);
  if (!product || !line) return;

  if (delta > 0 && line.qty >= product.stock) {
    setStatus("Reached maximum available stock.", true);
    return;
  }

  state.cart = updateCartQuantity(state.cart, productId, delta);
  persist();
  renderAll();
}

function handleRemoveFromCart(productId) {
  state.cart = removeFromCart(state.cart, productId);
  persist();
  renderAll();
}

function resetProductForm() {
  elements.productForm.reset();
  elements.productId.value = "";
}

function handleEditProduct(productId) {
  const product = state.products.find((item) => item.id === productId);
  if (!product) return;

  elements.productId.value = product.id;
  elements.productName.value = product.name;
  elements.productCategory.value = product.category;
  elements.productPrice.value = String(product.price);
  elements.productStock.value = String(product.stock);
  elements.productImage.value = product.image;
}

function handleDeleteProduct(productId) {
  state.products = state.products.filter((item) => item.id !== productId);
  state.cart = state.cart.filter((line) => line.productId !== productId);
  persist();
  renderAll();
  setStatus("Product deleted.");
}

function handleProductSubmit(event) {
  event.preventDefault();
  const id = elements.productId.value.trim() || `p_${Date.now()}`;
  const payload = {
    id,
    name: elements.productName.value.trim(),
    category: elements.productCategory.value,
    price: Number(elements.productPrice.value),
    stock: Number(elements.productStock.value),
    image: elements.productImage.value.trim() || getDefaultProductImage(elements.productName.value)
  };

  if (!payload.name || !payload.category || Number.isNaN(payload.price) || payload.price <= 0) {
    setStatus("Please enter valid product values.", true);
    return;
  }

  const existingIndex = state.products.findIndex((item) => item.id === id);
  if (existingIndex >= 0) {
    state.products[existingIndex] = payload;
    setStatus("Product updated.");
  } else {
    state.products.push(payload);
    setStatus("Product added.");
  }

  persist();
  renderAll();
  resetProductForm();
}

function handlePayNow() {
  if (!state.cart.length) {
    setStatus("Cart is empty.", true);
    return;
  }

  const bill = calculateBill(state.cart, state.products);
  const stockCheck = validateStockBeforePayment(state.cart, state.products);
  if (!stockCheck.ok) {
    setStatus(stockCheck.message, true);
    return;
  }

  const result = finalizePayment(state.cart, bill, state.products, state.sales);
  state.products = result.updatedProducts;
  state.sales = result.updatedSales;
  state.cart = clearCart();
  persist();
  renderAll();
  setStatus(`Payment success. Bill total: ${result.sale.total.toFixed(2)}`);
}

function handlePrintBill() {
  const bill = updateBillView();
  if (!bill.items.length) {
    setStatus("Add items to cart before printing.", true);
    return;
  }

  const temporarySale = {
    createdAt: new Date().toISOString(),
    items: bill.items,
    subtotal: bill.subtotal,
    total: bill.total
  };

  const wrapper = document.createElement("div");
  wrapper.className = "invoice";
  wrapper.innerHTML = buildInvoiceHTML(temporarySale);
  document.body.appendChild(wrapper);
  window.print();
  wrapper.remove();
  setStatus("Bill sent to print.");
}

function handleClearCart() {
  state.cart = clearCart();
  persist();
  renderAll();
  setStatus("Cart cleared.");
}

function bindEvents() {
  elements.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;
    renderAll();
  });

  elements.categoryFilter.addEventListener("change", (event) => {
    state.category = event.target.value;
    renderAll();
  });

  elements.productForm.addEventListener("submit", handleProductSubmit);
  elements.resetFormBtn.addEventListener("click", resetProductForm);
  elements.payNowBtn.addEventListener("click", handlePayNow);
  elements.printBillBtn.addEventListener("click", handlePrintBill);
  elements.clearCartBtn.addEventListener("click", handleClearCart);
}

bindEvents();
renderAll();
