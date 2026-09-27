const START_BUDGET = 350;
const CART_KEY = "cart";

export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product) {
  const cart = getCart();
  const total = getTotal();

  // Tjek om der er råd til varen
  if (total + product.price > START_BUDGET) {
    return;
  }

  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  saveCart(cart);
  updateNav();
}

export function getTotal() {
  const cart = getCart();

  return cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
}

export function getItemCount() {
  const cart = getCart();

  return cart.reduce((total, product) => {
    return total + product.quantity;
  }, 0);
}

export function updateNav() {
  const cartMoney = document.querySelector("#cartMoney");
  const cartNumber = document.querySelector("#cartNumber");

  const total = getTotal();
  const itemCount = getItemCount();

  const remainingBudget = START_BUDGET - total;

  if (cartMoney) {
    cartMoney.textContent = `${remainingBudget} DKK`;
  }

  if (cartNumber) {
    cartNumber.textContent = itemCount;
  }
}

export function resetCart() {
  localStorage.removeItem(CART_KEY);
  updateNav();
}

const USER_KEY = "userData";

export function saveUserData(userData) {
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
}

export function getUserData() {
  return JSON.parse(localStorage.getItem(USER_KEY)) || {};
}
