import { Button } from "@/components/ui/button";
import { ArrowDown, Users, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onStartQuiz: () => void;
}

const HeroSection = ({ onStartQuiz }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic gradient background with animation */}
      <div
        className="absolute inset-0 animate-gradient"
        style={{
          background: "linear-gradient(135deg, hsl(0 0% 18%) 0%, hsl(0 0% 9%) 40%, hsl(0 0% 5%) 100%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Radial glow overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, hsl(20 90% 48% / 0.15) 0%, transparent 60%)",
        }}
      />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-12">
        {/* Animated badge */}
        <div className="animate-fade-in-down opacity-0 [animation-delay:100ms] inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium" style={{ color: "hsl(0 0% 80%)" }}>
            Diagnostic stratégique pour PME
          </span>
        </div>

        {/* Main title with stagger animation */}
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.1] animate-fade-in-up opacity-0 [animation-delay:200ms]"
          style={{
            color: "hsl(0 0% 96%)",
            letterSpacing: "-0.02em"
          }}
        >
          Votre entreprise est-elle réellement{" "}
          <span
            className="inline-block bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent animate-gradient"
            style={{ backgroundSize: "200% auto" }}
          >
            structurée pour la croissance
          </span>{" "}
          ?
        </h1>

        {/* Subheading with animation */}
        <div className="space-y-5 text-lg md:text-xl animate-fade-in-up opacity-0 [animation-delay:400ms]" style={{ color: "hsl(0 0% 70%)" }}>
          <p className="leading-relaxed">
            La plupart des PME en développement pensent avoir besoin de plus de marketing.
          </p>
          <p className="font-semibold text-xl md:text-2xl bg-gradient-to-r from-primary via-orange-400 to-amber-500 bg-clip-text text-transparent">
            En réalité, elles manquent de clarté stratégique.
          </p>
        </div>

        {/* Description */}
        <p
          className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed animate-fade-in-up opacity-0 [animation-delay:600ms]"
          style={{ color: "hsl(0 0% 60%)" }}
        >
          Faites ce diagnostic en <strong className="text-primary font-semibold">5 à 7 minutes</strong> et découvrez si votre entreprise est prête à scaler…
          ou si sa structure freine encore sa croissance.
        </p>

        {/* CTA with premium styling */}
        <div className="space-y-6 animate-fade-in-up opacity-0 [animation-delay:800ms]">
          <Button
            variant="hero"
            size="lg"
            onClick={onStartQuiz}
            className="group relative px-12 py-7 text-lg font-semibold overflow-hidden hover-scale"
            style={{
              background: "linear-gradient(135deg, hsl(20 90% 48%) 0%, hsl(24 95% 55%) 100%)",
              boxShadow: "0 4px 30px hsl(20 90% 48% / 0.4), 0 0 60px hsl(20 90% 48% / 0.2)",
              transition: "all var(--duration-normal) var(--ease-smooth)",
            }}
          >
            <span className="relative z-10">Commencez le diagnostic maintenant</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, hsl(24 95% 55%) 0%, hsl(28 100% 60%) 100%)",
              }}
            />
          </Button>

          {/* Social proof with animation */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-background"
                  style={{
                    background: `linear-gradient(135deg, hsl(${i * 40} 70% 60%), hsl(${i * 40 + 30} 65% 55%))`,
                  }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" style={{ color: "hsl(0 0% 75%)" }} />
              <span className="text-sm font-medium" style={{ color: "hsl(0 0% 75%)" }}>
                Rejoignez <strong className="text-primary">+500 dirigeants</strong> ayant passé le diagnostic
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="pt-12 animate-bounce opacity-0 [animation-delay:1000ms]">
          <ArrowDown className="h-6 w-6 mx-auto" style={{ color: "hsl(0 0% 40%)" }} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
