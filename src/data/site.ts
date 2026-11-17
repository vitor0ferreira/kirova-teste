// Explicit assumptions (per DESIGN.md):
// 1. The 3 field case studies below (placeholder: true) model realistic Brazilian B2B deployments
//    reflecting the three ICP profiles and the 2023 agro-industrial cooperative milestone in the Kairova dossier.
// 2. The Hero transformer simulator and footer viability calculator run client-side without an external CRM API.

export type HardwareItem = {
  id: string;
  code: string;
  name: string;
  category: string;
  power: string;
  protection: string;
  connectivity: string;
  summary: string;
  specs: { label: string; value: string }[];
};

export type SoftwareModule = {
  id: string;
  name: string;
  badge: string;
  summary: string;
  capabilities: string[];
};

export type ServiceItem = {
  code: string;
  name: string;
  sla: string;
  summary: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  sector: string;
  state: string;
  utility: string;
  year: number;
  powerInstalled: string;
  scope: string[];
  summary: string;
  cover: {
    src: string;
    alt: string;
    seed: number;
  };
  metrics: { label: string; value: string }[];
  sections: { heading: string; text: string }[];
  placeholder?: boolean;
};

export const site = {
  name: 'Kairova',
  legalName: 'Kairova Engenharia & Mobilidade Sustentável S.A.',
  tagline: 'Energia no tempo certo. Movimento sem pausas.',
  url: 'https://www.kairova.com.br',
  description:
    'Infraestrutura nacional de recarga elétrica inteligente, balanceamento dinâmico GridGuard e software de gestão energética para frotas corporativas e galpões logísticos.',
  location: {
    address: 'Av. Dr. Guilherme Ferreira, 1840, Sala 402, Edifício Corporate Tech',
    city: 'Uberaba, MG',
    cep: 'CEP 38022-200',
    region: 'Triângulo Mineiro, Brasil',
  },
  contact: {
    phone: '+55 (34) 3318-9400',
    phoneHref: 'tel:+553433189400',
    whatsapp: '+55 (34) 99842-7100',
    whatsappHref: 'https://wa.me/5534998427100',
    email: 'contato@kairova.com.br',
  },
  founded: 2021,
  employees: 145,
  revenueProjection2026: 'R$ 48 milhões',
  statesCount: 9,
  managedPoints: '1.800+',
  glPalette: ['#0F2922', '#2C3539', '#32E875'] as [string, string, string],
  nav: [
    { label: 'Hardware', href: '/#hardware' },
    { label: 'Software', href: '/#software' },
    { label: 'Casos', href: '/#casos' },
    { label: 'Sobre', href: '/sobre/' },
  ],
};

export const heroData = {
  eyebrow: 'ENGENHARIA NACIONAL · HaaS & SaaS · UBERABA, MG',
  headline: 'Energia no tempo certo. Movimento sem pausas.',
  lead: 'Projetamos carregadores industriais tropicalizados, balanceadores físicos de carga e telemetria cloud para frotas corporativas e condomínios logísticos em 9 estados brasileiros.',
  ctaPrimary: 'Solicitar estudo de viabilidade',
  ctaSecondary: 'Simular barramento GridGuard',
  image: {
    src: '/images/hero-patio-uberaba.jpg',
    alt: 'Pátio logístico ao amanhecer em Uberaba com vans elétricas conectadas a estações Kairova FastHub 120 kW e engenheiro eletricista verificando telemetria em tablet',
  },
  presets: [
    {
      id: 'pico',
      label: 'Turno industrial (85%)',
      plantKw: 390,
      note: 'GridGuard limita o despacho da frota para blindar o transformador de 500 kVA.',
    },
    {
      id: 'medio',
      label: 'Troca de turno (55%)',
      plantKw: 255,
      note: 'Carga compartilhada entre FastHub DC 120 kW e baias AC sem ultrapassar a demanda.',
    },
    {
      id: 'fora-ponta',
      label: 'Janela fora de ponta (20%)',
      plantKw: 115,
      note: 'Potência máxima liberada no horário de tarifa reduzida pelo Kairova OS.',
    },
  ],
};

export const keyStats = [
  { value: '1.800+', label: 'Pontos de recarga inteligentes sob gestão ativa em 2026' },
  { value: '9 estados', label: 'Operação direta com equipes certificadas em campo' },
  { value: '6 horas', label: 'SLA de atendimento presencial apoiado pelo NOC 24/7' },
  { value: '145', label: 'Colaboradores diretos em engenharia, software e operações' },
  { value: 'R$ 48 mi', label: 'Faturamento anual projetado para o exercício de 2026' },
];

