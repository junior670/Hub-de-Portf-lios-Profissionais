// ==========================================
// 0. CONFIGURAÇÃO E CONEXÃO FIREBASE
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyD2YnCjJRZ6Of4UbtxuIVKdbvB0MBJfgBc",
    authDomain: "hubportfoliosp.firebaseapp.com",
    databaseURL: "https://hubportfoliosp-default-rtdb.firebaseio.com",
    projectId: "hubportfoliosp",
    storageBucket: "hubportfoliosp.firebasestorage.app",
    messagingSenderId: "569514414525",
    appId: "1:569514414525:web:a2a50953c3cc43446642d4"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ==========================================
// 1. VARIÁVEIS GLOBAIS E ESTADO
// ==========================================
let modoOrdem = 'alpha'; 
let ultimoLiderId = null; 

// ==========================================
// 2. LÓGICA DE XP, RANKING E VOZ
// ==========================================

function obterStatusXP(views) {
    if (views >= 100) return { label: "💎 LENDÁRIO", class: "legendary", percent: 100 };
    if (views >= 50) return { label: "🔥 ELITE", class: "elite", percent: Math.min(((views - 50) / 50) * 100, 100) };
    if (views >= 10) return { label: "⚡ PRO", class: "pro", percent: ((views - 10) / 40) * 100 };
    return { label: "🌱 INICIANTE", class: "newbie", percent: (views / 10) * 100 };
}

function registrarVisualizacao(idItem) {
    const ref = database.ref('contagem_portfolios/' + idItem);
    ref.transaction((currentViews) => (currentViews || 0) + 1);
}

function obterRankings() {
    const views = JSON.parse(localStorage.getItem('contagem_portfolios')) || {};
    return Object.entries(views)
        .filter(entry => entry[1] > 0)
        .sort((a, b) => b[1] - a[1]);
}

function anunciarNovoLider(idLider) {
    const todasAsListas = [
        ...(typeof listaPortfolios !== 'undefined' ? listaPortfolios : []),
        ...(typeof listaProjetos !== 'undefined' ? listaProjetos : []),
        ...(typeof listaYoutubers !== 'undefined' ? listaYoutubers : []),
        ...(typeof listaNegocios !== 'undefined' ? listaNegocios : []),
        ...(typeof listaApoiadores !== 'undefined' ? listaApoiadores : [])
    ];
    
    const dadosLider = todasAsListas.find(p => String(p.id || p.nome) === String(idLider));
    const nomeLider = dadosLider ? (dadosLider.nome || dadosLider.titulo) : "Um novo herói";

    // 1. Feedback Visual
    mostrarAviso(`⚔️ GLÓRIA AO NOVO LÍDER: ${nomeLider.toUpperCase()}!`);

    // 2. Vibração (Efeito de Impacto no Celular)
    // O padrão [200, 100, 200] faz: treme, para, treme forte.
    if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 500]);
    }

    // 3. Voz de Guerreiro
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Para falas antigas

        const mensagem = new SpeechSynthesisUtterance();
        mensagem.text = `Contemplem! ${nomeLider} acaba de conquistar o primeiro lugar no Hall da Fama! Glória ao novo líder!`;
        mensagem.lang = 'pt-BR';
        
        // Ajustes para voz de Guerreiro
        mensagem.pitch = 0.5;  // Voz bem grossa
        mensagem.rate = 0.8;   // Fala pausada
        mensagem.volume = 1;   
        
        window.speechSynthesis.speak(mensagem);
    }
}

function mostrarAviso(texto) {
    const toast = document.createElement('div');
    toast.className = 'toast-sucesso';
    toast.innerText = texto;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3500);
}

async function compartilharStatus(event, nome, views, rank) {
    if (event) { event.preventDefault(); event.stopPropagation(); }
    const msg = (rank && rank > 0) 
        ? `🏆 O projeto "${nome}" está em ${rank}º lugar no Hall da Fama!` 
        : `🚀 Confira o projeto "${nome}"! Já tem ${views} visualizações.`;
    const url = "https://junior670.github.io/Hub-de-Portf-lios-Profissionais/";
    const textoCompleto = `${msg}\n\nAcesse: ${url}`;

    try {
        await navigator.clipboard.writeText(textoCompleto);
        mostrarAviso("✅ Status Copiado!");
    } catch (err) {
        window.prompt("Copie o texto:", textoCompleto);
    }
}

// ==========================================
// 3. RENDERIZAÇÃO E INTERFACE
// ==========================================

