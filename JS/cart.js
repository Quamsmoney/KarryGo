const orderDrawer = document.getElementById("orderHistory");
const closeOrderHistory = document.getElementById("closeOrderHistory");

function openOrderDrawer() {
  orderDrawer.classList.remove("translate-x-full");
}

function closeOrderDrawer() {
  orderDrawer.classList.add("translate-x-full");
}

closeOrderHistory?.addEventListener("click", closeOrderDrawer);

// Example usage trigger:
document.getElementById("openOrderDrawerBtn")?.addEventListener("click", openOrderDrawer);
