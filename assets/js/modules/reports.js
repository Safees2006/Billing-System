function getTodayDateString(date) {
  return new Date(date).toDateString();
}

export function getDailyReport(sales) {
  const todayKey = new Date().toDateString();
  const todaySales = sales.filter((sale) => getTodayDateString(sale.createdAt) === todayKey);
  const totalSales = todaySales.reduce((sum, sale) => sum + sale.total, 0);
  return {
    orders: todaySales.length,
    totalSales,
    todaySales
  };
}

export function renderDailyReport(sales, ordersEl, totalEl, listEl) {
  const report = getDailyReport(sales);
  ordersEl.textContent = String(report.orders);
  totalEl.textContent = report.totalSales.toFixed(2);

  if (!report.todaySales.length) {
    listEl.innerHTML = "<p>No sales yet for today.</p>";
    return;
  }

  listEl.innerHTML = report.todaySales
    .slice()
    .reverse()
    .map(
      (sale) => `
      <div class="sales-row">
        <strong>${new Date(sale.createdAt).toLocaleTimeString()}</strong>
        <p>Items: ${sale.items.length} | Total: ${sale.total.toFixed(2)}</p>
      </div>
    `
    )
    .join("");
}
