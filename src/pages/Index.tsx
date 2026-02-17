import { useRef } from "react";
import HeroSection from "@/components/landing/HeroSection";
import ContextSection from "@/components/landing/ContextSection";
import QuizSection from "@/components/landing/QuizSection";

const Index = () => {
  const quizRef = useRef<HTMLElement>(null);

  const scrollToQuiz = () => {
    quizRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen">
      <HeroSection onStartQuiz={scrollToQuiz} />
      <ContextSection />
      <QuizSection ref={quizRef} />
    </main>
  );
};

export default Index;
