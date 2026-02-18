import { Button } from "@/components/ui/button";
import { ArrowDown, Users, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onStartQuiz: () => void;
}

const HeroSection = ({ onStartQuiz }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic animated gradient background */}
      <div className="absolute inset-0 animate-gradient bg-gradient-dark bg-[200%_200%]" />

      {/* Radial glow overlay */}
      <div
        className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_50%_30%,_hsl(20_90%_48%_/_0.15),_transparent_60%)]"
      />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-12">
        {/* Badge with animation */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full animate-fade-in-up stagger-1 border border-coral/30 bg-gradient-to-br from-coral/15 to-amber/10"
        >
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          <span className="text-sm font-bold text-primary uppercase tracking-wider">
            Diagnostic de Solidité Stratégique™
          </span>
        </div>

        {/* Main headline with stagger animation */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight animate-fade-in-up stagger-2 tracking-tight text-foreground/95">
          Votre croissance est-elle vraiment{" "}
          <span className="inline-block bg-gradient-to-br from-coral to-amber bg-clip-text text-transparent">
            structurée
          </span>
          … ou simplement portée par{" "}
          <span className="inline-block bg-gradient-to-br from-coral to-amber bg-clip-text text-transparent">
            votre énergie
          </span>{" "}
          ?
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl font-medium animate-fade-in-up stagger-3 text-foreground/80">
          Test stratégique pour PME de services B2B (10–50 employés)
        </p>

        {/* Description */}
        <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto animate-fade-in-up stagger-4 text-foreground/70">
          En 7 minutes, découvrez si votre entreprise repose sur une{" "}
          <strong className="text-primary">architecture solide</strong>…
          ou sur des <strong className="text-primary">fondations fragiles</strong> qui freineront votre croissance.
        </p>

        {/* CTA Button with premium styling */}
        <div className="flex flex-col items-center gap-6 animate-fade-in-up stagger-5">
          <Button
            onClick={onStartQuiz}
            size="lg"
            className="group relative px-8 py-6 md:px-12 md:py-7 text-base md:text-lg font-bold rounded-2xl overflow-hidden transition-all duration-300 hover-lift bg-gradient-premium shadow-lg hover:shadow-glow"
          >
            <span className="relative z-10 flex items-center gap-3">
              Je veux connaître le niveau réel de structuration de mon entreprise
              <ArrowDown className="h-5 w-5 animate-bounce" />
            </span>
            {/* Hover glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse bg-[radial-gradient(circle_at_center,_hsl(20_90%_48%_/_0.4),_transparent_70%)]" />
          </Button>
        </div>

        {/* Social proof with gradient avatars */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm animate-fade-in-up stagger-6 text-foreground/65">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-background flex items-center justify-center relative overflow-hidden ring-2 ring-background"
                style={{
                  background: `linear-gradient(${135 + i * 30}deg, hsl(20 90% ${40 + i * 5}%), hsl(${20 + i * 10} 85% ${50 + i * 3}%))`,
                }}
              >
                <Users className="h-5 w-5 text-white stroke-[1.5]" />
              </div>
            ))}
          </div>
          <p className="font-medium">
            Déjà <strong className="text-primary font-bold">500+</strong> dirigeants ont évalué leur structure
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-foreground/50" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