export const hardwareLineup: HardwareItem[] = [
  {
    id: 'wallbox-pro',
    code: 'HW-01 · AC TRIFÁSICO',
    name: 'Kairova Wallbox Pro 22kW',
    category: 'Recarga de pátio e pernoite',
    power: '22 kW AC',
    protection: 'IP66 · IK10',
    connectivity: '4G / Wi-Fi / RFID',
    summary:
      'Chassi em aço galvanizado preparado para poeira, chuva torrencial e variações de tensão da rede elétrica brasileira. Integra leitor RFID para controle individual de motoristas e dispensa botões físicos suscetíveis a vandalismo.',
    specs: [
      { label: 'Grau de proteção', value: 'IP66 (poeira e jatos) · IK10 (impacto)' },
      { label: 'Comunicação', value: 'OCPP 2.0.1 nativo via 4G LTE e Wi-Fi' },
      { label: 'Acabamento', value: 'Pintura eletrostática microtexturizada Verde Grafite Profundo' },
    ],
  },
  {
    id: 'fasthub-120',
    code: 'HW-02 · DC ULTRARRÁPIDO',
    name: 'Kairova FastHub 120kW',
    category: 'Centros de distribuição e paradas rodoviárias',
    power: '120 kW DC · 2x CCS2',
    protection: 'IP65 · Aço Galvanizado',
    connectivity: 'OCPP 2.0.1 / Ethernet / 4G',
    summary:
      'Estação de recarga ultrarrápida com duas saídas CCS2 simultâneas para turnaround acelerado de vans e caminhões leves. Traz barra de LED frontal de alta visibilidade legível a 50 metros sob sol direto.',
    specs: [
      { label: 'Saídas simultâneas', value: '2 conectores CCS2 com divisão dinâmica' },
      { label: 'Sinalização visual', value: 'Barra LED cinética visível a 50 m' },
      { label: 'Modelo comercial', value: 'Disponível em HaaS ou aquisição direta' },
    ],
  },
  {
    id: 'gridguard',
    code: 'HW-03 · DLM FÍSICO',
    name: 'Kairova GridGuard',
    category: 'Balanceamento dinâmico de carga',
    power: 'Até 2.500 A por barramento',
    protection: 'Quadro industrial · TCs',
    connectivity: 'Modbus / Ethernet / Cloud',
    summary:
      'Controlador físico instalado no quadro principal do cliente para medir o consumo instantâneo da fábrica ou do galpão e modular a potência enviada aos carregadores, evitando sobrecarga nos transformadores.',
    specs: [
      { label: 'Função crítica', value: 'Dynamic Load Management (DLM) em tempo real' },
      { label: 'Economia de Capex', value: 'Evita troca imediata de subestação e multas' },
      { label: 'Auditoria elétrica', value: 'Fator de potência e corrente por fase' },
    ],
  },
];

export const softwareModules: SoftwareModule[] = [
  {
    id: 'kairova-os',
    name: 'Kairova OS (Plataforma Cloud)',
    badge: 'SaaS · TELEMETRIA & ESG',
    summary:
      'Dashboard web e aplicativo móvel que centralizam consumo elétrico, custos e disponibilidade da frota em tempo real, com números exibidos em escala auditável por estação.',
    capabilities: [
      'Rateio automático de custos em reais e kWh por centro de custo e veículo',
      'Agendamento programado de recargas em horários fora de ponta (Tarifa Branca e Verde)',
      'Relatórios auditáveis de pegada de carbono evitada para metas corporativas ESG',
      'Alertas preventivos em Âmbar Industrial para oscilação de tensão e temperatura',
    ],
  },
  {
    id: 'kairova-pay',
    name: 'Kairova Pay & Roaming',
    badge: 'MONETIZAÇÃO B2B',
    summary:
      'Módulo de cobrança direta por kWh consumido para condomínios logísticos, centros empresariais e shoppings que atendem frotas terceirizadas.',
    capabilities: [
      'Liquidação imediata via Pix, cartão corporativo ou tags veiculares de pedágio',
      'Precificação flexível por faixa horária, locatário ou grupo de motoristas',
      'Conciliação financeira automática vinculada ao medidor interno do carregador',
    ],
  },
];

