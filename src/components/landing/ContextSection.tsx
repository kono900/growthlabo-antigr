import { Target, MessageCircle, Users, Zap, TrendingUp, DollarSign, AlertTriangle, BarChart3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
    <section className="py-32 md:py-44 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-coral/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 space-y-20">
        {/* Header section with enhanced typography */}
        <div className="space-y-8 text-center">
          <div className="space-y-3 text-xl md:text-2xl text-muted-foreground">
            <p className="animate-fade-in-up opacity-0 [animation-delay:100ms]">Vous avez des clients.</p>
            <p className="animate-fade-in-up opacity-0 [animation-delay:200ms]">Vous avez une équipe.</p>
            <p className="animate-fade-in-up opacity-0 [animation-delay:300ms]">Vous êtes en croissance.</p>
          </div>
        </div>

        {/* Separator */}
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
            <p className="text-3xl md:text-4xl font-serif font-bold text-foreground">Mais…</p>
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
              className="group relative flex items-start gap-6 p-8 rounded-2xl backdrop-blur-sm hover-lift cursor-pointer bg-gradient-glass border border-white/10 dark:border-white/5 border-l-4 border-l-coral shadow-sm transition-all duration-500 ease-smooth"
              style={{
                opacity: visibleCards.has(i) ? 1 : 0,
                transform: visibleCards.has(i) ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              {/* Icon container with gradient background */}
              <div
                className="flex items-center justify-center w-14 h-14 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 bg-gradient-to-br from-coral/15 to-amber/10 border border-coral/20"
              >
                <Icon className="h-6 w-6 text-primary" strokeWidth={2} />
              </div>

              {/* Text content */}
              <p className="text-foreground font-medium text-lg md:text-xl leading-relaxed flex-1 pt-2.5">
                {text}
              </p>

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(circle_at_center,_hsl(20_90%_48%_/_0.05),_transparent_70%)]"
              />
            </div>
          ))}
        </div>

        {/* Key message */}
        <div className="text-center space-y-4">
          <p className="text-xl md:text-2xl text-muted-foreground">
            Si oui, le problème n'est pas votre marketing.
          </p>
          <p className="text-2xl md:text-3xl font-serif font-bold text-foreground">
            Le problème est{" "}
            <span className="inline-block bg-gradient-to-br from-coral to-amber bg-clip-text text-transparent">
              structurel
            </span>
            .
          </p>
        </div>

        {/* Why Now Section */}
        <div className="space-y-10 pt-8">
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-center text-foreground">
            Pourquoi ce diagnostic est crucial maintenant
          </h3>

          <p className="text-lg md:text-xl text-center text-muted-foreground max-w-2xl mx-auto">
            Plus une PME grandit sans architecture claire :
          </p>

          {/* Why now cards - simpler design */}
          <div className="grid md:grid-cols-2 gap-5">
            {whyNowPoints.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-6 rounded-xl backdrop-blur-sm bg-gradient-to-br from-coral/10 to-transparent border border-coral/15"
              >
                <Icon className="h-5 w-5 text-primary shrink-0" strokeWidth={2} />
                <p className="text-foreground font-medium text-base md:text-lg">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom evaluation box */}
        <div className="space-y-6 text-center pt-12 border-t border-border/30">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Ce test vous permet d'évaluer objectivement :
          </p>
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              "✔ La clarté de votre positionnement",
              "✔ La solidité de votre architecture d'offre",
              "✔ L'alignement stratégique de votre direction"
            ].map((item, i) => (
              <div key={i} className="px-6 py-4 rounded-xl backdrop-blur-sm bg-gradient-to-br from-coral/10 to-amber/5 border border-coral/20">
                <p className="text-base md:text-lg font-semibold text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContextSection;