function criarCardHTML(item, rank = null) {
    if (!item) return ""; // Proteção contra item nulo
    const viewsData = JSON.parse(localStorage.getItem('contagem_portfolios')) || {};
    const idItem = item.id || item.nome;
    const totalViews = viewsData[idItem] || 0;
    const status = obterStatusXP(totalViews);

    return `
        <div class="card" style="position:relative;">
            ${rank ? `<div class="rank-badge">${rank}º</div>` : ''}
            ${item.imagem ? `<img src="${item.imagem}" alt="${item.nome}" class="card-img">` : ''}
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 5px;">
                <span class="xp-badge xp-${status.class}">${status.label}</span>
                <span style="font-size:0.7em; color:#666;">${Math.floor(status.percent)}%</span>
            </div>
            <div class="xp-container"><div class="xp-bar bar-${status.class}" style="width: ${status.percent}%;"></div></div>
            <h3>${item.nome || item.titulo || "Sem Nome"}</h3>
            <p style="color: var(--neon-purple); font-size: 0.75em; font-weight: bold; margin-bottom: 5px;">🔥 ${totalViews} visualizações</p>
            <p style="margin-bottom: 15px; color: #ccc; font-size: 0.9em; flex-grow: 1;">${item.desc || item.bio || "Clique para saber mais."}</p>
            <div style="display: flex; flex-direction: column; gap: 8px;">
                ${item.link ? `<a href="${item.link}" target="_blank" class="btn-link" onclick="registrarVisualizacao('${idItem}')">Ver Mais / Acessar</a>` : ''}
                <button class="btn-share" style="color: #00f3ff !important; border: 1px solid #00f3ff; background: transparent; padding: 8px; border-radius: 4px; cursor: pointer;" onclick="compartilharStatus(event, '${item.nome || item.titulo}', ${totalViews}, ${rank || 0})">
                    📢 Compartilhar Status
                </button>
            </div>
            <div class="tags" style="margin-top: 10px; font-size: 0.75em; color: #00f3ff;">${item.tags || ''}</div>
        </div>
    `;
}

function realizarBusca() {
    const searchInput = document.getElementById('searchInput');
    const termo = searchInput ? searchInput.value.toLowerCase() : "";
    const views = JSON.parse(localStorage.getItem('contagem_portfolios')) || {};

    const processarLista = (lista) => {
        if (!lista) return [];
        let resultado = lista.filter(item => 
            (item.nome || item.titulo || "").toLowerCase().includes(termo) ||
            (item.tags || "").toLowerCase().includes(termo) ||
            (item.desc || item.bio || "").toLowerCase().includes(termo)
        );
        return modoOrdem === 'hot' 
            ? resultado.sort((a, b) => (views[b.id || b.nome] || 0) - (views[a.id || a.nome] || 0))
            : resultado.sort((a, b) => (a.nome || a.titulo || "").localeCompare(b.nome || b.titulo || ""));
    };

    // Atualiza as Grids principais
    const secoes = [
        { id: 'gridPortfolios', lista: typeof listaPortfolios !== 'undefined' ? listaPortfolios : [] },
        { id: 'gridProjetos', lista: typeof listaProjetos !== 'undefined' ? listaProjetos : [] },
        { id: 'gridYoutubers', lista: typeof listaYoutubers !== 'undefined' ? listaYoutubers : [] },
        { id: 'gridNegocios', lista: typeof listaNegocios !== 'undefined' ? listaNegocios : [] },
        { id: 'gridApoiadores', lista: typeof listaApoiadores !== 'undefined' ? listaApoiadores : [] }
    ];

    secoes.forEach(secao => {
        const grid = document.getElementById(secao.id);
        if (grid) {
            const filtrados = processarLista(secao.lista);
            grid.innerHTML = filtrados.map(item => criarCardHTML(item)).join('') || `<p style="grid-column:1/-1;text-align:center;color:#666;">Nenhum item encontrado.</p>`;
        }
    });

    // --- CORREÇÃO DO HALL DA FAMA ---
    const gridTop3 = document.getElementById('gridTop3');
    const secaoHall = document.getElementById('secaoHallDaFama');
    
    if (gridTop3 && secaoHall) {
        if (termo === "") {
            const rankings = obterRankings().slice(0, 3);
            if (rankings.length > 0) {
                secaoHall.style.display = "block";
                const todasAsListas = secoes.reduce((acc, curr) => acc.concat(curr.lista), []);
                
                const itensTop3HTML = rankings.map((rankItem, index) => {
                    const dadosCompletos = todasAsListas.find(p => String(p.id || p.nome) === String(rankItem[0]));
                    return dadosCompletos ? criarCardHTML(dadosCompletos, index + 1) : "";
                }).join('');
                
                gridTop3.innerHTML = itensTop3HTML;
            } else {
                secaoHall.style.display = "none";
            }
        } else {
            secaoHall.style.display = "none";
        }
    }
}

// ==========================================
// 4. INICIALIZAÇÃO E MONITORAMENTO
// ==========================================

window.onload = () => {
    database.ref('contagem_portfolios').on('value', (snapshot) => {
        const dadosNuvem = snapshot.val() || {};
        localStorage.setItem('contagem_portfolios', JSON.stringify(dadosNuvem));
        
        const rankings = obterRankings();
        if (rankings.length > 0) {
            const liderAtualId = rankings[0][0];
            if (ultimoLiderId !== null && liderAtualId !== ultimoLiderId) {
                anunciarNovoLider(liderAtualId);
            }
            ultimoLiderId = liderAtualId;
        }
        realizarBusca();
    });

    const inputBusca = document.getElementById('searchInput');
    if (inputBusca) inputBusca.addEventListener('input', realizarBusca);
};

function mudarOrdem(modo) {
    modoOrdem = modo;
    realizarBusca();
}
