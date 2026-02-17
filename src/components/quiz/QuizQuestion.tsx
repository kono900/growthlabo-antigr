import { QuizQuestion as QuizQuestionType } from "./QuizData";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface QuizQuestionProps {
  question: QuizQuestionType;
  partTitle: string;
  selectedValue: number | null;
  onSelect: (value: number) => void;
}

const QuizQuestion = ({ question, partTitle, selectedValue, onSelect }: QuizQuestionProps) => {
  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in-up">
      {/* Question header */}
      <div className="space-y-3">
        <div
          className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
          style={{
            background: "linear-gradient(135deg, hsl(20 90% 48% / 0.15), hsl(30 100% 60% / 0.1))",
            color: "hsl(20 90% 48%)",
          }}
        >
          {partTitle}
        </div>
        <h3 className="text-xl md:text-3xl font-serif font-bold text-foreground leading-tight">
          {question.question}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3 md:space-y-4">
        {question.options.map((option, idx) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={cn(
                "w-full text-left px-5 py-5 md:px-6 md:py-6 rounded-2xl cursor-pointer group relative overflow-hidden",
                "transition-all duration-300 ease-out hover-lift",
                "stagger-" + (idx + 1)
              )}
              style={{
                background: isSelected
                  ? "linear-gradient(135deg, hsl(20 90% 48% / 0.15), hsl(30 100% 60% / 0.08))"
                  : "linear-gradient(135deg, var(--glass-bg), rgba(255, 255, 255, 0.02))",
                border: isSelected
                  ? "2px solid hsl(20 90% 48%)"
                  : "1px solid var(--glass-border)",
                boxShadow: isSelected
                  ? "0 4px 20px hsl(20 90% 48% / 0.2), 0 0 0 1px hsl(20 90% 48% / 0.1)"
                  : "0 2px 10px hsl(0 0% 0% / 0.05)",
              }}
            >
              <div className="flex items-center gap-4 md:gap-5 relative z-10">
                {/* Check indicator */}
                <div
                  className={cn(
                    "flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full shrink-0 transition-all duration-300",
                    isSelected && "animate-fade-in-scale"
                  )}
                  style={{
                    background: isSelected
                      ? "linear-gradient(135deg, hsl(20 90% 48%), hsl(24 95% 55%))"
                      : "transparent",
                    border: isSelected
                      ? "none"
                      : "2px solid hsl(0 0% 0% / 0.2)",
                  }}
                >
                  {isSelected && <Check className="h-4 w-4 md:h-5 md:w-5 text-white" strokeWidth={3} />}
                </div>

                {/* Option text */}
                <span
                  className={cn(
                    "text-base md:text-lg leading-relaxed transition-all duration-300 flex-1",
                    isSelected ? "text-foreground font-semibold" : "text-foreground/90"
                  )}
                >
                  {option.label}
                </span>
              </div>

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at center, hsl(20 90% 48% / 0.05), transparent 70%)",
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizQuestion;
