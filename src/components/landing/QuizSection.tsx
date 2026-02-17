import { forwardRef } from "react";
import DiagnosticQuiz from "@/components/quiz/DiagnosticQuiz";
import { Clock, Target, BarChart3, Award } from "lucide-react";

const QuizSection = forwardRef<HTMLElement>((_, ref) => {
  const features = [
    { icon: Clock, label: "7 minutes" },
    { icon: Target, label: "15 questions ciblées" },
    { icon: BarChart3, label: "Score sur 60 points" },
    { icon: Award, label: "Analyse personnalisée" },
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: "linear-gradient(135deg, hsl(20 90% 48% / 0.15), hsl(30 100% 60% / 0.1))",
              border: "1px solid hsl(20 90% 48% / 0.3)",
            }}
          >
            <span className="text-sm font-bold text-primary uppercase tracking-wider">
              🧪 DIAGNOSTIC DE SOLIDITÉ STRATÉGIQUE™
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
            Ce que vous allez obtenir
          </h2>

          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Un score précis • Une analyse claire de vos zones de fragilité •
            Une lecture stratégique de votre niveau de maturité •
            Des recommandations adaptées à votre stade de croissance
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
                    background: "linear-gradient(135deg, hsl(20 90% 48% / 0.15), hsl(30 100% 60% / 0.1))",
                  }}
                >
                  <Icon className="h-4 w-4 text-primary" strokeWidth={2} />
                </div>
                <span className="font-medium text-foreground text-sm md:text-base">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz container with premium styling */}
        <div
          className="p-8 md:p-12 rounded-3xl backdrop-blur-sm hover-lift"
          style={{
            background: "linear-gradient(135deg, var(--glass-bg), rgba(255, 255, 255, 0.02))",
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
