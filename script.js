/* ===============================
   MÓDULO PRODUTOS E CARRINHO
=============================== */

// Array de produtos com informações detalhadas
const products = [
  {
    id: 1,
    name: "Produto 1",
    price: 49.90,
    image: "https://static.dw.com/image/68793590_803.webp",
    description: "Descrição detalhada do Produto 1. Esse é um produto de alta qualidade com excelentes características."
  },
  {
    id: 2,
    name: "Produto 2",
    price: 79.90,
    image: "https://via.placeholder.com/250x150?text=Produto+2",
    description: "Descrição detalhada do Produto 2. Ideal para quem procura eficiência e bom custo-benefício."
  },
  {
    id: 3,
    name: "Produto 3",
    price: 99.90,
    image: "https://via.placeholder.com/250x150?text=Produto+3",
    description: "Descrição detalhada do Produto 3. Um produto premium com design sofisticado e desempenho superior."
  }
];

// Variáveis para armazenar itens do carrinho e o produto atualmente exibido no modal
let cart = [];
let currentModalProduct = null;

// Seleciona os elementos da página relacionados a produtos e carrinho
const productsSection = document.getElementById("products-section");
const cartCount = document.getElementById("cart-count");
const cartButton = document.getElementById("cart-btn");
const cartElement = document.getElementById("cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const closeCartButton = document.getElementById("close-cart-btn");
const checkoutButton = document.getElementById("checkout-btn");
const searchInput = document.getElementById("search-input");

// Elementos do modal de detalhes do produto
const productModal = document.getElementById("product-modal");
const closeModal = document.querySelector(".close-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const modalDescription = document.getElementById("modal-description");
const modalAddBtn = document.getElementById("modal-add-btn");

// Função para formatar valores em reais
function formatPrice(price) {
  return `R$${price.toFixed(2)}`;
}

// Renderiza os produtos na página (pode receber um array filtrado)
function renderProducts(items = products) {
  productsSection.innerHTML = "";
  items.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}" data-id="${product.id}" class="product-image">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>Preço: ${formatPrice(product.price)}</p>
        <button class="details-btn" data-id="${product.id}">Ver Detalhes</button>
        <button class="add-btn" data-id="${product.id}">Adicionar ao Carrinho</button>
      </div>
    `;
    productsSection.appendChild(productDiv);
  });
}

// Atualiza a exibição do carrinho (lista de itens e total)
function updateCartDisplay() {
  cartCount.innerText = cart.length;
  cartItemsContainer.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ${formatPrice(item.price)}
      <button data-index="${index}" class="remove-item">X</button>
    `;
    cartItemsContainer.appendChild(li);
  });
  cartTotal.innerText = `Total: ${formatPrice(total)}`;
}

// Adiciona um produto ao carrinho com base no ID
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    updateCartDisplay();
  }
}

// Remove um item do carrinho com base no índice
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

// Abre o modal com os detalhes do produto
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    currentModalProduct = product;
    modalImg.src = product.image;
    modalTitle.innerText = product.name;
    modalPrice.innerText = `Preço: ${formatPrice(product.price)}`;
    modalDescription.innerText = product.description;
    productModal.classList.remove("hidden");
  }
}

// Fecha o modal de detalhes
function closeProductModal() {
  productModal.classList.add("hidden");
  currentModalProduct = null;
}

// Filtra os produtos conforme o termo de busca
function filterProducts(query) {
  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
  renderProducts(filtered);
}

// Eventos para produtos e carrinho
productsSection.addEventListener("click", (e) => {
  const target = e.target;
  const productId = parseInt(target.getAttribute("data-id"));
  if (target.classList.contains("add-btn")) {
    addToCart(productId);
  }
  if (target.classList.contains("details-btn") || target.classList.contains("product-image")) {
    openProductModal(productId);
  }
});

cartItemsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item")) {
    const index = parseInt(e.target.getAttribute("data-index"));
    removeFromCart(index);
  }
});

cartButton.addEventListener("click", () => {
  cartElement.classList.toggle("hidden");
});
closeCartButton.addEventListener("click", () => {
  cartElement.classList.add("hidden");
});

checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  alert("Compra finalizada com sucesso!");
  cart = [];
  updateCartDisplay();
  cartElement.classList.add("hidden");
});

searchInput.addEventListener("input", (e) => {
  filterProducts(e.target.value);
});

closeModal.addEventListener("click", closeProductModal);
modalAddBtn.addEventListener("click", () => {
  if (currentModalProduct) {
    addToCart(currentModalProduct.id);
    closeProductModal();
  }
});
window.addEventListener("click", (e) => {
  if (e.target === productModal) {
    closeProductModal();
  }
});

/* Renderiza os produtos na inicialização */
renderProducts();


/* ===============================
         MÓDULO CHAT
=============================== */
// Seleciona os elementos do chat na seção "Home"
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatSendBtn = document.getElementById("chat-send-btn");

// Envia a mensagem e adiciona ao chat
function sendChatMessage() {
  const message = chatInput.value.trim();
  if (message === "") return;
  
  // Mensagem do usuário
  const userMsgDiv = document.createElement("div");
  userMsgDiv.classList.add("chat-message", "user-message");
  userMsgDiv.textContent = message;
  chatMessages.appendChild(userMsgDiv);
  chatInput.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  // Resposta simulada do "bot" com leve atraso
  setTimeout(() => {
    const botMsgDiv = document.createElement("div");
    botMsgDiv.classList.add("chat-message", "bot-message");
    botMsgDiv.textContent = "Obrigado pela sua mensagem! Em que posso ajudar?";
    chatMessages.appendChild(botMsgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1000);
}

// Eventos do chat
chatSendBtn.addEventListener("click", sendChatMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendChatMessage();
  }
});


/* ===============================
      MÓDULO AVALIAÇÃO DO SITE
=============================== */
// Seleciona as estrelas de avaliação (deve haver um container com id "rating-container")
// Por exemplo, no HTML você pode criar:
// <div id="rating-container">
//   <span class="star" data-rating="1">&#9733;</span>
//   <span class="star" data-rating="2">&#9733;</span>
//   <span class="star" data-rating="3">&#9733;</span>
//   <span class="star" data-rating="4">&#9733;</span>
//   <span class="star" data-rating="5">&#9733;</span>
// </div>
const ratingStars = document.querySelectorAll("#rating-container .star");

ratingStars.forEach(star => {
  star.addEventListener("click", function() {
    const rating = this.getAttribute("data-rating");
    // Marca as estrelas até a escolhida
    ratingStars.forEach(s => {
      if (s.getAttribute("data-rating") <= rating) {
        s.classList.add("selected");
      } else {
        s.classList.remove("selected");
      }
    });
    alert(`Obrigado pelo feedback de ${rating} estrela(s)!`);
  });
});
