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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// ==========================================
// 1. VARIÁVEIS GLOBAIS E ESTADO
// ==========================================
let modoOrdem = 'alpha'; 
let ultimoLiderId = null; 

// ==========================================
// 2. LÓGICA DE XP, RANKING E VOZ ÉPICA
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
    const todas = obterTodasAsListas();
    const dadosLider = todas.find(p => String(p.id || p.nome).trim() === String(idLider).trim());
    const nomeLider = dadosLider ? (dadosLider.nome || dadosLider.titulo) : "Um novo herói";

    mostrarAviso(`⚔️ NOVO LÍDER: ${nomeLider.toUpperCase()}!`);

    setTimeout(() => {
        // Vibração (Impacto)
        if ('vibrate' in navigator) navigator.vibrate([200, 100, 400]);

        // Voz do Guerreiro
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const msg = new SpeechSynthesisUtterance(`Contemplem! ${nomeLider} acaba de conquistar o primeiro lugar no Hall da Fama! Glória ao novo líder!`);
            msg.lang = 'pt-BR';
            msg.pitch = 0.5; // Voz grossa
            msg.rate = 0.8;  // Fala pausada
            window.speechSynthesis.speak(msg);
        }
    }, 500);
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
    const textoCompleto = `${msg}\n\nAcesse: https://junior670.github.io/Hub-de-Portf-lios-Profissionais/`;

    try {
        await navigator.clipboard.writeText(textoCompleto);
        mostrarAviso("✅ Status Copiado!");
    } catch (err) {
        window.prompt("Copie o texto:", textoCompleto);
    }
}

// ==========================================
// 3. AUXILIARES E RENDERIZAÇÃO
// ==========================================

function obterTodasAsListas() {
    return [
        ...(typeof listaPortfolios !== 'undefined' ? listaPortfolios : []),
        ...(typeof listaProjetos !== 'undefined' ? listaProjetos : []),
        ...(typeof listaYoutubers !== 'undefined' ? listaYoutubers : []),
        ...(typeof listaNegocios !== 'undefined' ? listaNegocios : []),
        ...(typeof listaApoiadores !== 'undefined' ? listaApoiadores : [])
    ];
}

function criarCardHTML(item, rank = null) {
    if (!item) return "";
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
    const termo = document.getElementById('searchInput')?.value.toLowerCase() || "";
    const views = JSON.parse(localStorage.getItem('contagem_portfolios')) || {};

    const secoesMapping = [
        { id: 'gridPortfolios', lista: typeof listaPortfolios !== 'undefined' ? listaPortfolios : [] },
        { id: 'gridProjetos', lista: typeof listaProjetos !== 'undefined' ? listaProjetos : [] },
        { id: 'gridYoutubers', lista: typeof listaYoutubers !== 'undefined' ? listaYoutubers : [] },
        { id: 'gridNegocios', lista: typeof listaNegocios !== 'undefined' ? listaNegocios : [] },
        { id: 'gridApoiadores', lista: typeof listaApoiadores !== 'undefined' ? listaApoiadores : [] }
    ];

    secoesMapping.forEach(s => {
        const grid = document.getElementById(s.id);
        if (!grid) return;
        let filtrados = s.lista.filter(i => (i.nome||i.titulo||"").toLowerCase().includes(termo) || (i.tags||"").toLowerCase().includes(termo));
        
        if (modoOrdem === 'hot') {
            filtrados.sort((a,b) => (views[b.id||b.nome]||0) - (views[a.id||a.nome]||0));
        } else {
            filtrados.sort((a,b) => (a.nome||a.titulo||"").localeCompare(b.nome||b.titulo||""));
        }
        grid.innerHTML = filtrados.map(item => criarCardHTML(item)).join('') || `<p style="grid-column:1/-1;text-align:center;">Nenhum item.</p>`;
    });

    const gridTop3 = document.getElementById('gridTop3');
    const secaoHall = document.getElementById('secaoHallDaFama');
    if (gridTop3 && secaoHall) {
        if (termo === "") {
            const rankings = obterRankings().slice(0, 3);
            if (rankings.length > 0) {
                secaoHall.style.display = "block";
                const todas = obterTodasAsListas();
                gridTop3.innerHTML = rankings.map((r, i) => {
                    const dados = todas.find(p => String(p.id || p.nome).trim() === String(r[0]).trim());
                    return dados ? criarCardHTML(dados, i + 1) : "";
                }).join('');
            } else { secaoHall.style.display = "none"; }
        } else { secaoHall.style.display = "none"; }
    }
}

function mudarOrdem(modo) { modoOrdem = modo; realizarBusca(); }

// ==========================================
// 4. INICIALIZAÇÃO E EVENTOS (ONLOAD)
// ==========================================

window.onload = () => {
    // 1. DESBLOQUEADOR (Ativa Áudio/Vibração no 1º clique)
    document.body.addEventListener('click', () => {
        if ('speechSynthesis' in window) window.speechSynthesis.speak(new SpeechSynthesisUtterance(""));
        if ('vibrate' in navigator) navigator.vibrate(10);
        console.log("Sistemas de interação liberados!");
    }, { once: true });

    // 2. BOTÃO IR PARA O TOPO
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

    // 3. SINCRONIZAÇÃO FIREBASE (Tempo Real)
    database.ref('contagem_portfolios').on('value', (snapshot) => {
        const dados = snapshot.val() || {};
        localStorage.setItem('contagem_portfolios', JSON.stringify(dados));
        
        const rankings = obterRankings();
        if (rankings.length > 0) {
            const liderAtualId = rankings[0][0];
            // Se o líder mudou, o Guerreiro anuncia!
            if (ultimoLiderId !== null && liderAtualId !== ultimoLiderId) {
                anunciarNovoLider(liderAtualId);
            }
            ultimoLiderId = liderAtualId;
        }
        realizarBusca();
    });

    // 4. CAMPO DE BUSCA
    document.getElementById('searchInput')?.addEventListener('input', realizarBusca);
};
