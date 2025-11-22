import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || []
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

// Remove an item from localStorage and re-render
function removeItemFromCart(event) {
  const idToRemove = event.target.dataset.id;
  if (!idToRemove) return;

  let cartItems = getLocalStorage("so-cart") || [];
  const updatedCart = cartItems.filter(item => item.Id != idToRemove);

  localStorage.setItem("so-cart", JSON.stringify(updatedCart));
  renderCartContents();
  updateCartCount();
}

// Update cart total in the footer
function updateCartTotal(cartItems) {
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotalEl = document.querySelector(".cart-total");

  if (!cartItems.length) {
    cartFooter.classList.add("hide");
    // Also reset total to $0.00
    cartTotalEl.textContent = `Total: $0.00`;
    return;
  }

  // Calculate total price
  const total = cartItems.reduce((sum, item) => sum + Number(item.FinalPrice), 0);
  cartTotalEl.textContent = `Total: $${total.toFixed(2)}`;
  cartFooter.classList.remove("hide");
}

// Initial render
renderCartContents();
updateCartCount();
