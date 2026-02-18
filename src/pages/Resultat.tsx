import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, ArrowRight, BarChart3, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";
import QuizResultComponent from "@/components/quiz/QuizResult";

const Resultat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = (location.state as any)?.score as number | undefined;

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    companyName: "",
    employeeCount: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [currentMessage, setCurrentMessage] = useState(0);

  if (score === undefined) {
    navigate("/");
    return null;
  }

  const percentage = Math.round((score / 60) * 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = formData.email.trim();
    const trimmedFirstName = formData.firstName.trim();
    const trimmedCompanyName = formData.companyName.trim();

    // Validation
    if (!trimmedFirstName) {
      setError("Veuillez entrer votre prénom.");
      return;
    }
    if (!trimmedEmail || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(trimmedEmail)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }
    if (!trimmedCompanyName) {
      setError("Veuillez entrer le nom de votre entreprise.");
      return;
    }
    if (!formData.employeeCount) {
      setError("Veuillez sélectionner le nombre d'employés.");
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
        email: trimmedEmail,
        score,
        max_score: 60,
        first_name: trimmedFirstName,
        company_name: trimmedCompanyName,
        employee_count: formData.employeeCount,
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
        setLoading(false);
        setAnalyzing(true);

        // Animation des messages
        const messages = 3;
        const messageInterval = setInterval(() => {
          setCurrentMessage((prev) => {
            if (prev >= messages - 1) {
              clearInterval(messageInterval);
              return prev;
            }
            return prev + 1;
          });
        }, 700); // Change toutes les 700ms

        // Après 2 secondes, afficher les résultats
        setTimeout(() => {
          clearInterval(messageInterval);
          setAnalyzing(false);
          setUnlocked(true);
        }, 2100);
      }
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      if (!analyzing) {
        setLoading(false);
      }
    }
  };

  // Écran d'analyse avec messages animés
  if (analyzing) {
    const analysisMessages = [
      "Analyse en cours…",
      "Évaluation de la solidité stratégique…",
      "Calcul du niveau d'architecture…",
    ];

    return (
      <main className="min-h-screen bg-secondary/30 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in-95 duration-700">
          {/* Spinner animé */}
          <div className="relative mx-auto w-24 h-24">
            <div
              className="absolute inset-0 rounded-full animate-spin"
              style={{
                background: "conic-gradient(from 0deg, hsl(20 90% 48%), hsl(30 100% 60%), hsl(20 90% 48%))",
                mask: "radial-gradient(circle, transparent 60%, black 60%)",
                WebkitMask: "radial-gradient(circle, transparent 60%, black 60%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <BarChart3 className="h-10 w-10 text-primary" />
            </div>
          </div>

          {/* Messages qui défilent */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              {analysisMessages[currentMessage]}
            </h2>
            <div className="flex justify-center gap-2">
              {analysisMessages.map((_, idx) => (
                <div
                  key={idx}
                  className="h-2 w-2 rounded-full transition-all duration-300"
                  style={{
                    background: idx <= currentMessage ? "hsl(20 90% 48%)" : "hsl(0 0% 80% / 0.3)",
                    transform: idx === currentMessage ? "scale(1.2)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Barre de progression */}
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-2000 ease-linear"
              style={{
                width: `${((currentMessage + 1) / analysisMessages.length) * 100}%`,
                background: "linear-gradient(90deg, hsl(20 90% 48%), hsl(30 100% 60%))",
              }}
            />
          </div>
        </div>
      </main>
    );
  }

  if (unlocked) {
    return (
      <main className="min-h-screen bg-secondary/30 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <QuizResultComponent
            score={score}
            maxScore={60}
            onRestart={() => navigate("/")}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary/30 py-10 md:py-24 px-4 md:px-6">
      <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-700">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto">
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl md:text-5xl font-serif font-bold text-foreground">
            Avant d'afficher votre score…
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            Entrez vos informations pour recevoir votre{" "}
            <strong className="text-foreground">diagnostic stratégique complet</strong>{" "}
            (PDF + recommandations)
          </p>
          <div className="inline-block px-6 py-3 rounded-xl" style={{
            background: "linear-gradient(135deg, hsl(20 90% 48% / 0.1), hsl(30 100% 60% / 0.05))",
            border: "1px solid hsl(20 90% 48% / 0.2)",
          }}>
            <p className="text-lg font-semibold text-foreground">
              Votre diagnostic est <span className="text-primary text-xl font-bold">prêt à être consulté</span>
            </p>
          </div>
        </div>

        {/* Tension Message */}
        <div
          className="p-6 rounded-2xl text-center"
          style={{
            background: "linear-gradient(135deg, hsl(0 84% 60% / 0.08), hsl(0 84% 60% / 0.04))",
            border: "1px solid hsl(0 84% 60% / 0.2)",
          }}
        >
          <p className="text-lg md:text-xl font-semibold text-foreground leading-relaxed">
            <AlertCircle className="inline h-5 w-5 text-orange-500 mr-2 mb-1" />
            78% des PME en croissance surestiment leur niveau réel de structuration stratégique.
            <br />
            <span className="text-primary">Découvrez où vous vous situez réellement.</span>
          </p>
        </div>

        {/* Why Reserved Section */}
        <div
          className="p-6 md:p-10 rounded-3xl space-y-6"
          style={{
            background: "linear-gradient(135deg, var(--glass-bg), rgba(255, 255, 255, 0.02))",
            border: "1px solid var(--glass-border)",
          }}
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
            Pourquoi ce diagnostic est réservé ?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Ce diagnostic est conçu uniquement pour les <strong className="text-foreground">PME de services B2B</strong> qui :
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              "Comptent entre 10 et 50 employés",
              "Sont déjà en activité",
              "Sont en phase de croissance (recrutements, nouveaux clients, nouveaux services)"
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, hsl(20 90% 48% / 0.05), transparent)",
                  border: "1px solid hsl(20 90% 48% / 0.15)",
                }}
              >
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-base text-foreground">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-base text-muted-foreground italic pt-2">
            Si ce n'est pas votre cas, le diagnostic risque de ne pas être pertinent pour vous.
          </p>
        </div>

        {/* What You Receive Section */}
        <div
          className="p-6 md:p-10 rounded-3xl space-y-6"
          style={{
            background: "linear-gradient(135deg, hsl(142 76% 36% / 0.05), hsl(142 76% 36% / 0.02))",
            border: "1px solid hsl(142 76% 36% / 0.2)",
          }}
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
            🎯 Ce que vous recevez immédiatement
          </h2>
          <div className="space-y-4">
            {[
              "Votre score détaillé sur 60 points",
              "Votre niveau de solidité stratégique (faible, moyen, avancé)",
              "L'analyse de vos zones de fragilité",
              "Les 3 priorités à activer dans les 90 prochains jours"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-lg text-foreground font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Section */}
        <div
          className="p-6 md:p-8 rounded-2xl space-y-4"
          style={{
            background: "linear-gradient(135deg, hsl(20 90% 48% / 0.08), hsl(30 100% 60% / 0.04))",
            border: "1px solid hsl(20 90% 48% / 0.2)",
          }}
        >
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Important
          </h3>
          <p className="text-base md:text-lg text-foreground leading-relaxed">
            Ce n'est pas un test marketing générique.<br />
            C'est un <strong>diagnostic stratégique</strong> basé sur les fondations nécessaires à une croissance structurée :
          </p>
          <div className="grid md:grid-cols-3 gap-3">
            {["Positionnement clair", "Architecture d'offre cohérente", "Alignement direction & équipe"].map((item, idx) => (
              <div key={idx} className="px-4 py-2 rounded-lg text-center font-medium text-foreground"
                style={{
                  background: "linear-gradient(135deg, hsl(20 90% 48% / 0.1), transparent)",
                  border: "1px solid hsl(20 90% 48% / 0.2)",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div
            className="p-6 md:p-10 rounded-3xl space-y-6"
            style={{
              background: "linear-gradient(135deg, var(--glass-bg), rgba(255, 255, 255, 0.02))",
              border: "2px solid var(--glass-border)",
            }}
          >
            <h3 className="text-2xl font-serif font-bold text-foreground text-center">
              📥 Recevez votre diagnostic
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Prénom <span className="text-destructive">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Jean"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="h-12 text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email professionnel <span className="text-destructive">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="jean@entreprise.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nom de l'entreprise <span className="text-destructive">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Mon Entreprise SARL"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="h-12 text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nombre d'employés <span className="text-destructive">*</span>
                </label>
                <select
                  value={formData.employeeCount}
                  onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                  className="w-full h-12 px-4 rounded-md border border-input bg-background text-foreground text-base"
                >
                  <option value="">Sélectionnez</option>
                  <option value="1-9">1-9 employés</option>
                  <option value="10-19">10-19 employés</option>
                  <option value="20-29">20-29 employés</option>
                  <option value="30-39">30-39 employés</option>
                  <option value="40-50">40-50 employés</option>
                  <option value="50+">Plus de 50 employés</option>
                </select>
              </div>

              {error && (
                <p className="text-sm text-destructive bg-destructive/10 px-4 py-2 rounded-lg">{error}</p>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full gap-2 h-14 text-lg font-bold"
                disabled={loading}
                style={{
                  background: "linear-gradient(135deg, hsl(20 90% 48%), hsl(24 95% 55%))",
                  boxShadow: "0 10px 40px hsl(20 90% 48% / 0.3)",
                }}
              >
                {loading ? "Envoi…" : "Voir mon diagnostic stratégique"}
                <ArrowRight className="h-5 w-5" />
              </Button>

              {/* Trust */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2">
                <Lock className="h-3.5 w-3.5" />
                <span>Vos données restent confidentielles. Aucun spam. Vous pouvez vous désinscrire à tout moment.</span>
              </div>
            </div>
          </div>
        </form>

        {/* WhatsApp Option */}
        <div
          className="p-6 md:p-8 rounded-2xl text-center space-y-4"
          style={{
            background: "linear-gradient(135deg, hsl(142 76% 36% / 0.08), hsl(142 76% 36% / 0.04))",
            border: "1px solid hsl(142 76% 36% / 0.2)",
          }}
        >
          <h3 className="text-xl font-bold text-foreground flex items-center justify-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-600" />
            Vous préférez échanger en direct ?
          </h3>
          <p className="text-base md:text-lg text-foreground">
            👉 Écrivez-moi sur{" "}
            <a
              href="https://wa.me/2290161088001"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-green-600 hover:underline"
            >
              WhatsApp au +229 01 61 08 80 01
            </a>{" "}
            pour recevoir votre diagnostic et poser vos questions.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Resultat;
