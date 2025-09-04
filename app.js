const API_URL = "https://fakestoreapi.com/products";
const productsContainer = document.getElementById("productsContainer");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");
const sortProducts = document.getElementById("sortProducts");

let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];