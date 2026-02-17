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
    title: "Clarté du Positionnement",
    subtitle: "Évaluez la clarté et la cohérence de votre positionnement stratégique",
    maxScore: 20,
    interpretation: [
      { range: [16, 20], label: "Positionnement clair et assumé" },
      { range: [10, 15], label: "Clarté partielle, à renforcer" },
      { range: [0, 9], label: "Positionnement flou ou inexistant" },
    ],
    questions: [
      {
        id: 1,
        question: "Votre entreprise peut-elle être décrite clairement en une phrase précise et différenciante ?",
        options: [
          { label: "Non, c'est flou ou long à expliquer", value: 0 },
          { label: "Partiellement, mais ce n'est pas clair pour tous", value: 2 },
          { label: "Oui, mais cela varie selon qui parle", value: 3 },
          { label: "Oui, clair et constant", value: 4 },
        ],
      },
      {
        id: 2,
        question: "Votre client idéal est-il clairement défini (secteur, taille, problème précis) ?",
        options: [
          { label: "Non défini", value: 0 },
          { label: "Très large", value: 1 },
          { label: "Décrit mais pas formalisé", value: 3 },
          { label: "Documenté et assumé", value: 4 },
        ],
      },
      {
        id: 3,
        question: "Savez-vous précisément pourquoi un prospect devrait vous choisir plutôt qu'un concurrent ?",
        options: [
          { label: "Principalement sur le prix", value: 0 },
          { label: "Sur la relation personnelle", value: 2 },
          { label: "Sur quelques éléments différenciants", value: 3 },
          { label: "Sur un positionnement stratégique clair", value: 4 },
        ],
      },
      {
        id: 4,
        question: "Votre promesse centrale est-elle formalisée ?",
        options: [
          { label: "Non", value: 0 },
          { label: "Implicite mais non écrite", value: 2 },
          { label: "Écrite mais peu utilisée", value: 3 },
          { label: "Formulée et utilisée partout", value: 4 },
        ],
      },
      {
        id: 5,
        question: "Votre équipe peut-elle expliquer votre positionnement sans votre intervention ?",
        options: [
          { label: "Non", value: 0 },
          { label: "Rarement", value: 1 },
          { label: "Oui mais avec variations", value: 3 },
          { label: "Oui, de manière cohérente", value: 4 },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Architecture d'Offre",
    subtitle: "Évaluez la structure et la cohérence de votre portefeuille d'offres",
    maxScore: 20,
    interpretation: [
      { range: [16, 20], label: "Architecture d'offre structurée" },
      { range: [10, 15], label: "Structure existante mais fragile" },
      { range: [0, 9], label: "Offre non architecturée" },
    ],
    questions: [
      {
        id: 6,
        question: "Votre offre est-elle structurée en niveaux clairs (entrée / cœur / premium) ?",
        options: [
          { label: "Non", value: 0 },
          { label: "Confus", value: 1 },
          { label: "Structuré mais peu optimisé", value: 3 },
          { label: "Clair et logique", value: 4 },
        ],
      },
      {
        id: 7,
        question: "Vos clients comprennent-ils facilement comment progresser avec vous ?",
        options: [
          { label: "Non", value: 0 },
          { label: "Pas vraiment", value: 1 },
          { label: "Partiellement", value: 3 },
          { label: "Oui, parcours clair", value: 4 },
        ],
      },
      {
        id: 8,
        question: "Refusez-vous certains clients qui ne correspondent pas à votre positionnement ?",
        options: [
          { label: "Rarement", value: 0 },
          { label: "Parfois", value: 2 },
          { label: "Souvent", value: 3 },
          { label: "Systématiquement selon critères définis", value: 4 },
        ],
      },
      {
        id: 9,
        question: "Vos prix sont-ils cohérents avec votre positionnement ?",
        options: [
          { label: "Sous-valorisés", value: 0 },
          { label: "Instables", value: 1 },
          { label: "Globalement cohérents", value: 3 },
          { label: "Alignés et assumés", value: 4 },
        ],
      },
      {
        id: 10,
        question: "Votre offre principale génère-t-elle l'essentiel de votre chiffre d'affaires ?",
        options: [
          { label: "Non", value: 0 },
          { label: "Répartition confuse", value: 2 },
          { label: "Oui partiellement", value: 3 },
          { label: "Oui clairement structurée", value: 4 },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Alignement & Structure Interne",
    subtitle: "Évaluez la solidité de votre organisation et de votre alignement stratégique",
    maxScore: 20,
    interpretation: [
      { range: [16, 20], label: "Organisation alignée et structurée" },
      { range: [10, 15], label: "Alignement partiel, à consolider" },
      { range: [0, 9], label: "Structure interne fragile" },
    ],
    questions: [
      {
        id: 11,
        question: "Votre équipe commerciale tient-elle un discours homogène ?",
        options: [
          { label: "Non", value: 0 },
          { label: "Parfois", value: 2 },
          { label: "Globalement", value: 3 },
          { label: "Totalement aligné", value: 4 },
        ],
      },
      {
        id: 12,
        question: "Vos décisions stratégiques suivent-elles un cadre clair ?",
        options: [
          { label: "Non", value: 0 },
          { label: "Dépend du moment", value: 1 },
          { label: "Oui mais informel", value: 3 },
          { label: "Oui, cadre défini", value: 4 },
        ],
      },
      {
        id: 13,
        question: "Votre marketing reflète-t-il fidèlement votre positionnement ?",
        options: [
          { label: "Non", value: 0 },
          { label: "Partiellement", value: 2 },
          { label: "Majoritairement", value: 3 },
          { label: "Totalement cohérent", value: 4 },
        ],
      },
      {
        id: 14,
        question: "Votre croissance repose-t-elle encore trop sur votre implication personnelle ?",
        options: [
          { label: "Totalement", value: 0 },
          { label: "Majoritairement", value: 1 },
          { label: "Partiellement", value: 3 },
          { label: "Non, structure solide", value: 4 },
        ],
      },
      {
        id: 15,
        question: "Avez-vous une vision claire des 12 prochains mois ?",
        options: [
          { label: "Non", value: 0 },
          { label: "Intuitive", value: 2 },
          { label: "Écrite mais peu partagée", value: 3 },
          { label: "Partagée et alignée", value: 4 },
        ],
      },
    ],
  },
];

export const allQuestions = quizParts.flatMap((part) => part.questions);
export const totalMaxScore = quizParts.reduce((sum, part) => sum + part.maxScore, 0);

export interface QuizResult {
  score: number;
  level: "fragile" | "instable" | "structuree";
  levelLabel: string;
  color: string;
  emoji: string;
  interpretation: {
    title: string;
    description: string[];
    currentState: string;
  };
  risk: {
    title: string;
    points: string[];
  };
  recommendation: {
    title: string;
    description: string;
  };
  cta: {
    primary: string;
    subtext: string;
  };
}

// Nouvelle grille d'interprétation (0-25, 26-45, 46-60)
export function getQuizResult(totalScore: number): QuizResult {
  if (totalScore <= 25) {
    // 🔴 Architecture Fragile
    return {
      score: totalScore,
      level: "fragile",
      levelLabel: "Architecture Fragile",
      color: "hsl(0 84% 60%)", // Rouge
      emoji: "🔴",
      interpretation: {
        title: "Votre croissance repose principalement sur votre énergie personnelle plutôt que sur une structure claire.",
        description: [
          "Votre positionnement manque de précision.",
          "Votre architecture d'offre est probablement confuse.",
          "Votre équipe n'est pas totalement alignée.",
        ],
        currentState: "Aujourd'hui, vous avancez. Mais cette base n'est pas durable.",
      },
      risk: {
        title: "Risque stratégique",
        points: [
          "Votre marge risque de se dégrader",
          "Vos équipes risquent de s'épuiser",
          "Votre croissance deviendra instable",
          "Vous aurez du mal à passer au prochain cap",
        ],
      },
      recommendation: {
        title: "Recommandation",
        description: "Vous avez besoin d'une clarification stratégique complète avant de chercher plus de croissance.",
      },
      cta: {
        primary: "Réserver un entretien stratégique prioritaire",
        subtext: "Nous analysons ensemble si votre situation nécessite une Strategic Brand Architecture™ complète.",
      },
    };
  } else if (totalScore <= 45) {
    // 🟠 Architecture Instable
    return {
      score: totalScore,
      level: "instable",
      levelLabel: "Architecture Instable",
      color: "hsl(38 92% 50%)", // Orange
      emoji: "🟠",
      interpretation: {
        title: "Votre entreprise possède des bases solides.",
        description: [
          "Une offre insuffisamment hiérarchisée",
          "Un message pas totalement unifié",
          "Un alignement interne partiel",
        ],
        currentState: "Vous êtes à un point charnière. Soit vous structurez maintenant, soit la complexité va augmenter.",
      },
      risk: {
        title: "Risque stratégique",
        points: [
          "Plus la confusion devient coûteuse",
          "Plus les décisions deviennent incohérentes",
          "Plus votre différenciation s'affaiblit",
        ],
      },
      recommendation: {
        title: "Recommandation",
        description: "Vous avez besoin d'optimiser votre architecture avant que la complexité ne vous dépasse.",
      },
      cta: {
        primary: "Planifier un diagnostic stratégique confidentiel",
        subtext: "Vérifions ensemble les leviers prioritaires à activer dans les 90 prochains jours.",
      },
    };
  } else {
    // 🟢 Architecture Structurée (Mais Perfectible)
    return {
      score: totalScore,
      level: "structuree",
      levelLabel: "Architecture Structurée (Mais Perfectible)",
      color: "hsl(142 76% 36%)", // Vert
      emoji: "🟢",
      interpretation: {
        title: "Vous avez déjà une base solide.",
        description: [
          "Votre positionnement est relativement clair.",
          "Votre offre est organisée.",
          "Votre équipe semble alignée.",
        ],
        currentState: "Mais… Même les entreprises structurées ont des zones d'optimisation invisibles. Et dans un environnement concurrentiel, la finesse stratégique fait la différence.",
      },
      risk: {
        title: "Opportunité",
        points: [
          "Vous pouvez renforcer votre différenciation",
          "Optimiser votre montée en valeur",
          "Solidifier votre leadership stratégique",
        ],
      },
      recommendation: {
        title: "Avec quelques ajustements ciblés",
        description: "Identifions les optimisations à fort impact pour consolider votre avantage.",
      },
      cta: {
        primary: "Demander une revue stratégique avancée",
        subtext: "Identifions les optimisations à fort impact pour consolider votre avantage.",
      },
    };
  }
}