export const specializedServices: ServiceItem[] = [
  {
    code: 'SRV-01',
    name: 'Engenharia Consultiva e Laudos de Viabilidade',
    sla: 'CEMIG · CPFL · Enel',
    summary:
      'Levantamento de demanda contratada junto às concessionárias regionais e elaboração do projeto executivo elétrico antes da compra de qualquer equipamento.',
  },
  {
    code: 'SRV-02',
    name: 'Instalação Turnkey e Comissionamento',
    sla: 'Certificação NR-10 e NR-35',
    summary:
      'Execução integral de obras civis, eletrodutos, quadros de proteção e testes de carga em pátio com equipe técnica própria e entrega documentada.',
  },
  {
    code: 'SRV-03',
    name: 'NOC 24/7 (Network Operations Center)',
    sla: 'SLA presencial de até 6 h',
    summary:
      'Monitoramento remoto contínuo a partir de Uberaba para rearmar alertas antes da saída da frota e despachar técnicos em até 6 horas nas regiões atendidas.',
  },
];

export const icpProfiles = [
  {
    title: 'Diretores de Logística e Gestores de Frota',
    detail: 'Operações urbanas, e-commerce, alimentos e bebidas que rodam com vans e caminhões leves elétricos e precisam de turno sem atrasos.',
  },
  {
    title: 'Gerentes de Facilities e Sustentabilidade (ESG)',
    detail: 'Indústrias, usinas sucroenergéticas e centros corporativos com metas formais de descarbonização e prestação de contas em conselho.',
  },
  {
    title: 'Incorporadoras e Condomínios Logísticos',
    detail: 'Galpões classe A que buscam certificação LEED, atratividade tecnológica para locatários e rateio claro de energia por doca.',
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: 'cooperativa-agroindustrial-triangulo',
    title: 'Cooperativa Triângulo Verde',
    client: 'Cooperativa Agroindustrial (Modelo Referencial)',
    sector: 'Agronegócio e Sucroenergético',
    state: 'MG',
    utility: 'CEMIG',
    year: 2023,
    powerInstalled: '480 kW',
    scope: ['GridGuard DLM', '4x FastHub 120kW', 'Kairova OS', 'Turnkey'],
    summary:
      'Cenário referencial baseado no marco de 2023 com cooperativa agroindustrial no Triângulo Mineiro: quatro estações DC integradas ao transformador de 500 kVA dos silos sem ampliação de demanda contratada.',
    cover: {
      src: '/images/case-cooperativa-agro.jpg',
      alt: 'Entardecer em pátio agroindustrial no Triângulo Mineiro com caminhões elétricos em estações Kairova FastHub ao lado de silos e subestação de 500 kVA',
      seed: 1.4,
    },
    metrics: [
      { label: 'Potência instalada', value: '480 kW (4x FastHub 120kW)' },
      { label: 'Transformador existente', value: '500 kVA preservado via DLM' },
      { label: 'Disponibilidade medida', value: '99,94% em 24 meses' },
      { label: 'Janela principal', value: '21h30 às 05h30 (Tarifa Verde)' },
    ],
    sections: [
      {
        heading: 'Gargalo elétrico no pátio de grãos',
        text: 'A cooperativa iniciou a transição para caminhões elétricos de apoio interno e transporte regional, mas a subestação existente operava próxima do limite durante o beneficiamento diurno de grãos. Orçamentos tradicionais exigiam troca de transformador e nove meses de espera junto à distribuidora.',
      },
      {
        heading: 'Arquitetura com GridGuard e despacho noturno',
        text: 'A equipe da Kairova instalou o controlador GridGuard no quadro geral e quatro estações FastHub 120kW com proteção IP65 contra poeira mineral. Durante picos da moagem, o barramento reduz automaticamente a corrente das baias e libera potência plena assim que a planta industrial entra na madrugada.',
      },
      {
        heading: 'Resultado operacional',
        text: 'A frota entrou em rota regular em seis semanas de obra turnkey, eliminando custos de adequação de média tensão e registrando cada kWh por placa no Kairova OS.',
      },
    ],
    placeholder: true,
  },
  {
    slug: 'distribuicao-urbana-sp-mg',
    title: 'Malha Urbana Sudeste',
    client: 'Operador de Logística Urbana (Modelo Referencial)',
    sector: 'E-commerce e Alimentos e Bebidas',
    state: 'SP / MG',
    utility: 'CPFL / Enel',
    year: 2025,
    powerInstalled: '720 kW',
    scope: ['24x Wallbox Pro 22kW', '2x FastHub 120kW', 'NOC 24/7'],
    summary:
      'Eletrificação de três bases de última milha com 24 carregadores AC protegidos contra chuva e duas estações rápidas para janelas de almoço.',
    cover: {
      src: '/images/hero-patio-uberaba.jpg',
      alt: 'Vans elétricas de entrega urbana acopladas a estações Kairova em centro de distribuição logístico',
      seed: 2.8,
    },
    metrics: [
      { label: 'Pontos instalados', value: '26 conectores em 3 pátios' },
      { label: 'Identificação de frota', value: 'RFID vinculado ao motorista' },
      { label: 'SLA contratado', value: 'Atendimento local em até 6 h' },
      { label: 'Redução de demanda de ponta', value: '34% via agendamento Kairova OS' },
    ],
    sections: [
      {
        heading: 'Turnaround curto entre rotas urbanas',
        text: 'Operadores de entregas urbanas precisam das vans carregadas às cinco da manhã e de recargas rápidas de reforço no intervalo do meio-dia. Quedas de rede noturnas sem diagnóstico impediam a saída matinal da operação.',
      },
      {
        heading: 'Monitoramento proativo e controle RFID',
        text: 'Com Wallbox Pro 22kW conectados via 4G e leitor RFID nativo, o Kairova OS passou a associar cada sessão ao centro de custo da rota e alertar o NOC 24/7 em Uberaba diante de qualquer oscilação de fase.',
      },
      {
        heading: 'Resultado operacional',
        text: 'O modelo HaaS preservou o caixa para expansão de veículos enquanto o rateio financeiro por centro de custo substituiu planilhas manuais de abastecimento.',
      },
    ],
    placeholder: true,
  },
  {
    slug: 'condominio-logistico-leed',
    title: 'Parque Logístico Bandeirantes',
    client: 'Administradora de Galpões Classe A (Modelo Referencial)',
    sector: 'Condomínios Logísticos (LEED)',
    state: 'SP',
    utility: 'CPFL Paulista',
    year: 2026,
    powerInstalled: '360 kW',
    scope: ['Kairova Pay & Roaming', '3x FastHub 120kW', 'Laudo CEMIG/CPFL'],
    summary:
      'Infraestrutura compartilhada multiusuário com cobrança automatizada via Pix e tags veiculares para locatários e caminhões visitantes.',
    cover: {
      src: '/images/hardware-lineup.jpg',
      alt: 'Linha completa de carregadores Kairova Wallbox Pro, FastHub 120 kW e controlador GridGuard em instalação industrial',
      seed: 4.1,
    },
    metrics: [
      { label: 'Estações compartilhadas', value: '3x FastHub 120kW (6 bicos CCS2)' },
      { label: 'Meios de pagamento', value: 'Pix, cartão e tag veicular' },
      { label: 'Certificação apoiada', value: 'Pontuação LEED Mobilidade' },
      { label: 'Medição individualizada', value: 'Centros de custo por galpão' },
    ],
    sections: [
      {
        heading: 'Energia compartilhada entre diferentes locatários',
        text: 'Condomínios logísticos enfrentam resistência para instalar carregadores nas áreas comuns porque a conta de energia recai sobre o rateio condominial. O empreendimento precisava separar o consumo por transportadora visitante e gerar receita transparente.',
      },
      {
        heading: 'Monetização direta com Kairova Pay',
        text: 'A Kairova entregou projeto executivo, obra civil em concreto e três estações FastHub integradas ao Kairova Pay & Roaming, permitindo que motoristas autorizados iniciem a recarga pelo celular ou tag do veículo.',
      },
      {
        heading: 'Resultado operacional',
        text: 'O condomínio passou a oferecer infraestrutura de recarga pesada como diferencial comercial para novos contratos de locação com exigência ambiental.',
      },
    ],
    placeholder: true,
  },
];

export const companyStory = {
  intro:
    'Três engenheiros formados no ecossistema tecnológico do Triângulo Mineiro (Henrique Bastos em Engenharia Elétrica, Camila Nogueira em Software e IoT, e Rafael Telles em Cadeias Logísticas) fundaram a Kairova em 2021 em Uberaba, Minas Gerais.',
  origin:
    'A criação da empresa partiu de um obstáculo prático observado no agronegócio e no transporte rodoviário brasileiro: companhias decididas a eletrificar vans e caminhões médios esbarravam na instabilidade das redes elétricas locais e na falta de softwares nacionais ligando o hardware de potência ao controle financeiro em tempo real.',
  etymology:
    'O nome Kairova une o conceito grego Kairós (o momento certo) ao sufixo de movimento contínuo. Do galpão de prototipagem em Uberaba, onde produzimos os primeiros balanceadores para subestações industriais, fechamos nosso primeiro grande contrato com uma cooperativa agroindustrial em 2023 e alcançamos 9 estados e mais de 1.800 pontos inteligentes em 2026.',
  uvp:
    'Enquanto carregadores importados genéricos deixam a operação descoberta no pós-venda e multinacionais trabalham com contratos em dólar e prazos rígidos, a Kairova entrega engenharia nacional com software próprio e equipe presencial no Brasil. Isso torna o retorno financeiro da eletrificação mensurável e auditável.',
  founders: [
    {
      name: 'Henrique Bastos',
      role: 'Engenharia Elétrica e Hardware de Potência',
      bio: 'Liderou o projeto dos primeiros balanceadores físicos de carga para subestações industriais no galpão de Uberaba em 2021 e define a arquitetura IP66/IK10 da linha proprietária.',
    },
    {
      name: 'Camila Nogueira',
      role: 'Engenharia de Software, IoT e Kairova OS',
      bio: 'Arquiteta da plataforma cloud Kairova OS, do módulo de cobrança Kairova Pay e da pilha nacional OCPP 2.0.1 embarcada em campo com conectividade redundante 4G e Wi-Fi.',
    },
    {
      name: 'Rafael Telles',
      role: 'Gestão de Cadeias Logísticas e Operações',
      bio: 'Estrutura os contratos HaaS e turnkey junto a frotas corporativas e coordena as equipes certificadas NR-10/NR-35 responsáveis pelo SLA presencial de 6 horas em 9 estados.',
    },
  ],
  purpose: 'Acelerar a autonomia energética da infraestrutura produtiva brasileira.',
  mission:
    'Projetar e operar soluções inteligentes de recarga elétrica que tornem a mobilidade sustentável mais econômica, segura e confiável do que os combustíveis fósseis.',
  vision2030:
    'Ser a principal inteligência por trás da gestão energética de frotas pesadas e centros logísticos da América Latina.',
  pillars: [
    {
      index: '01',
      title: 'Engenharia com Pé no Chão',
      text: 'Uma solução elétrica só entra em produção depois de operar sob sol de 40 graus, chuva torrencial e variações reais de tensão da rede brasileira. Testamos no limite físico antes de assumir prazos em contrato.',
    },
    {
      index: '02',
      title: 'Transparência em Tempo Real',
      text: 'Da mesma forma que o Kairova OS registra cada watt consumido nas estações, nossa relação com equipes internas e clientes apoia-se em dados abertos de medição, custos e disponibilidade.',
    },
    {
      index: '03',
      title: 'Obsessão pelo Uptime',
      text: 'Um carregador parado atrasa a janela de entrega do cliente. Do desenvolvedor de back-end em Uberaba ao técnico de campo certificado em NR-10, toda a empresa responde pela disponibilidade contínua da rede.',
    },
    {
      index: '04',
      title: 'Protagonismo Colaborativo',
      text: 'Engenheiros eletricistas, desenvolvedores de software e equipe comercial trabalham juntos sobre os mesmos protótipos para eliminar ruídos entre a bancada de potência e a plataforma em nuvem.',
    },
  ],
  rituals: [
    {
      name: 'Modelo Híbrido Inteligente',
      detail:
        'Software, Design e Produto atuam em regime híbrido com dois dias presenciais em Uberaba para alinhamento de arquitetura e sprints. Hardware, P&D e Operações de Campo atuam presencialmente no laboratório e nos hubs regionais.',
    },
    {
      name: 'Kairova Lab Day (sextas-feiras quinzenais)',
      detail:
        'Bloco protegido de quatro horas para equipes multidisciplinares testarem protótipos em bancada, refatorarem sistemas legados e proporem melhorias nos procedimentos de instalação em pátio.',
    },
    {
      name: 'Post-Mortem Sem Culpa (Blameless Culture)',
      detail:
        'Qualquer ocorrência em campo ou interrupção de servidor gera uma análise técnica coletiva focada na causa raiz do código, do processo elétrico ou da instalação, preservando a transparência da equipe.',
    },
    {
      name: 'Plano de Carreira em Y',
      detail:
        'Engenheiros e desenvolvedores podem evoluir até os níveis de Principal Engineer ou Staff Architect com remuneração equivalente à de diretores executivos, mantendo foco exclusivamente técnico se preferirem.',
    },
  ],
  labImage: {
    src: '/images/engenharia-campo-noc.jpg',
    alt: 'Engenheiro eletricista testando placa de potência no laboratório da Kairova em Uberaba com o NOC 24/7 exibindo gráficos de carga ao fundo',
  },
};
