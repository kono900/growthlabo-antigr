import { forwardRef } from "react";
import DiagnosticQuiz from "@/components/quiz/DiagnosticQuiz";
import { Clock, Target, BarChart3 } from "lucide-react";

const QuizSection = forwardRef<HTMLElement>((_, ref) => {
  const features = [
    { icon: Clock, label: "5 à 10 minutes" },
    { icon: Target, label: "15 questions ciblées" },
    { icon: BarChart3, label: "Résultat immédiat" },
  ];

  return (
    <section ref={ref} className="py-32 md:py-44 bg-gradient-to-b from-secondary/20 via-secondary/40 to-secondary/20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, hsl(20 90% 48%) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="max-w-3xl mx-auto px-6 space-y-16 relative z-10">
        {/* Header */}
        <div className="text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
            Le diagnostic stratégique
          </h2>
          <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
            Répondez honnêtement à chaque question. Il n'y a pas de bonne ou de mauvaise réponse — seulement votre réalité actuelle.
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            {features.map(({ icon: Icon, label }, idx) => (
              <div
                key={label}
                className="flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-sm hover-scale"
                style={{
                  background: "linear-gradient(135deg, var(--glass-bg), rgba(255, 255, 255, 0.05))",
                  border: "1px solid var(--glass-border)",
                  boxShadow: "0 4px 15px hsl(0 0% 0% / 0.05)",
                }}
              >
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, hsl(20 90% 48% / 0.2), hsl(30 100% 60% / 0.1))",
                  }}
                >
                  <Icon className="h-4 w-4 text-primary" strokeWidth={2} />
                </div>
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz container with premium styling */}
        <div
          className="rounded-3xl p-10 md:p-12 backdrop-blur-sm hover-lift"
          style={{
            background: "linear-gradient(135deg, var(--glass-bg), rgba(255, 255, 255, 0.03))",
            border: "1px solid var(--glass-border)",
            boxShadow: "var(--shadow-premium)",
          }}
        >
          <DiagnosticQuiz />
        </div>
      </div>
    </section>
  );
});

QuizSection.displayName = "QuizSection";

export default QuizSection;
