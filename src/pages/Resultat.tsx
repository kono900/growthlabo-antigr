import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, ArrowRight, BarChart3 } from "lucide-react";
import QuizResultComponent from "@/components/quiz/QuizResult";
import { totalMaxScore } from "@/components/quiz/QuizData";

const Resultat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = (location.state as any)?.score as number | undefined;

  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");

  if (score === undefined) {
    navigate("/");
    return null;
  }

  const percentage = Math.round((score / totalMaxScore) * 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmed = email.trim();
    if (!trimmed || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(trimmed)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    // Honeypot: if filled, silently pretend success (bot trap)
    if (honeypot) {
      setLoading(true);
      setTimeout(() => { setUnlocked(true); setLoading(false); }, 800);
      return;
    }

    // Client-side rate limit: max 3 submissions per session
    const attempts = parseInt(sessionStorage.getItem("ql_attempts") || "0", 10);
    if (attempts >= 3) {
      setError("Trop de tentatives. Veuillez réessayer plus tard.");
      return;
    }

    setLoading(true);
    try {
      const { error: dbError } = await supabase.from("quiz_leads").insert({
        email: trimmed,
        score,
        max_score: totalMaxScore,
      });
      if (dbError) {
        // Handle unique constraint violation (duplicate email)
        if (dbError.code === "23505") {
          setError("Cet email a déjà été utilisé. Veuillez en utiliser un autre.");
        } else {
          throw dbError;
        }
      } else {
        sessionStorage.setItem("ql_attempts", String(attempts + 1));
        setUnlocked(true);
      }
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (unlocked) {
    return (
      <main className="min-h-screen bg-secondary/30 py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-6">
          <QuizResultComponent
            score={score}
            maxScore={totalMaxScore}
            onRestart={() => navigate("/")}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-secondary/30 px-6">
      <div className="max-w-md w-full space-y-8 text-center animate-in fade-in zoom-in-95 duration-700">
        {/* Score teaser */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto">
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Votre diagnostic est prêt
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Vous avez obtenu <span className="font-bold text-primary">{percentage}%</span> — entrez votre email pour découvrir votre analyse détaillée et nos recommandations personnalisées.
          </p>
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot - hidden from humans, traps bots */}
          <div className="absolute opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
            <input
              type="text"
              name="website"
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
            />
          </div>
          <div className="relative">
            <Input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-base pr-4"
              autoFocus
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full gap-2"
            disabled={loading}
          >
            {loading ? "Envoi…" : "Voir mon résultat détaillé"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        {/* Trust */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Lock className="h-3.5 w-3.5" />
          <span>Vos données restent confidentielles. Aucun spam.</span>
        </div>
      </div>
    </main>
  );
};

export default Resultat;
