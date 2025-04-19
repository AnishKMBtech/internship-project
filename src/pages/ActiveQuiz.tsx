import { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
];

const ActiveQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === mockQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < mockQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        navigate("/results", { state: { score, total: mockQuestions.length } });
      }
    }, 1000);
  };

  const question = mockQuestions[currentQuestion];

  return (
    <div className="container mx-auto px-4 pt-24 pb-8 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-full h-2 mb-4">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / mockQuestions.length) * 100}%`,
              }}
            />
          </div>
          <p className="text-right text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {mockQuestions.length}
          </p>
        </div>

        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            {question.question}
          </h2>
          <div className="space-y-4">
            {question.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  selectedAnswer === option
                    ? option === question.correctAnswer
                      ? "bg-green-100 dark:bg-green-900/50 border-green-500"
                      : "bg-red-100 dark:bg-red-900/50 border-red-500"
                    : "bg-white/50 dark:bg-gray-800/50 hover:bg-primary/5 dark:hover:bg-primary/10"
                } ${selectedAnswer !== null ? "cursor-not-allowed" : ""}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveQuiz;