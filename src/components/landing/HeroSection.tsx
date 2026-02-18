import { Button } from "@/components/ui/button";
import { ArrowDown, Users, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onStartQuiz: () => void;
}

const HeroSection = ({ onStartQuiz }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with more depth */}
      <div className="absolute inset-0 bg-background/80" />

      {/* Dynamic animated gradient background - Increased visibility */}
      <div className="absolute inset-0 animate-gradient bg-gradient-dark bg-[200%_200%] opacity-90" />

      {/* Radial glow overlay - Warmer and more expansive */}
      <div
        className="absolute inset-0 opacity-60 bg-[radial-gradient(ellipse_at_50%_-20%,_hsl(20_90%_48%_/_0.25),_transparent_70%)]"
      />

      {/* Secondary accent glow */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-20 bg-[radial-gradient(circle,_hsl(38_100%_64%_/_0.2),_transparent_70%)] blur-[100px]"
      />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-12">
        {/* Badge with animation - High contrast */}
        <div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full animate-fade-in-up stagger-1 border border-coral/40 bg-black/40 backdrop-blur-md shadow-lg shadow-coral/10"
        >
          <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
          <span className="text-sm font-bold text-amber-100 uppercase tracking-wider">
            Diagnostic de Solidité Stratégique™
          </span>
        </div>

        {/* Main headline with stagger animation */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight animate-fade-in-up stagger-2 tracking-tight text-white drop-shadow-sm">
          Votre croissance est-elle vraiment{" "}
          <span className="relative inline-block">
            <span className="absolute inset-0 bg-gradient-to-r from-coral/20 to-amber/20 blur-lg" />
            <span className="relative bg-gradient-to-br from-coral to-amber bg-clip-text text-transparent filter drop-shadow-sm">
              structurée
            </span>
          </span>
          <br className="hidden md:block" />
          … ou simplement portée par{" "}
          <span className="bg-gradient-to-br from-coral to-amber bg-clip-text text-transparent">
            votre énergie
          </span>{" "}
          ?
        </h1>

        {/* Subtitle - Better readability */}
        <p className="text-xl md:text-3xl font-medium animate-fade-in-up stagger-3 text-white/90">
          Test stratégique pour PME de services B2B (10–50 employés)
        </p>

        {/* Description - Increased contrast */}
        <div className="max-w-3xl mx-auto animate-fade-in-up stagger-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <p className="text-base md:text-lg leading-relaxed text-blue-50/90">
            En 7 minutes, découvrez si votre entreprise repose sur une{" "}
            <strong className="text-amber-300 font-semibold">architecture solide</strong>…
            ou sur des <strong className="text-coral-300 font-semibold">fondations fragiles</strong> qui freineront votre croissance.
          </p>
        </div>

        {/* CTA Button with premium styling - standout */}
        <div className="flex flex-col items-center gap-6 animate-fade-in-up stagger-5 pt-4">
          <Button
            onClick={onStartQuiz}
            size="lg"
            className="group relative px-8 py-6 md:px-12 md:py-8 text-base md:text-xl font-bold rounded-2xl overflow-hidden transition-all duration-300 hover-lift bg-gradient-premium shadow-[0_0_40px_-10px_rgba(255,107,74,0.5)] hover:shadow-[0_0_60px_-15px_rgba(255,107,74,0.6)] border-t border-white/20"
          >
            <span className="relative z-10 flex items-center gap-3 text-white">
              Je fais le diagnostic maintenant
              <ArrowDown className="h-6 w-6 animate-bounce" />
            </span>
            {/* Hover glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,_hsl(20_90%_48%_/_0.8),_transparent_70%)]" />
          </Button>

          <p className="text-sm text-white/50">Gratuit • Sans engagement • Résultats immédiats</p>
        </div>

        {/* Social proof with gradient avatars */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 text-sm animate-fade-in-up stagger-6 text-white/80 pt-8">
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-full border-2 border-background/20 flex items-center justify-center relative overflow-hidden ring-2 ring-black/20 shadow-lg"
                style={{
                  background: `linear-gradient(${135 + i * 30}deg, hsl(20 90% ${40 + i * 5}%), hsl(${20 + i * 10} 85% ${50 + i * 3}%))`,
                }}
              >
                <Users className="h-5 w-5 text-white stroke-[1.5]" />
              </div>
            ))}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1 text-amber-400">
              ★★★★★
            </div>
            <p className="font-medium">
              Déjà <strong className="text-white font-bold">500+</strong> dirigeants ont évalué leur structure
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <ArrowDown className="h-6 w-6 text-white" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
