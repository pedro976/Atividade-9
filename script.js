//Pedro Henrique Rocha de Souza Matricula 908683//
const data = {
    produtos: [
        { id: 1, nome: "PlayStation 5", preco: 3999.90, categoria: "Games", imagem: "https://via.placeholder.com/150", descricao: "Console de última geração com SSD ultra rápido.", emEstoque: true },
        { id: 2, nome: "MacBook Air M2", preco: 7999.00, categoria: "Notebooks", imagem: "https://via.placeholder.com/150", descricao: "Chip M2, silencioso e bateria de longa duração.", emEstoque: true },
        { id: 3, nome: "Mouse Gamer RGB", preco: 250.00, categoria: "Acessórios", imagem: "https://via.placeholder.com/150", descricao: "Sensor de 16000 DPI e switches mecânicos.", emEstoque: true },
        { id: 4, nome: "iPhone 15 Pro", preco: 7200.00, categoria: "Celulares", imagem: "https://via.placeholder.com/150", descricao: "Acabamento em titânio e câmeras avançadas.", emEstoque: false },
        { id: 5, nome: "Monitor 144Hz", preco: 1200.00, categoria: "Acessórios", imagem: "https://via.placeholder.com/150", descricao: "Painel IPS de 24 polegadas Full HD.", emEstoque: true },
        { id: 6, nome: "Nintendo Switch", preco: 2100.00, categoria: "Games", imagem: "https://via.placeholder.com/150", descricao: "Híbrido: jogue na TV ou no modo portátil.", emEstoque: true },
        { id: 7, nome: "Galaxy S24 Ultra", preco: 6500.00, categoria: "Celulares", imagem: "https://via.placeholder.com/150", descricao: "IA integrada e zoom de 100x.", emEstoque: true },
        { id: 8, nome: "Dell XPS 13", preco: 9500.00, categoria: "Notebooks", imagem: "https://via.placeholder.com/150", descricao: "O melhor notebook Windows ultrafino.", emEstoque: false }
    ]
};


const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.getElementById("btnRender");

function formatPrice(preco) {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
}

function createProductCard(produto) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", produto.id);
    
 
    card.style.padding = "15px";

    card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3 class="card-title">${produto.nome}</h3>
        <p class="category-label">${produto.categoria}</p>
        <p class="price">${formatPrice(produto.preco)}</p>
        <div class="card-actions">
            <button class="btn-details">Ver detalhes</button>
            <button class="btn-highlight">Destacar</button>
        </div>
    `;

    
    card.querySelector(".btn-details").addEventListener("click", () => showProductDetails(produto));
    card.querySelector(".btn-highlight").addEventListener("click", () => {
        card.classList.toggle("highlight");
    });

    return card;
}

function renderProducts(produtos) {
    productList.innerHTML = "";
    produtos.forEach(p => {
        const card = createProductCard(p);
        productList.appendChild(card);
    });

    const allCards = document.querySelectorAll(".card");
    console.log("--- Listagem de IDs Renderizados ---");
    allCards.forEach(card => {
        console.log("ID do Produto:", card.getAttribute("data-id"));
    });
}

function renderCategories() {
    const categorias = ["Todas", ...new Set(data.produtos.map(p => p.categoria))];
    categorySelect.innerHTML = categorias.map(c => `<option value="${c}">${c}</option>`).join("");
}

function showProductDetails(produto) {
    productDetails.innerHTML = `
        <h3>Detalhes do Produto</h3>
        <p><strong>Nome:</strong> ${produto.nome}</p>
        <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Estoque:</strong> ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
        <p><strong>Descrição:</strong> ${produto.descricao}</p>
    `;
    productDetails.style.border = "2px solid #007bff";
}

function filterProducts() {
    const text = searchInput.value.toLowerCase();
    const cat = categorySelect.value;

    const filtrados = data.produtos.filter(p => {
        const matchesText = p.nome.toLowerCase().includes(text);
        const matchesCat = cat === "Todas" || p.categoria === cat;
        return matchesText && matchesCat;
    });

    renderProducts(filtrados);
}

searchInput.addEventListener("input", filterProducts);
categorySelect.addEventListener("change", filterProducts);
btnRender.addEventListener("click", () => renderProducts(data.produtos));


renderCategories();
renderProducts(data.produtos);