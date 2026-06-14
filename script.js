// BANCO DE DADOS DINÂMICO (ARRAYS DE OBJETOS)
const dadosDiagnostico = [
    {
        icone: "fa-solid fa-flask",
        titulo: "Insumos Químicos",
        desc: "Os fertilizantes sintéticos fornecem nutrientes minerais puros em alta velocidade e dosagens concentradas direto para as raízes das plantas."
    },
    {
        icone: "fa-solid fa-shovels",
        titulo: "Matéria Orgânica",
        desc: "Esterco, compostagem e restos vegetais dependem de digestão biológica microbiana. Alimentam e estruturam o solo, não apenas a planta."
    },
    {
        icone: "fa-solid fa-triangle-exclamation",
        titulo: "Ameaça de Degradação",
        desc: "O uso exclusivo e massivo de adubos químicos sem reposição de matéria orgânica quebra a biodiversidade biológica natural e compacta o solo."
    }
];

const dadosSolucoes = [
    {
        icone: "fa-solid fa-hand-holding-seedling",
        titulo: "Manejo Integrado",
        desc: "Combinar fertilizações minerais precisas com aportes robustos de palhada e biofertilizantes orgânicos para o equilíbrio total."
    },
    {
        icone: "fa-solid fa-rotate",
        titulo: "Rotação de Culturas",
        desc: "Alternar espécies comerciais com plantas leguminosas fixadoras de nitrogênio no solo, reduzindo a necessidade de químicos sintéticos."
    },
    {
        icone: "fa-solid fa-map-location-dot",
        titulo: "Agricultura de Precisão",
        desc: "Utilizar mapeamentos analíticos digitais para aplicar rigorosamente apenas as doses de nutrientes demandadas em cada micro-zona da lavoura."
    }
];

const dadosPanorama = [
    { num: "45%", titulo: "De economia em insumos", desc: "Obtida ao integrar compostagem orgânica estrutural." },
    { num: "75%", titulo: "Da vida do solo protegida", desc: "Evitando a degradação e salinização por acidez residual." },
    { num: "+3X", titulo: "Mais retenção hídrica", desc: "Camadas orgânicas agem como esponjas segurando umidade útil." }
];

// INICIALIZAÇÃO E RENDERIZAÇÃO DINÂMICA
document.addEventListener("DOMContentLoaded", () => {
    renderizarCards("grid-diagnostico", dadosDiagnostico);
    renderizarCards("grid-solucoes", dadosSolucoes);
    renderizarPanorama();
    inicializarAcessibilidade();
    inicializarGaleriaHero();
    inicializarSimulador();
    inicializarTabs();
    inicializarCarrossel();
    inicializarAccordion();
});

// FUNÇÃO MODULAR DE RENDERIZAÇÃO DE CARDS
function renderizarCards(idElemento, listaDados) {
    const container = document.getElementById(idElemento);
    if(!container) return;
    
    container.innerHTML = listaDados.map(item => `
        <article class="card-dinamico">
            <i class="${item.icone}" aria-hidden="true"></i>
            <h3>${item.titulo}</h3>
            <p>${item.desc}</p>
        </article>
    `).join('');
}

// RENDERIZAÇÃO DO PANORAMA GERAL
function renderizarPanorama() {
    const container = document.getElementById("grid-panorama");
    if(!container) return;

    container.innerHTML = dadosPanorama.map(item => `
        <div class="indicador-item">
            <h3>${item.num}</h3>
            <p>${item.titulo}</p>
            <small style="display:block; opacity:0.8; margin-top:5px;">${item.desc}</small>
        </div>
    `).join('');
}

// RECURSOS DE ACESSIBILIDADE (FONTE E CONTRASTE)
function inicializarAcessibilidade() {
    let tamanhoFonteAtual = 16;
    const body = document.body;

    document.getElementById("btn-aumentar-fonte").addEventListener("click", () => {
        if(tamanhoFonteAtual < 22) {
            tamanhoFonteAtual += 2;
            body.style.setProperty('--base-font-size', tamanhoFonteAtual + 'px');
        }
    });

    document.getElementById("btn-diminuir-fonte").addEventListener("click", () => {
        if(tamanhoFonteAtual > 12) {
            tamanhoFonteAtual -= 2;
            body.style.setProperty('--base-font-size', tamanhoFonteAtual + 'px');
        }
    });

    document.getElementById("btn-alto-contraste").addEventListener("click", () => {
        body.classList.toggle("alto-contrast");
        body.classList.toggle("alto-contraste"); // Compatibilidade de classe
    });
}

// MINI GALERIA HERO 
function inicializarGaleriaHero() {
    const itens = document.querySelectorAll(".galeria-item");
    if(itens.length === 0) return;
    let indice = 0;

    const mudarImagem = (novoIndice) => {
        itens[indice].classList.remove("ativo");
        indice = (novoIndice + itens.length) % itens.length;
        itens[indice].classList.add("ativo");
    };

    document.getElementById("galeria-next").addEventListener("click", () => mudarImagem(indice + 1));
    document.getElementById("galeria-prev").addEventListener("click", () => mudarImagem(indice - 1));
}

