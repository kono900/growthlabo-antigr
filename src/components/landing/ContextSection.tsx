import { Target, MessageCircle, Users, Zap, TrendingUp, DollarSign, AlertTriangle, BarChart3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ContextSection = () => {
  const painPoints = [
    { icon: Target, text: "Votre offre est devenue difficile à expliquer clairement ?" },
    { icon: MessageCircle, text: "Vos commerciaux ne présentent pas l'entreprise de la même façon ?" },
    { icon: Users, text: "Vous acceptez parfois des clients qui ne correspondent pas à votre cœur de valeur ?" },
    { icon: Zap, text: "Votre croissance dépend encore trop de vous ?" },
  ];

  const whyNowPoints = [
    { icon: AlertTriangle, text: "Plus la confusion interne augmente" },
    { icon: DollarSign, text: "Plus la marge s'érode" },
    { icon: BarChart3, text: "Plus les décisions deviennent incohérentes" },
    { icon: TrendingUp, text: "Plus la croissance devient instable" },
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
    // CHANGED: Darker/Warmer background to contrast with white cards
    <section className="py-32 md:py-44 bg-secondary/30 relative overflow-hidden">
      {/* Decorative elements - slightly more visible now */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-coral/40 to-transparent" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-4xl mx-auto px-6 space-y-20 relative z-10">
        {/* Header section with enhanced typography */}
        <div className="space-y-8 text-center">
          <div className="space-y-3 text-xl md:text-2xl text-foreground/80 font-medium">
            <p className="animate-fade-in-up opacity-0 [animation-delay:100ms]">Vous avez des clients.</p>
            <p className="animate-fade-in-up opacity-0 [animation-delay:200ms]">Vous avez une équipe.</p>
            <p className="animate-fade-in-up opacity-0 [animation-delay:300ms]">Vous êtes en croissance.</p>
          </div>
        </div>

        {/* Separator */}
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-coral/50" />
            <p className="text-3xl md:text-4xl font-serif font-bold text-foreground">Mais…</p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-coral/50" />
          </div>
        </div>

        {/* Premium pain point cards */}
        <div className="grid gap-6">
          {painPoints.map(({ icon: Icon, text }, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              data-index={i}
              className={cn(
                "group relative flex items-start gap-6 p-8 rounded-2xl cursor-pointer transition-all duration-500 ease-smooth",
                "bg-card border border-border/50 shadow-md hover:shadow-lg hover:-translate-y-1",
                "dark:bg-card/95"
              )}
              style={{
                opacity: visibleCards.has(i) ? 1 : 0,
                transform: visibleCards.has(i) ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              {/* Icon container with solid background for contrast */}
              <div
                className="flex items-center justify-center w-14 h-14 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 bg-gradient-to-br from-coral to-amber shadow-sm text-white"
              >
                <Icon className="h-7 w-7" strokeWidth={2} />
              </div>

              {/* Text content - ensured high contrast */}
              <p className="text-foreground font-medium text-lg md:text-xl leading-relaxed flex-1 pt-2.5">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Key message - High Impact Box */}
        <div className="text-center space-y-6 py-10 px-6 rounded-3xl bg-gradient-to-br from-white to-secondary/50 dark:from-white/5 dark:to-transparent border border-white/20 shadow-sm">
          <p className="text-xl md:text-2xl text-muted-foreground">
            Si oui, le problème n'est pas votre marketing.
          </p>
          <p className="text-2xl md:text-4xl font-serif font-bold text-foreground">
            Le problème est{" "}
            <span className="inline-block bg-gradient-to-r from-coral to-amber px-2 text-transparent bg-clip-text font-extrabold pb-1">
              structurel
            </span>
            .
          </p>
        </div>

        {/* Why Now Section */}
        <div className="space-y-10 pt-4">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-center text-foreground">
            Pourquoi ce diagnostic est crucial maintenant
          </h3>

          <p className="text-lg md:text-xl text-center text-foreground/70 max-w-2xl mx-auto">
            Plus une PME grandit sans architecture claire :
          </p>

          {/* Why now cards - Distinct Cards */}
          <div className="grid md:grid-cols-2 gap-5">
            {whyNowPoints.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-6 rounded-xl bg-background border-l-4 border-l-amber shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-2 rounded-full bg-amber/10 text-amber-600 dark:text-amber-400">
                  <Icon className="h-5 w-5 shrink-0" strokeWidth={2.5} />
                </div>
                <p className="text-foreground font-semibold text-base md:text-lg">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom evaluation box */}
        <div className="space-y-8 text-center pt-12 border-t border-border/30">
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto font-medium">
            Ce test vous permet d'évaluer objectivement :
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              "✔ La clarté de votre positionnement",
              "✔ La solidité de votre architecture d'offre",
              "✔ L'alignement stratégique de votre direction"
            ].map((item, i) => (
              <div key={i} className="px-6 py-4 rounded-xl bg-gradient-to-br from-coral/10 to-amber/10 border border-coral/20 text-coral-900 dark:text-coral-100 font-semibold shadow-sm">
                <p className="text-base md:text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContextSection;
