import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { quizParts, allQuestions, totalMaxScore } from "./QuizData";
import QuizQuestion from "./QuizQuestion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const DiagnosticQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const totalQuestions = allQuestions.length;
  const currentQuestion = allQuestions[currentQuestionIndex];

  const currentPart = useMemo(() => {
    let count = 0;
    for (const part of quizParts) {
      count += part.questions.length;
      if (currentQuestionIndex < count) return part;
    }
    return quizParts[quizParts.length - 1];
  }, [currentQuestionIndex]);

  const partStartIndex = useMemo(() => {
    let count = 0;
    for (const part of quizParts) {
      if (part.id === currentPart.id) return count;
      count += part.questions.length;
    }
    return 0;
  }, [currentPart]);

  const questionInPart = currentQuestionIndex - partStartIndex + 1;
  const questionsInCurrentPart = currentPart.questions.length;
  const overallProgress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleSelect = (value: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      navigate("/resultat", { state: { score: totalScore } });
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex((prev) => prev - 1);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const currentAnswer = answers[currentQuestion?.id] ?? null;

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Part indicators - premium design */}
      <div className="flex gap-3 md:gap-4">
        {quizParts.map((part) => {
          const isActive = part.id === currentPart.id;
          const partEnd = quizParts
            .slice(0, quizParts.indexOf(part) + 1)
            .reduce((s, p) => s + p.questions.length, 0);
          const isDone = currentQuestionIndex >= partEnd;

          return (
            <div
              key={part.id}
              className={cn(
                "flex-1 rounded-xl px-3 py-3 md:px-5 md:py-5 text-center transition-all duration-500 backdrop-blur-sm relative overflow-hidden",
                isActive && "hover-scale"
              )}
              style={{
                background: isActive
                  ? "linear-gradient(135deg, hsl(20 90% 48% / 0.15), hsl(30 100% 60% / 0.1))"
                  : isDone
                    ? "linear-gradient(135deg, hsl(20 90% 48% / 0.08), transparent)"
                    : "linear-gradient(135deg, var(--glass-bg), rgba(255, 255, 255, 0.02))",
                border: isActive
                  ? "2px solid hsl(20 90% 48%)"
                  : isDone
                    ? "1px solid hsl(20 90% 48% / 0.3)"
                    : "1px solid var(--glass-border)",
                boxShadow: isActive ? "0 4px 20px hsl(20 90% 48% / 0.2)" : "none",
              }}
            >
              <span
                className={cn(
                  "text-xs md:text-sm font-bold uppercase tracking-wider",
                  isActive ? "text-primary" : isDone ? "text-primary/60" : "text-muted-foreground"
                )}
              >
                <span className="sm:hidden">P{part.id}</span>
                <span className="hidden sm:inline">Partie {part.id}</span>
              </span>
              <p
                className={cn(
                  "text-sm md:text-base font-semibold mt-1.5 hidden md:block",
                  isActive ? "text-foreground" : isDone ? "text-foreground/60" : "text-muted-foreground/70"
                )}
              >
                {part.title}
              </p>
              {isActive && (
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: "radial-gradient(circle at center, hsl(20 90% 48% / 0.15), transparent 70%)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Premium progress bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm md:text-base font-medium text-muted-foreground">
            Question <strong className="text-foreground">{questionInPart}</strong> / {questionsInCurrentPart}
          </span>
          <div
            className="px-3 py-1 rounded-full text-sm font-bold"
            style={{
              background: "linear-gradient(135deg, hsl(20 90% 48% / 0.15), hsl(30 100% 60% / 0.1))",
              color: "hsl(20 90% 48%)",
            }}
          >
            {Math.round(overallProgress)}%
          </div>
        </div>
        <div
          className="relative h-3 rounded-full overflow-hidden"
          style={{
            background: "linear-gradient(90deg, hsl(0 0% 0% / 0.05), hsl(0 0% 0% / 0.08))",
          }}
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${overallProgress}%`,
              background: "linear-gradient(90deg, hsl(20 90% 48%), hsl(30 100% 60%))",
              boxShadow: "0 0 10px hsl(20 90% 48% / 0.5)",
            }}
          />
        </div>
      </div>

      {/* Part subtitle on transition */}
      {questionInPart === 1 && (
        <div className="text-center animate-in fade-in duration-500">
          <p className="text-sm text-muted-foreground italic">{currentPart.subtitle}</p>
        </div>
      )}

      {/* Question */}
      <QuizQuestion
        key={currentQuestion.id}
        question={currentQuestion}
        partTitle={currentPart.title}
        selectedValue={currentAnswer}
        onSelect={handleSelect}
      />

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6">
        <Button
          variant="ghost"
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Précédent
        </Button>
        <Button
          variant="hero"
          onClick={handleNext}
          disabled={currentAnswer === null}
          className="gap-2 px-8"
        >
          {currentQuestionIndex === totalQuestions - 1
            ? "Voir mon résultat"
            : "Suivant"}{" "}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DiagnosticQuiz;