// 3. ECOSSISTEMA SIMULADOR INTERATIVO
function inicializarSimulador() {
    const btnSimular = document.getElementById("btn-simular");
    const seletor = document.getElementById("seletor-adubo");
    const painel = document.getElementById("resultado-painel");

    if(!btnSimular) return;

    const cenarios = {
        "equilibrio": {
            titulo: "Produtividade Sustentável Ativada!",
            desc: "Excelente escolha! Os minerais supriram as plantas de imediato, enquanto a matéria orgânica garantiu a retenção de água e preservou fungos e minhocas. O solo continuará fértil por décadas.",
            icone: "fa-solid fa-circle-check",
            cor: "#2e7d32"
        },
        "quimico-excesso": {
            titulo: "Alerta de Degradação Crítica!",
            desc: "Impacto Imediato: As plantas cresceram rápido, mas o excesso de sais minerais acidificou a terra e exterminou a vida microbiana. Na próxima chuva, o adubo escorrerá para os rios da região provocando poluição.",
            icone: "fa-solid fa-triangle-exclamation",
            cor: "#c62828"
        },
        "organico-puro": {
            titulo: "Crescimento Lento e Seguro",
            desc: "A saúde do solo está impecável e cheia de microrganismos. Porém, se a terra estava previamente exaurida, a liberação lenta de nutrientes gerou uma colheita inicial abaixo da meta comercial planejada.",
            icone: "fa-solid fa-clock-rotate-left",
            cor: "#ef6c00"
        }
    };

    btnSimular.addEventListener("click", () => {
        const escolha = seletor.value;
        const cenario = cenarios[escolha];

        painel.style.background = cenario.cor;
        painel.innerHTML = `
            <div class="status-tela" style="animation: fadeIn 0.5s ease;">
                <i class="${cenario.icone}"></i>
                <h3>${cenario.titulo}</h3>
                <p>${cenario.desc}</p>
            </div>
        `;
    });
}

// 5. SISTEMA DE ABAS (TABS ACESSÍVEIS)
function inicializarTabs() {
    const abas = document.querySelectorAll('[role="tab"]');
    const paineis = document.querySelectorAll('[role="tabpanel"]');

    abas.forEach(aba => {
        aba.addEventListener("click", () => {
            // Desativar todas as abas
            abas.forEach(a => {
                a.setAttribute("aria-selected", "false");
                a.setAttribute("tabindex", "-1");
            });
            // Ocultar painéis
            paineis.forEach(p => p.setAttribute("hidden", "true"));

            // Ativar aba clicada
            aba.setAttribute("aria-selected", "true");
            aba.removeAttribute("tabindex");
            
            const idPainel = aba.getAttribute("aria-controls");
            document.getElementById(idPainel).removeAttribute("hidden");
        });

        // Suporte a navegação por teclado (Setas Direcionais)
        aba.addEventListener("keydown", (e) => {
            let index = Array.from(abas).indexOf(aba);
            if (e.key === "ArrowRight") {
                let proxima = abas[index + 1] || abas[0];
                proxima.focus();
                proxima.click();
            } else if (e.key === "ArrowLeft") {
                let anterior = abas[index - 1] || abas[abas.length - 1];
                anterior.focus();
                anterior.click();
            }
        });
    });
}

// 6. CARROSSEL INTERATIVO COM ACESSIBILIDADE E AUTOPLAY
function inicializarCarrossel() {
    const container = document.getElementById("carrossel-container");
    const slides = document.querySelectorAll(".carrossel-slide");
    const dotsContainer = document.getElementById("carrossel-dots");
    
    if(!container || slides.length === 0) return;

    let indexAtual = 0;
    let intervaloAutoplay;

    // Gerar Indicadores (Dots)
    slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.classList.add("dot");
        if(i === 0) dot.classList.add("ativo");
        dot.setAttribute("aria-label", `Ir para o slide de exemplo ${i + 1}`);
        dotsContainer.appendChild(dot);
        dot.addEventListener("click", () => moverPara(i));
    });

    const dots = document.querySelectorAll(".dot");

    function moverPara(novoIndice) {
        indexAtual = (novoIndice + slides.length) % slides.length;
        container.style.transform = `translateX(-${indexAtual * 100}%)`;
        
        dots.forEach(d => d.classList.remove("ativo"));
        dots[indexAtual].classList.add("ativo");
    }

    function iniciarAutoplay() {
        intervaloAutoplay = setInterval(() => moverPara(indexAtual + 1), 5000);
    }
    function pararAutoplay() { clearInterval(intervaloAutoplay); }

    document.getElementById("btn-carrossel-next").addEventListener("click", () => moverPara(indexAtual + 1));
    document.getElementById("btn-carrossel-prev").addEventListener("click", () => moverPara(indexAtual - 1));

    // Pausar sob hover do mouse (Melhoria de usabilidade)
    const wrapper = document.querySelector(".carrossel-wrapper");
    wrapper.addEventListener("mouseenter", pararAutoplay);
    wrapper.addEventListener("mouseleave", iniciarAutoplay);

    // Suporte Básico a Touch Swipe Mobile
    let xInicial = null;
    wrapper.addEventListener("touchstart", (e) => xInicial = e.touches[0].clientX, {passive: true});
    wrapper.addEventListener("touchmove", (e) => {
        if(!xInicial) return;
        let xDiferenca = xInicial - e.touches[0].clientX;
        if(xDiferenca > 50) moverPara(indexAtual + 1); // swipe esquerda
        if(xDiferenca < -50) moverPara(indexAtual - 1); // swipe direita
        xInicial = null;
    }, {passive: true});

    iniciarAutoplay();
}

// 9. ACORDEÃO (FAQ ACESSÍVEL - APENAS UM ABERTO POR VEZ)
function inicializarAccordion() {
    const headers = document.querySelectorAll(".accordion-header");

    headers.forEach(header => {
        header.addEventListener("click", () => {
            const estaAberto = header.getAttribute("aria-expanded") === "true";
            const painelConteudo = header.nextElementSibling;

            // Fechar todos antes
            headers.forEach(h => {
                h.setAttribute("aria-expanded", "false");
                h.nextElementSibling.setAttribute("hidden", "true");
            });

            // Se não estava aberto, abre o atual
            if(!estaAberto) {
                header.setAttribute("aria-expanded", "true");
                painelConteudo.removeAttribute("hidden");
            }
        });
    });
}