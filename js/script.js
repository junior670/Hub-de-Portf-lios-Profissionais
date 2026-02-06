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

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ==========================================
// 1. VARIÁVEIS GLOBAIS E ESTADO
// ==========================================
let modoOrdem = 'alpha'; 

// ==========================================
// 2. LÓGICA DE XP, RANKING E STATUS
// ==========================================

function obterStatusXP(views) {
    if (views >= 100) return { label: "💎 LENDÁRIO", class: "legendary", percent: 100 };
    if (views >= 50) {
        let p = ((views - 50) / 50) * 100;
        return { label: "🔥 ELITE", class: "elite", percent: Math.min(p, 100) };
    }
    if (views >= 10) {
        let p = ((views - 10) / 40) * 100;
        return { label: "⚡ PRO", class: "pro", percent: p };
    }
    let p = (views / 10) * 100;
    return { label: "🌱 INICIANTE", class: "newbie", percent: p };
}

// Incrementa visualização na Nuvem
function registrarVisualizacao(idItem) {
    const ref = database.ref('contagem_portfolios/' + idItem);
    ref.transaction((currentViews) => {
        return (currentViews || 0) + 1;
    });
}

// Obtém ranking baseado nos dados sincronizados do Firebase
function obterRankings() {
    const views = JSON.parse(localStorage.getItem('contagem_portfolios')) || {};
    return Object.entries(views)
        .filter(entry => entry[1] > 0)
        .sort((a, b) => b[1] - a[1]);
}

// FUNÇÃO BLINDADA: Compartilhamento que não trava o App da Play Store
async function compartilharStatus(nome, views, rank) {
    const msg = (rank && rank > 0) 
        ? `🏆 O projeto "${nome}" está em ${rank}º lugar no Hall da Fama da Galeria Tech!` 
        : `🚀 Confira o projeto "${nome}" na Galeria Tech! Já tem ${views} visualizações.`;
    
    const url = window.location.href;
    const textoCompleto = `${msg}\n\nAcesse aqui: ${url}`;

    // 1. Tenta copiar direto para o teclado (Clipboard)
    // É a forma mais segura que não trava e não sai do App
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(textoCompleto);
            alert("✅ STATUS COPIADO!\n\nO link e o ranking já estão no seu teclado. Agora é só abrir o WhatsApp ou LinkedIn e 'Colar' na sua mensagem! 🚀");
        } else {
            // Plano de fundo se o clipboard falhar
            throw new Error('Clipboard não disponível');
        }
    } catch (err) {
        // Se tudo falhar, ele mostra o texto numa caixinha para o usuário copiar manualmente
        window.prompt("O App bloqueou o compartilhamento automático. Copie o texto abaixo para postar:", textoCompleto);
    }
}
// ==========================================
// 3. CONTROLE DE ORDENAÇÃO
// ==========================================

function mudarOrdem(modo) {
    modoOrdem = modo;
    const btnAlpha = document.getElementById('btnSortAlpha');
    const btnHot = document.getElementById('btnSortHot');
    if (btnAlpha) btnAlpha.classList.toggle('active', modo === 'alpha');
    if (btnHot) btnHot.classList.toggle('active', modo === 'hot');
    realizarBusca();
}

// ==========================================
// 4. RENDERIZADOR DE CARDS
// ==========================================

function criarCardHTML(item, rank = null) {
    const viewsData = JSON.parse(localStorage.getItem('contagem_portfolios')) || {};
    const idItem = item.id || item.nome;
    const totalViews = viewsData[idItem] || 0;
    const status = obterStatusXP(totalViews);
    
    const rankingsGerais = obterRankings().slice(0, 10).map(e => e[0]);
    const isTop10 = rankingsGerais.includes(String(idItem)) && totalViews > 0;

    return `
        <div class="card ${isTop10 ? 'top-vistos' : ''}" style="position:relative;">
            ${rank ? `<div class="rank-badge">${rank}º</div>` : ''}
            ${item.imagem ? `<img src="${item.imagem}" alt="${item.nome}" class="card-img">` : ''}
            
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 5px;">
                <span class="xp-badge xp-${status.class}">${status.label}</span>
                <span style="font-size:0.7em; color:#666;">${Math.floor(status.percent)}%</span>
            </div>

            <div class="xp-container">
                <div class="xp-bar bar-${status.class}" style="width: ${status.percent}%;"></div>
            </div>
            
            <h3>${item.nome || item.titulo || "Sem Nome"}</h3>
            
            <p style="color: var(--neon-purple); font-size: 0.75em; font-weight: bold; margin-bottom: 5px;">
                🔥 ${totalViews} visualizações
            </p>

            <p style="margin-bottom: 15px; color: #ccc; font-size: 0.9em; flex-grow: 1;">
                ${item.desc || item.bio || "Clique para saber mais."}
            </p>

            <div style="display: flex; flex-direction: column; gap: 8px;">
                ${item.link ? `
                    <a href="${item.link}" target="_blank" class="btn-link" onclick="registrarVisualizacao('${idItem}')">
                        Ver Mais / Acessar
                    </a>` : ''}
                <button class="btn-share" onclick="compartilharStatus('${item.nome}', ${totalViews}, ${rank || 0})">📢 Compartilhar Status</button>
            </div>
            
            <div class="tags" style="margin-top: 10px; font-size: 0.75em; color: var(--neon-blue);">${item.tags || ''}</div>
        </div>
    `;
}

