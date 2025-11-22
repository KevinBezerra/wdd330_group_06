// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get('product')
  return product
}

export function renderListWithTemplate(templateFn, parentElement, list, position, clear){
  if (clear == true){
    parentElement.innerHTML = ""
    return
  }
  const productsTemplate = list.map(product => templateFn(product))
  parentElement.insertAdjacentHTML(position, productsTemplate.join(''))
}

export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart");
  const count = cartItems ? cartItems.length : 0;
  const cartElement = document.querySelector(".cart");

  if (cartElement) {
    let countElement = cartElement.querySelector(".cart-count");

    if (!countElement) {
      countElement = document.createElement("span");
      countElement.classList.add("cart-count");
      cartElement.appendChild(countElement);
    }

    countElement.innerText = count;
    
    countElement.style.display = count > 0 ? "block" : "none";
  }
}
