const todosProdutos = [
    {
      id: 1,
      nome: "Vestido Floral",
      preco: 129.90,
      imagem: "imagens/vestido1.jpg",
      categoria: "vestidos"
    },
    {
      id: 2,
      nome: "Saia Longa",
      preco: 99.90,
      imagem: "imagens/saia1.jpg",
      categoria: "saias"
    },
    {
      id: 3,
      nome: "Blusa Delicada",
      preco: 59.90,
      imagem: "imagens/blusa1.jpg",
      categoria: "blusas"
    },
    {
      id: 4,
      nome: "Vestido Clássico",
      preco: 139.90,
      imagem: "imagens/vestido2.jpg",
      categoria: "vestidos"
    },
  ];
  
  function renderizarProdutos(produtos) {
    const container = document.getElementById("lista-produtos");
    container.innerHTML = ""; // Limpa antes de mostrar
    produtos.forEach(produto => {
      const div = document.createElement("div");
      div.classList.add("produto");
      div.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <p>R$ ${produto.preco.toFixed(2)}</p>
        <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
      `;
      container.appendChild(div);
    });
  }
  
  function filtrarCategoria(categoria) {
    if (categoria === "todos") {
      renderizarProdutos(todosProdutos);
    } else {
      const filtrados = todosProdutos.filter(p => p.categoria === categoria);
      renderizarProdutos(filtrados);
    }
  }
  
  function adicionarAoCarrinho(id) {
    alert("Produto adicionado ao carrinho! ID: " + id);
  }
  
  // Mostrar todos por padrão
  if (document.getElementById("lista-produtos")) {
    renderizarProdutos(todosProdutos);
  }
  
 // Função para adicionar ao carrinho
function adicionarAoCarrinho(id) {
  const produto = todosProdutos.find(p => p.id === id);
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  carrinho.push(produto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  alert("Produto adicionado ao carrinho!");
}

// Função para carregar carrinho
function adicionarAoCarrinho(id) {
  const produto = todosProdutos.find(p => p.id === id);
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  carrinho.push(produto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  // Mostra a mensagem com o link
  const mensagem = document.getElementById("mensagem-carrinho");
  if (mensagem) {
    mensagem.style.display = "block";
  }

  container.innerHTML = "";
  let total = 0;

  carrinho.forEach((produto, index) => {
    total += produto.preco;

    const div = document.createElement("div");
    div.classList.add("produto");
    div.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" />
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button onclick="removerDoCarrinho(${index})">Remover</button>
    `;
    container.appendChild(div);
  });

  totalEl.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Função para remover item
function removerDoCarrinho(index) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));// Atualiza
  carregarCarrinho(); // Atualiza a exibição
}

// Função para carregar carrinho//
function carregarCarrinho() {
  const container = document.getElementById("itens-carrinho");
  const totalEl = document.getElementById("total");

  // Garante que os elementos existem na página
  if (!container || !totalEl) return;

  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Se carrinho estiver vazio
  if (carrinho.length === 0) {
    container.innerHTML = "<p>Seu carrinho está vazio.</p>";
    totalEl.textContent = "Total: R$ 0,00";
    return;
  }

  // Se tiver itens, renderiza
  container.innerHTML = "";
  let total = 0;

  carrinho.forEach((produto, index) => {
    total += produto.preco;

    const div = document.createElement("div");
    div.classList.add("produto");
    div.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" style="width:100px; height:auto;">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button onclick="removerDoCarrinho(${index})">Remover</button>
    `;
    container.appendChild(div);
  });

  totalEl.textContent = `Total: R$ ${total.toFixed(2)}`;
}


// Carregar automaticamente se for a página do carrinho
if (document.getElementById("itens-carrinho")) {
  carregarCarrinho();
}