// ==========================================
// 5. BUSCA E ATUALIZAÇÃO GLOBAL
// ==========================================

function realizarBusca() {
    const searchInput = document.getElementById('searchInput');
    const termo = searchInput ? searchInput.value.toLowerCase() : "";
    const views = JSON.parse(localStorage.getItem('contagem_portfolios')) || {};

    const processarLista = (lista) => {
        if (!lista) return [];
        let resultado = lista.filter(item => 
            (item.nome || item.titulo || "").toLowerCase().includes(termo) ||
            (item.desc || item.bio || "").toLowerCase().includes(termo) ||
            (item.tags || "").toLowerCase().includes(termo)
        );

        if (modoOrdem === 'hot') {
            return resultado.sort((a, b) => (views[b.id || b.nome] || 0) - (views[a.id || a.nome] || 0));
        } else {
            return resultado.sort((a, b) => (a.nome || a.titulo || "").localeCompare(b.nome || b.titulo || ""));
        }
    };

    const secoes = [
        { lista: typeof listaPortfolios !== 'undefined' ? listaPortfolios : [], id: 'gridPortfolios' },
        { lista: typeof listaProjetos !== 'undefined' ? listaProjetos : [], id: 'gridProjetos' },
        { lista: typeof listaYoutubers !== 'undefined' ? listaYoutubers : [], id: 'gridYoutubers' },
        { lista: typeof listaNegocios !== 'undefined' ? listaNegocios : [], id: 'gridNegocios' },
        { lista: typeof listaApoiadores !== 'undefined' ? listaApoiadores : [], id: 'gridApoiadores' }
    ];

    secoes.forEach(secao => {
        const grid = document.getElementById(secao.id);
        if (grid) {
            const final = processarLista(secao.lista);
            grid.innerHTML = final.length > 0 
                ? final.map(item => criarCardHTML(item)).join('')
                : `<p style="color: #666; grid-column: 1/-1; text-align: center;">Nenhum item encontrado.</p>`;
        }
    });

    const secaoHall = document.getElementById('secaoHallDaFama');
    const gridTop3 = document.getElementById('gridTop3');

    if (secaoHall && gridTop3) {
        const rankings = obterRankings().slice(0, 3);
        if (termo === "" && rankings.length > 0) {
            secaoHall.style.display = "block";
            
            // Reúne todas as listas para encontrar o objeto completo do Top 3
            const todasAsListas = [
                ...(typeof listaPortfolios !== 'undefined' ? listaPortfolios : []),
                ...(typeof listaProjetos !== 'undefined' ? listaProjetos : []),
                ...(typeof listaYoutubers !== 'undefined' ? listaYoutubers : []),
                ...(typeof listaNegocios !== 'undefined' ? listaNegocios : []),
                ...(typeof listaApoiadores !== 'undefined' ? listaApoiadores : [])
            ];

            const itensTop3 = rankings.map(rankItem => {
                return todasAsListas.find(p => (p.id || p.nome) == rankItem[0]);
            }).filter(i => i);

            gridTop3.innerHTML = itensTop3.map((item, index) => criarCardHTML(item, index + 1)).join('');
        } else {
            secaoHall.style.display = "none";
        }
    }
}

// ==========================================
// 6. INICIALIZAÇÃO E SINCRONIZAÇÃO EM TEMPO REAL
// ==========================================

window.onload = () => {
    // Sincronização em Tempo Real com Firebase
    database.ref('contagem_portfolios').on('value', (snapshot) => {
        const dadosNuvem = snapshot.val() || {};
        localStorage.setItem('contagem_portfolios', JSON.stringify(dadosNuvem));
        realizarBusca(); // Re-renderiza tudo com os números novos
    });

    const inputBusca = document.getElementById('searchInput');
    if (inputBusca) inputBusca.addEventListener('input', realizarBusca);

    const btnTopo = document.getElementById('topBtn');
    window.addEventListener('scroll', () => {
        if (btnTopo) btnTopo.style.display = window.scrollY > 300 ? "block" : "none";
    });

    if (btnTopo) {
        btnTopo.onclick = (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    }
};


