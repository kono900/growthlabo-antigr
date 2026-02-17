import { getQuizResult } from "./QuizData";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertTriangle, TrendingUp, CheckCircle2, Mail } from "lucide-react";

interface QuizResultProps {
  score: number;
  maxScore: number;
  onRestart: () => void;
}

const QuizResult = ({ score, maxScore, onRestart }: QuizResultProps) => {
  const result = getQuizResult(score);
  const percentage = Math.round((score / maxScore) * 100);

  return (
    <div className="space-y-12 animate-fade-in-up">
      {/* Score Badge */}
      <div className="text-center space-y-6">
        <div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-2xl font-bold"
          style={{
            background: `linear-gradient(135deg, ${result.color}20, ${result.color}10)`,
            border: `2px solid ${result.color}`,
            color: result.color,
          }}
        >
          <span className="text-3xl">{result.emoji}</span>
          <span>{result.levelLabel}</span>
        </div>

        {/* Score Display */}
        <div className="space-y-2">
          <p className="text-6xl md:text-7xl font-bold text-foreground">
            {score}<span className="text-4xl text-muted-foreground">/{maxScore}</span>
          </p>
          <p className="text-xl text-muted-foreground">
            Score de solidité stratégique : <strong className="text-foreground">{percentage}%</strong>
          </p>
        </div>
      </div>

      {/* Interpretation Section */}
      <div
        className="p-8 md:p-10 rounded-3xl space-y-6"
        style={{
          background: "linear-gradient(135deg, var(--glass-bg), rgba(255, 255, 255, 0.02))",
          border: "1px solid var(--glass-border)",
          boxShadow: "var(--shadow-premium)",
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: `${result.color}20`,
            }}
          >
            <span style={{ color: result.color, fontSize: "1.5rem" }}>{result.emoji}</span>
          </div>
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground leading-tight">
              {result.interpretation.title}
            </h3>

            <div className="space-y-2">
              <p className="text-lg text-muted-foreground font-medium">
                Mais votre croissance est freinée par :
              </p>
              <ul className="space-y-2">
                {result.interpretation.description.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base md:text-lg text-foreground">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-lg md:text-xl font-semibold text-foreground pt-4 border-t border-border/30">
              {result.interpretation.currentState}
            </p>
          </div>
        </div>
      </div>

      {/* Risk/Opportunity Section */}
      <div
        className="p-8 md:p-10 rounded-3xl space-y-6"
        style={{
          background: result.level === "structuree"
            ? "linear-gradient(135deg, hsl(142 76% 36% / 0.05), hsl(142 76% 36% / 0.02))"
            : "linear-gradient(135deg, hsl(0 84% 60% / 0.05), hsl(0 84% 60% / 0.02))",
          border: result.level === "structuree"
            ? "1px solid hsl(142 76% 36% / 0.2)"
            : "1px solid hsl(0 84% 60% / 0.2)",
        }}
      >
        <div className="flex items-center gap-3">
          {result.level === "structuree" ? (
            <TrendingUp className="h-6 w-6" style={{ color: result.color }} />
          ) : (
            <AlertTriangle className="h-6 w-6" style={{ color: result.color }} />
          )}
          <h3 className="text-2xl font-serif font-bold" style={{ color: result.color }}>
            {result.risk.title}
          </h3>
        </div>

        <div className="space-y-3">
          {result.level !== "structuree" && (
            <p className="text-lg text-muted-foreground">
              Plus une PME grandit sans architecture claire :
            </p>
          )}
          <ul className="space-y-3">
            {result.risk.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-base md:text-lg text-foreground">
                {result.level === "structuree" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                ) : (
                  <span className="text-destructive mt-1">⚠️</span>
                )}
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendation Section */}
      <div
        className="p-8 md:p-10 rounded-3xl space-y-6 text-center"
        style={{
          background: "linear-gradient(135deg, hsl(20 90% 48% / 0.1), hsl(30 100% 60% / 0.05))",
          border: "2px solid hsl(20 90% 48% / 0.3)",
        }}
      >
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
          {result.recommendation.title}
        </h3>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {result.recommendation.description}
        </p>

        {/* CTA Button */}
        <div className="space-y-4 pt-4">
          <Button
            size="lg"
            className="group relative px-10 py-6 md:px-12 md:py-7 text-base md:text-lg font-bold rounded-2xl overflow-hidden transition-all duration-300 hover-lift"
            style={{
              background: "linear-gradient(135deg, hsl(20 90% 48%), hsl(24 95% 55%))",
              boxShadow: "0 10px 40px hsl(20 90% 48% / 0.3)",
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <Mail className="h-5 w-5" />
              {result.cta.primary}
            </span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, hsl(24 95% 55%), hsl(28 100% 60%))",
              }}
            />
          </Button>
          <p className="text-sm text-muted-foreground italic">
            {result.cta.subtext}
          </p>
        </div>
      </div>

      {/* Bonus Section - Strategic Brand Architecture */}
      <div
        className="p-8 md:p-10 rounded-3xl space-y-6 border-t-4"
        style={{
          background: "linear-gradient(135deg, var(--glass-bg), rgba(255, 255, 255, 0.02))",
          border: "1px solid var(--glass-border)",
          borderTop: "4px solid hsl(20 90% 48%)",
        }}
      >
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-center text-foreground">
          Pourquoi ce diagnostic existe ?
        </h3>

        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Parce que beaucoup de PME cherchent :
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {["Plus de marketing", "Plus de visibilité", "Plus de commerciaux"].map((item, idx) => (
              <div
                key={idx}
                className="px-4 py-3 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, hsl(0 0% 0% / 0.03), transparent)",
                  border: "1px solid hsl(0 0% 0% / 0.1)",
                }}
              >
                <p className="font-medium text-foreground/70">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-lg font-semibold text-foreground pt-4">
            Alors que le problème est souvent <span className="text-primary">structurel</span>.
          </p>
        </div>

        <div
          className="p-6 md:p-8 rounded-2xl space-y-4 text-center"
          style={{
            background: "linear-gradient(135deg, hsl(20 90% 48% / 0.08), hsl(30 100% 60% / 0.04))",
            border: "1px solid hsl(20 90% 48% / 0.2)",
          }}
        >
          <h4 className="text-xl md:text-2xl font-serif font-bold text-foreground">
            C'est précisément ce que traite la méthode :
          </h4>
          <p className="text-2xl md:text-3xl font-bold" style={{ color: "hsl(20 90% 48%)" }}>
            Strategic Brand Architecture™
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Clarifier votre positionnement, restructurer votre architecture d'offre et aligner votre direction en 30 jours — sans rebranding et sans perturber vos opérations.
          </p>
        </div>
      </div>

      {/* Restart Button */}
      <div className="text-center pt-8">
        <Button
          onClick={onRestart}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refaire le diagnostic
        </Button>
      </div>
    </div>
  );
};

export default QuizResult;

