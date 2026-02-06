const listaPortfolios = [
    {
        nome: "Junior Santos",
        link: "https://junior670.github.io/Portf-lio/",
        desc: "Formado em Gestão da Tecnologia da Informação pela Fatec Jundiaí, com pós-graduação em Matemática Financeira, Estatística e Segurança da Informação. Perfil analítico, estratégico e apaixonado por tecnologia, gestão e inovação.",
        imagem: "img/jr.jpeg",
        tags: "| Apaixonado por tecnologia🔥 | gestão🔥 | inovação🔥. | TechMaster 🧑‍💻| CyberGuard 🛡️| DataSensei 📊|CodeNinja 👨‍💻 / 👩‍💻| AI-Lover 🤖| EduCoder 📚⭐⭐⭐"
    },
    {
        nome: "Mariana Dias",
        link: "https://github.com/LabDevOps09/mariana-dias-portfolio",
        desc: "Profissional com sólida formação em análise de dados e segurança da informação, com experiência em soluções para infraestrutura de TI, automação de processos e análise de grandes volumes de dados. Especialista em Power BI, SQL, cibersegurança e administração Linux, com foco na otimização de ambientes em nuvem.",
        tags: "|Tecnologias Descentralizadas🔥 | Blockchain/Web3🔥 |(DAOs - NFTs - contratos inteligentes)🔥"
    },
    {
        nome: "Fabricio Vieira",
        link: "https://github.com/fanzz293",
        desc: "Sou formado como técnico de informática. Atualmente estou no 7º período de sistemas de informação | Mais de 10 anos de experiência com infraestrutura de PC's.",
        tags: "|TI🔥| Sistemas🔥| Python🔥 |BI 🔥"
    },
    {
        nome: "Wesley schuab Vieira",
        link: "https://github.com/WesleySchuab",
        desc: "Técnologo em Análise e Desenvolvimento de Sistemas pelo Instituto Federal de Educação, Ciência e Tecnologia de São Paulo Criador de um aplicativo Android de sucesso.Tenho adquirido experiência desenvolvendo diversos projetos pessoais e profissionais que evidenciam minhas habilidades em programação, design de interfaces e resolução de problemas.",
        tags: "| Desenvolvedor Android🔥 | Kotlin🔥 | MVVM🔥 | Jetpack Compose🔥 | REST API🔥 | Retrofit🔥 | Firebase🔥 | Clean Architeture🔥 | Rom🔥 | Coroutines🔥 | Hilt🔥 | Navigation🔥 | Testing🔥 | GitHub🔥"
    },
    {
        nome: "Sérgio Sousa",
        link: "https://portifolio-react-lovat.vercel.app/#projetos",
        desc: "Formação em Análise e Desenvolvimento de Sistemas pela UNIFATECIE, busco oportunidade e evoluir minha carreira como Web Developer Enginner Front-End Junior, desenvolvendo habilidades em projetos pessoais ou freelancer e treinamento com Bootcamp ou eventos na área de tecnologia. Atualmente estou melhorando meu inglês básico para melhor entendimento global e evolução na carreira com IA. Busco criar soluções que facilitem a vida das pessoas em resolver problemas com aplicativos web e espero contribuir com uma equipe inovadora..",
        tags: "| FrontEnd Developer Jr - JavaScript 🚀| CSS 💥| HTML 💥| React ✅| Git ✅| GitHub ✅| WSL ✅| TypeScript 🚀| Bootstrap ✅| Linux 💻| Windows 💻| Figma 📌| Markdown 📌| Azure💻 |"
    },
    {
        nome: "Camila Madureira",
        link: "https://github.com/ca-madureira",
        desc: "Estou em transição de carreira e atualmente, aprofundando meus conhecimentos em Desenvolvimento Web, com foco em tecnologias como React.js, Node.js, Express.js, Mongoose, MongoDB e Typescript.",
        tags: "| React🔥 - Next🔥 - Tailwindcss🔥 - Node🔥 - Express🔥 -  MongoDB🔥 - Javascript🔥 | WebCrafter🌐 | EduCoder 📚|"
    },
    {
        nome: "Rafhael Augusto",
        link: "https://github.com/Rafhael-Augusto",
        desc: "✨ Criando bugs desde 2024. 📚 Atualmente estou estudando back end. 🎯 Objetivo: Full Stack. 🎲 Fun fact: Comecei a me interessar no mundo da programação aos 13 anos de idade.",
        tags: "| Desenvolvedor Full Stack Python🔥 | JavaScript🔥 | TypeScript🔥 | Python🔥 | Styled Components🔥 | React Vite🔥 | Django🔥 | PostgreSQL🔥 | SQLite🔥 | REST API🔥 | Poetry🔥 | Pipenv🔥 | Git🔥 | GitHub🔥"
    },
    {
        nome: "Guilherme Boaventtura",
        link: "https://www.linkedin.com/in/guilherme-boaventura-097aa2210/",
        desc: "Olá! Sou Guilherme Silva, Tecnólogo em Gestão da Tecnologia da Informação com uma paixão por soluções tecnológicas que impulsionam a eficiência e a inovação. Minha experiência abrange diversos aspectos do setor de TI, com especializações em ERP, Power BI, redes, infraestrutura e processos.",
        tags: "| ERP🔥 | PowerBI 🔥| Redes 🔥 | InfraestruturaTI 🔥| GovernançaDeTI 🔥 | SegurançaDaInformação 🔥| Redes 🔥 | TecnologiaDaInformação 🔥| Estudante 🔥 | Aprendizagem 🔥 |  Proatividade 🔥 Colaboração 🔥"
    },
    {
        nome: "Jessica Bueno",
        link: "https://github.com/JessicaApBueno",
        desc: "Estou cursando um técnico em Desenvolvimento de Sistemas pela Fundação FAT. Estou desenvolvendo meu aprendizado na plataforma Google Cloud Skill Boosts, visando aprofundar ainda mais na área de nuvem e também estou cursando o programa re/Start na Escola da Nuvem. Participo do Programa Descodificadas com foco em Front-End.",
        tags: "| Em transição de carreira para a área de TI🔥🔥🔥, com foco em desenvolvimento front-end e Cloud Computing.🔥"
    },
    {
        nome: "Williams Ricardo",
        link: "https://github.com/rickchallen",
        desc: "🎓 Sou Formado Em Sistemas de Informação e Técnico rem Redes de Computadores 🌱 No Momento eu estou aprimorando Meus Conhecimentos em Python , GO , segurança da informação e Dados... ⚡ Gosto de Estudar Tecnologia e tocar instrumentos Musicais.",
        tags: "| 🚀 Projetos em Destaques  - toolsAgency 🔥 | Desafio_phishing / Dio 🔥 | Sistema-BancarioV1_DIO 🔥| Projeto Previsão Do Tempo 🔥"
    },
    {
        nome: "",
        link: "",
        desc: "",
        tags: "| Análise de Dados🔥 | SQL🔥| Excel🔥| Python🔥"
    },
    {
        nome: "Thaís Scheiner",
        link: "https://github.com/thaisscheiner",
        desc: "🎓 Estudante de Análise e Desenvolvimento de Sistemas - FATEC ZONA LESTE. Apaixonada por tecnologia e sempre em busca de novos desafios.",
        tags: "| Java🔥 | C#🔥 | TypeScript🔥 | Spring Boot🔥 | ASP.NET🔥 | SQL Server🔥 | Angular🔥 | ReactJS🔥 | HTML5🔥 | CSS3🔥"
    },
    {
        nome: "Denise Henrique Mafra",
        link: "https://github.com/DHMafra",
        desc: "Especialista em Educação com mais de 37 anos de experiência em ensino, gestão escolar e formação de professores. Cursou Mestrado em Educação e MBA em Gestão Escolar, além de uma sólida formação em Pedagogia e História. Ao longo da carreira, tem sido reconhecida pela atuação em projetos inovadores de educação, desenvolvimento de materiais didáticos, formação a distância e avaliação educacional. Destaca-se pela habilidade em promover aprendizagens provocativas, liderar iniciativas pedagógicas e implementar estratégias baseadas em metodologias ativas. Proativa, focada e apaixonada por contribuir para a transformação educacional, sempre buscando inspirar e motivar tanto alunos quanto colegas de trabalho.",
        tags: "| Primeiro semestre de Análise e Desenvolvimento de Sistemas | Back-End 🔥"
    },
    {
        nome: "Sérgio Rios Ribeiro",
        link: "https://www.linkedin.com/in/sergio-rios-ribeiro/",
        desc: "Estudante de Engenharia de Software. Focado em POO e interesse em Desenvolvimento Mobile.",
        tags: "| POO🔥 | MVVM🔥 | Mobile 🔥 | Android 🔥 | Kotlin🔥 | HTML 🔥 | CSS 🔥 | JavaScript 🔥🔥"
    },
    {
        nome: "Mariana Vitória",
        link: "https://github.com/MarianaOlvr11",
        desc: "Desenvolvedora Backend entusiasta de tecnologia, inovação e ciência, sempre em busca de soluções eficientes e criativas.",
        tags: "| 🎓 Cursando Análise e Desenvolvimento de Sistemas no IFSP🔥🔥| 🌸 Ela/dela.🔥 | 🎮 Videogames e esportes.🔥🔥"
    },
    {
        nome: "Rafael Vinicius Wierzba",
        link: "https://github.com/rvwierzba",
        desc: "Desenvolvedor Fullstack com mais de 4 anos de experiência em desenvolvimento web e aplicações desktop. Ele possui habilidades em C#, PHP, JavaScript, React e metodologias ágeis (Scrum). Formado em Gestão de TI e pós-graduado em Engenharia de Software, Rafael busca contribuir com projetos inovadores, tendo atuado no desenvolvimento de sistemas web e como Instrutor de Desenvolvimento Web.",
        tags: "| FullStack Developer 🔥 | C# 🔥 | PHP 🔥 |  JAVA 🔥"
    },
    {
        nome: "Samantha Adeline Córdova da Silva✞",
        link: "https://br.linkedin.com/in/samanthaadeline",
        desc: "Desde cedo, a tecnologia foi minha paixão — e encontrei no ensino o caminho ideal para compartilhá-la com o mundo. Sou formada em Ciência da Computação, com especializações em Marketing Digital e Engenharia de Software, e ao longo da carreira me especializei no ensino de programação e robótica para crianças e adolescentes.",
        tags: "| Professora de Programação 🔥 | Scratch, Robótica e Ferramentas Digitais 🔥 | Educação com Propósito 🔥"
    },
    {
        nome: "Daniele Galvão",
        link: "https://www.linkedin.com/in/daniele-galv%C3%A3o-10ba00209/",
        desc: "Sou uma profissional da área de tecnologia com sólida experiência em desenvolvimento full stack e um crescente foco em ciência de dados e inteligência artificial. Atualmente, atuo como Coordenadora de equipe de Analise de Sistemas, gerenciando equipe e desenvolvendo e mantendo aplicações web utilizando PHP (Laravel, Lumen, Flight), JavaScript (Vue.js, Quasar), HTML/CSS e AJAX. No backend, crio e consumo APIs RESTful, modelando bases de dados relacionais com MySQL e integrando boas práticas de versionamento com Git e entrega contínua com Docker.",
        tags: "| ADS 🔥 | Full Stack 🔥 | Software Developer 🔥 | PHP 🔥 | VUE.js 🔥 | Python 🔥 | Django 🔥"
    },
    {
        nome: "Isaias Lourenço",
        link: "https://isaiaslourenco-portfolio.vercel.app/",
        desc: "Formado em Ciência da Computação, já trabalho há uns 30 anos com desenvolvimento,e já trabalhei como programador de alto nível para baixa plataforma, como Cobol, e hoje sou Dev Full Stack. Gosto de Thrash Metal anos 80 e amo leitura do jeito antigo, gosto de inventar novas funcionalidade e sistemas para otimizar funções do dia-a-dia.",
        tags: "| PHP 🔥 | JavaScript 🔥 | MySQL 🔥 | PostgreSQL 🔥 | Java 🔥 | Muicrosserviços 🔥 | AWS 🔥"
    },
    {
        nome: "Gabriel Coelho Soares",
        link: "https://github.com/GabrielCoelho",
        desc: "✨ Busco constantemente desafios que me permitam crescer profissionalmente enquanto contribuo com soluções inovadoras e eficientes. Minha jornada de aprendizado contínuo agora inclui um foco especial em aprofundar meus conhecimentos em Java, através das certificações oferecidas pela Digital Innovation One. Fluente em português e com certificação de inglês nível C1 (válida até novembro de 2025), estou preparado para colaborar em ambientes dinâmicos e multiculturais.",
        tags: "| Systems Analysis student 🔥 | Rust enthusiast🔥 | passionate about backend programming 🔥"
    },
    {
        nome: "João Pedro",
        link: "https://github.com/joaopedrolour3nc/joaopedrolour3nc",
        desc: "Olá, me chamo João Pedro, tenho 22 anos e sou estudante de Ciências da Computação, com foco em desenvolvimento back-end e DevOps.",
        tags: "| Html 🔥 | CSS 🔥 | Python 🔥 | JavaScript 🔥 | Java 🔥"
    },
    {
        nome: "Oséias Farias",
        link: "https://oseiasdfarias.github.io/",
        desc: "Mestrando em Engenharia Elétrica pela UFABC (bolsista FUNDEP/UFMG), pesquisando Antifragilidade Artificial aplicada a sistemas de controle, e simultaneamente cursando Mestrado em Computação Aplicada (UFPA), com foco na aplicação de aprendizado por reforço no controle de inversores de frequência. Atuo no desenvolvimento de soluções em Python/Java/MATLAB para arquiteturas antifrágeis. Engenheiro Eletricista (UFPA) e Técnico em Eletrotécnica (IFPA), com experiência profissional nas empresas Eletrobrás/Eletronorte, Dow e Piracanjuba.",
        tags: "| Python 🔥 | Matlab 🔥 | Ciência de dados 🔥 | mestrando em engenharia elétrica 🔥"
    },
    {
        nome: "Kamila Carvalho",
        link: "https://sites.google.com/view/kamilacarvalho/",
        desc: "Olá! Sou Kamila Carvalho, apaixonada por transformar dados em insights estratégicos através de visualizações claras e impactantes. Atuo com Looker Studio, Power BI, SQL, Excel e Pentaho para traduzir informações em histórias que apoiam a tomada de decisão.",
        tags: "| SQL 🔥 | Power BI 🔥 | Python 🔥 | Looker Studio 🔥 | Tableau 🔥 | Pentaho 🔥"
    }
];




