document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    setupSearch();
});

// Функция добавления товара в корзину
function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showAddedToCartAnimation(productName);
}

// Обновление счётчика товаров в корзине
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").innerText = `${totalItems} товаров`;
}

// Анимация добавления в корзину
function showAddedToCartAnimation(productName) {
    let cartMessage = document.createElement("div");
    cartMessage.classList.add("cart-message");
    cartMessage.innerText = `${productName} добавлен в корзину!`;
    document.body.appendChild(cartMessage);
    setTimeout(() => cartMessage.remove(), 2000);
}

// Функция поиска товаров
function setupSearch() {
    document.querySelector(".search input").addEventListener("input", (e) => {
        let searchQuery = e.target.value.toLowerCase();
        document.querySelectorAll(".product").forEach(product => {
            let productName = product.querySelector("h3").innerText.toLowerCase();
            product.style.display = productName.includes(searchQuery) ? "block" : "none";
        });
    });
}

