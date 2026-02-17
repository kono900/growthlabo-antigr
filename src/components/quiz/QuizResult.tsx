import { quizResults } from "./QuizData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuizResultProps {
  score: number;
  maxScore: number;
  onRestart: () => void;
}

const QuizResultComponent = ({ score, maxScore, onRestart }: QuizResultProps) => {
  const result = quizResults.find(
    (r) => score >= r.range[0] && score <= r.range[1]
  ) || quizResults[0];

  const percentage = Math.round((score / maxScore) * 100);

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700">
      <div className="text-center space-y-4">
        <span className="text-6xl">{result.emoji}</span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
          {result.title}
        </h2>
        <p className="text-lg text-muted-foreground">
          Votre score : <span className="font-bold text-primary">{score}/{maxScore}</span> ({percentage}%)
        </p>
      </div>

      <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl font-serif">Diagnostic</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-card-foreground leading-relaxed">{result.description}</p>
          <div className="border-t border-border pt-4">
            <h4 className="font-semibold text-primary mb-2">💡 Recommandation</h4>
            <p className="text-muted-foreground leading-relaxed">{result.recommendation}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="hero" size="lg" onClick={onRestart}>
          Refaire le diagnostic
        </Button>
      </div>
    </div>
  );
};

export default QuizResultComponent;
