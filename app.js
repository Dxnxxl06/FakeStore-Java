const API_URL = "https://fakestoreapi.com/products";
const productsContainer = document.getElementById("productsContainer");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");
const sortProducts = document.getElementById("sortProducts");

let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fetch productos
async function fetchProducts() {
    try {
      const res = await fetch(API_URL);
      products = await res.json();
      renderProducts(products);
      loadCategories();
      renderCart();
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  }

  // Render de productos
function renderProducts(productList) {
    productsContainer.innerHTML = "";
    productList.forEach(prod => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
        <img src="${prod.image}" alt="${prod.title}">
        <h3>${prod.title}</h3>
        <p>${prod.category}</p>
        <p><strong>$${prod.price.toFixed(2)}</strong></p>
        <button onclick="addToCart(${prod.id})">Agregar al carrito</button>
      `;
      productsContainer.appendChild(card);
    });
  }

  // Render categorías
function loadCategories() {
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      filterCategory.appendChild(option);
    });
  }

  // Carrito
function addToCart(id) {
    const item = products.find(p => p.id === id);
    const existing = cart.find(p => p.id === id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    updateCart();
  }
  
  function removeFromCart(id) {
    cart = cart.filter(p => p.id !== id);
    updateCart();
  }
  
  function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.title} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
        <button onclick="removeFromCart(${item.id})">Delete</button>
      `;
      const button = li.querySelector("button");
      button.style.marginBottom = "20px";
      button.style.backgroundColor = "#BCBCBC";
      cartItems.appendChild(li);
    });
    cartTotal.textContent = total.toFixed(2);
  
  
    const baseHeight = 50; 
    const itemHeight = 50; 
    const cartHeight = baseHeight + (cart.length * itemHeight);
    cartItems.style.height = `${cartHeight}px`;
  }
  
  function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }