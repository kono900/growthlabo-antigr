export interface QuizOption {
  label: string;
  value: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface QuizPart {
  id: number;
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
  maxScore: number;
  interpretation: { range: [number, number]; label: string }[];
}

export const quizParts: QuizPart[] = [
  {
    id: 1,
    title: "Clarté stratégique",
    subtitle: "Pour chaque affirmation, sélectionnez la réponse qui reflète le mieux votre situation actuelle.",
    maxScore: 20,
    interpretation: [
      { range: [16, 20], label: "Clarté stratégique solide" },
      { range: [10, 15], label: "Clarté partielle, améliorable" },
      { range: [0, 9], label: "Manque structurel de clarté stratégique" },
    ],
    questions: [
      {
        id: 1,
        question: "Si on vous demande ce qui vous différencie réellement de vos concurrents, pouvez-vous répondre en moins de 30 secondes… sans hésiter ?",
        options: [
          { label: "Non, c'est flou", value: 0 },
          { label: "Réponse longue et imprécise", value: 1 },
          { label: "Différence partielle mais peu marquée", value: 2 },
          { label: "Positionnement clair", value: 3 },
          { label: "Différenciation forte, assumée et formalisée", value: 4 },
        ],
      },
      {
        id: 2,
        question: "Votre entreprise pourrait-elle être confondue avec d'autres acteurs de votre marché ?",
        options: [
          { label: "Oui, totalement", value: 0 },
          { label: "Probablement", value: 1 },
          { label: "Partiellement", value: 2 },
          { label: "Peu probable", value: 3 },
          { label: "Impossible, notre positionnement est distinct", value: 4 },
        ],
      },
      {
        id: 3,
        question: "Votre cible idéale est-elle précisément définie… ou adaptez-vous votre discours selon l'opportunité ?",
        options: [
          { label: "Nous parlons à tout le monde", value: 0 },
          { label: "Cible large et opportuniste", value: 1 },
          { label: "Segment identifié mais flexible", value: 2 },
          { label: "Cible claire et priorisée", value: 3 },
          { label: "Profil client idéal stratégique, documenté et partagé", value: 4 },
        ],
      },
      {
        id: 4,
        question: "Vos décisions stratégiques sont-elles guidées par une vision claire… ou par des opportunités à court terme ?",
        options: [
          { label: "Principalement opportunistes", value: 0 },
          { label: "Souvent réactives", value: 1 },
          { label: "Mélange des deux", value: 2 },
          { label: "Majoritairement alignées sur une vision", value: 3 },
          { label: "Strictement guidées par une stratégie définie", value: 4 },
        ],
      },
      {
        id: 5,
        question: "Si vous deviez déléguer demain, votre stratégie serait-elle compréhensible sans vous ?",
        options: [
          { label: "Impossible", value: 0 },
          { label: "Très difficile", value: 1 },
          { label: "Partiellement", value: 2 },
          { label: "Globalement oui", value: 3 },
          { label: "Totalement formalisée et transmissible", value: 4 },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Architecture d'offre",
    subtitle: "Pour chaque affirmation, sélectionnez la réponse qui reflète le mieux votre situation actuelle.",
    maxScore: 20,
    interpretation: [
      { range: [16, 20], label: "Architecture d'offre structurée" },
      { range: [10, 15], label: "Structure existante mais fragile" },
      { range: [0, 9], label: "Offre non architecturée" },
    ],
    questions: [
      {
        id: 6,
        question: "Vos offres ont-elles été pensées comme un système… ou se sont-elles accumulées avec le temps ?",
        options: [
          { label: "Accumulation sans logique", value: 0 },
          { label: "Ajouts successifs peu structurés", value: 1 },
          { label: "Organisation partielle", value: 2 },
          { label: "Structure claire", value: 3 },
          { label: "Architecture stratégique formalisée", value: 4 },
        ],
      },
      {
        id: 7,
        question: "Chaque offre conduit-elle naturellement vers une autre… ou fonctionne-t-elle isolément ?",
        options: [
          { label: "Offres indépendantes", value: 0 },
          { label: "Peu de cohérence entre elles", value: 1 },
          { label: "Parcours client partiellement structuré", value: 2 },
          { label: "Logique d'évolution claire", value: 3 },
          { label: "Système d'offres pensé pour la montée en valeur", value: 4 },
        ],
      },
      {
        id: 8,
        question: "Votre pricing reflète-t-il votre valeur stratégique… ou votre peur de perdre des clients ?",
        options: [
          { label: "Tarifs défensifs", value: 0 },
          { label: "Ajustements fréquents", value: 1 },
          { label: "Cohérence partielle", value: 2 },
          { label: "Pricing réfléchi", value: 3 },
          { label: "Pricing stratégique assumé", value: 4 },
        ],
      },
      {
        id: 9,
        question: "Vos offres renforcent-elles votre positionnement… ou le diluent-elles ?",
        options: [
          { label: "Dilution évidente", value: 0 },
          { label: "Incohérences fréquentes", value: 1 },
          { label: "Alignement partiel", value: 2 },
          { label: "Cohérence globale", value: 3 },
          { label: "Alignement total et stratégique", value: 4 },
        ],
      },
      {
        id: 10,
        question: "Pouvez-vous expliquer votre architecture d'offre simplement… sans perdre votre interlocuteur ?",
        options: [
          { label: "Explication confuse", value: 0 },
          { label: "Trop complexe", value: 1 },
          { label: "Compréhensible mais lourde", value: 2 },
          { label: "Structure claire", value: 3 },
          { label: "Architecture limpide et stratégique", value: 4 },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Cohérence & Alignement",
    subtitle: "Pour chaque affirmation, sélectionnez la réponse qui reflète le mieux votre situation actuelle.",
    maxScore: 20,
    interpretation: [
      { range: [16, 20], label: "Cohérence et alignement solides" },
      { range: [10, 15], label: "Alignement partiel, axes d'amélioration" },
      { range: [0, 9], label: "Manque de cohérence structurelle" },
    ],
    questions: [
      {
        id: 11,
        question: "Votre communication reflète-t-elle réellement votre positionnement stratégique ?",
        options: [
          { label: "Messages contradictoires", value: 0 },
          { label: "Incohérences visibles", value: 1 },
          { label: "Cohérence partielle", value: 2 },
          { label: "Message globalement aligné", value: 3 },
          { label: "Communication parfaitement alignée", value: 4 },
        ],
      },
      {
        id: 12,
        question: "Votre équipe peut-elle expliquer clairement votre offre sans vous ?",
        options: [
          { label: "Non", value: 0 },
          { label: "Difficilement", value: 1 },
          { label: "Partiellement", value: 2 },
          { label: "Oui, globalement", value: 3 },
          { label: "Oui, avec cohérence stratégique", value: 4 },
        ],
      },
      {
        id: 13,
        question: "Votre marketing est-il structuré… ou réactif aux tendances ?",
        options: [
          { label: "Principalement réactif", value: 0 },
          { label: "Souvent opportuniste", value: 1 },
          { label: "Mi-structuré", value: 2 },
          { label: "Planifié", value: 3 },
          { label: "Totalement guidé par une stratégie claire", value: 4 },
        ],
      },
      {
        id: 14,
        question: "Si votre volume de clients doublait demain, votre organisation tiendrait-elle ?",
        options: [
          { label: "Probablement pas", value: 0 },
          { label: "Risque élevé", value: 1 },
          { label: "Incertain", value: 2 },
          { label: "Structure relativement stable", value: 3 },
          { label: "Système scalable et structuré", value: 4 },
        ],
      },
      {
        id: 15,
        question: "Votre croissance dépend-elle encore principalement de vous ?",
        options: [
          { label: "Totalement", value: 0 },
          { label: "Majoritairement", value: 1 },
          { label: "Partiellement", value: 2 },
          { label: "Faiblement", value: 3 },
          { label: "Système structuré et autonome", value: 4 },
        ],
      },
    ],
  },
];

// Flatten all questions for easy access
export const allQuestions = quizParts.flatMap((part) => part.questions);
export const totalMaxScore = quizParts.reduce((sum, p) => sum + p.maxScore, 0);

export interface QuizResult {
  range: [number, number];
  title: string;
  emoji: string;
  description: string;
  recommendation: string;
}

export const quizResults: QuizResult[] = [
  {
    range: [0, 14],
    title: "Zone rouge – Urgence structurelle",
    emoji: "🔴",
    description:
      "Votre entreprise repose sur votre énergie personnelle. La structure est fragile et la croissance amplifie les problèmes au lieu de les résoudre.",
    recommendation:
      "Un accompagnement stratégique est indispensable avant d'investir davantage en marketing ou en recrutement.",
  },
  {
    range: [15, 29],
    title: "Zone orange – Fragilités visibles",
    emoji: "🟠",
    description:
      "Des fondations existent, mais plusieurs piliers manquent de solidité. Vous compensez par l'effort personnel ce que la structure ne porte pas encore.",
    recommendation:
      "Il est temps de clarifier votre positionnement et de structurer vos offres pour débloquer le prochain palier de croissance.",
  },
  {
    range: [30, 44],
    title: "Zone jaune – En progression",
    emoji: "🟡",
    description:
      "Votre entreprise a de bonnes bases. Quelques ajustements stratégiques peuvent libérer un potentiel de croissance significatif.",
    recommendation:
      "Concentrez-vous sur l'alignement de votre communication et la délégation stratégique pour accélérer.",
  },
  {
    range: [45, 60],
    title: "Zone verte – Prêt à scaler",
    emoji: "🟢",
    description:
      "Félicitations ! Votre entreprise est bien structurée. Vous avez les fondations nécessaires pour une croissance ambitieuse et durable.",
    recommendation:
      "Optimisez vos systèmes existants et explorez de nouveaux leviers de croissance avec confiance.",
  },
];
