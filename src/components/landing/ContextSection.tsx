import { Compass, Puzzle, MessageCircle, UserCog } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ContextSection = () => {
  const painPoints = [
    { icon: Compass, text: "Votre positionnement devient difficile à expliquer" },
    { icon: Puzzle, text: "Vos offres se multiplient sans réelle architecture" },
    { icon: MessageCircle, text: "Votre communication manque de cohérence" },
    { icon: UserCog, text: "Les décisions reposent encore trop sur vous" },
  ];

  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleCards((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-32 md:py-44 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(20 90% 48% / 0.3), transparent)"
        }}
      />

      <div className="max-w-4xl mx-auto px-6 space-y-20">
        {/* Header section with enhanced typography */}
        <div className="space-y-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
            Votre entreprise fonctionne.
          </h2>
          <div className="space-y-3 text-xl md:text-2xl text-muted-foreground">
            <p className="animate-fade-in-up opacity-0 [animation-delay:100ms]">Le chiffre d'affaires progresse.</p>
            <p className="animate-fade-in-up opacity-0 [animation-delay:200ms]">Les clients sont là.</p>
            <p className="animate-fade-in-up opacity-0 [animation-delay:300ms]">L'équipe grandit.</p>
          </div>
        </div>

        {/* Separator */}
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
            <p className="text-3xl md:text-4xl font-serif font-bold text-foreground">Mais :</p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
          </div>
        </div>

        {/* Premium pain point cards */}
        <div className="grid gap-6">
          {painPoints.map(({ icon: Icon, text }, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              data-index={i}
              className="group relative flex items-start gap-6 p-8 rounded-2xl backdrop-blur-sm hover-lift cursor-pointer"
              style={{
                background: "linear-gradient(135deg, var(--glass-bg), rgba(255, 255, 255, 0.05))",
                border: "1px solid var(--glass-border)",
                borderLeft: "3px solid hsl(20 90% 48%)",
                boxShadow: "0 8px 30px hsl(0 0% 0% / 0.08)",
                opacity: visibleCards.has(i) ? 1 : 0,
                transform: visibleCards.has(i) ? "translateY(0)" : "translateY(30px)",
                transition: `all var(--duration-slow) var(--ease-smooth) ${i * 120}ms`,
              }}
            >
              {/* Icon container with gradient background */}
              <div
                className="flex items-center justify-center w-14 h-14 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background: "linear-gradient(135deg, hsl(20 90% 48% / 0.15), hsl(30 100% 60% / 0.1))",
                  border: "1px solid hsl(20 90% 48% / 0.2)",
                }}
              >
                <Icon className="h-6 w-6 text-primary" strokeWidth={2} />
              </div>

              {/* Text content */}
              <p className="text-foreground font-medium text-lg md:text-xl leading-relaxed flex-1 pt-2.5">
                {text}
              </p>

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at center, hsl(20 90% 48% / 0.05), transparent 70%)",
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom insight with enhanced styling */}
        <div className="space-y-6 text-center pt-12 border-t border-border/30">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            La croissance crée de la <strong className="text-foreground font-semibold">complexité</strong>.<br />
            La complexité crée de la <strong className="text-foreground font-semibold">confusion</strong>.<br />
            La confusion limite la <strong className="bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent font-semibold">scalabilité</strong>.
          </p>
          <div
            className="inline-block px-8 py-4 rounded-xl backdrop-blur-sm"
            style={{
              background: "linear-gradient(135deg, hsl(20 90% 48% / 0.1), hsl(30 100% 60% / 0.05))",
              border: "1px solid hsl(20 90% 48% / 0.2)",
            }}
          >
            <p className="text-lg md:text-xl font-semibold text-foreground">
              Ce diagnostic vous permet d'évaluer objectivement votre solidité stratégique.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContextSection;
