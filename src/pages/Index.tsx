import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const featuredQuizzes = [
  { id: 1, title: "General Knowledge", questions: 10, time: "10 min" },
  { id: 2, title: "Science Quiz", questions: 15, time: "15 min" },
  { id: 3, title: "History Challenge", questions: 12, time: "12 min" },
];

const Index = () => {
  const [pin, setPin] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogin = () => {
    if (pin === "1234") {
      localStorage.setItem("isLoggedIn", "true");
      toast({
        title: "Success",
        description: "Successfully logged in!",
        duration: 2000,
      });
      navigate("/categories");
    } else {
      toast({
        title: "Error",
        description: "Invalid PIN. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center animate-fade-in p-8">
        <div className="w-full max-w-md space-y-6 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Quiz Master</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Please enter PIN to continue
          </p>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="text-center text-2xl tracking-wider"
              maxLength={4}
            />
            <Button
              onClick={handleLogin}
              className="w-full"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] animate-fade-in p-8 pt-20">
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Quiz Master</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Test your knowledge with our exciting quizzes!
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Featured Quizzes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredQuizzes.map((quiz) => (
              <Link
                key={quiz.id}
                to={`/quiz/${quiz.id}`}
                className="block bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{quiz.questions} questions</span>
                  <span>{quiz.time}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="text-center">
          <Link
            to="/categories"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Explore All Categories
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Index;