import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const QuizDetails = () => {
  const { id } = useParams();

  // Mock quiz data
  const quiz = {
    id,
    title: "General Knowledge Quiz",
    description: "Test your knowledge across various topics!",
    questions: 10,
    timeLimit: "10 minutes",
    difficulty: "Medium",
    topics: ["Science", "History", "Geography"],
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-8 animate-fade-in">
      <div className="max-w-2xl mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
          {quiz.title}
        </h1>
        <p className="text-muted-foreground mb-6">{quiz.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Questions</p>
            <p className="text-lg font-semibold text-primary">{quiz.questions}</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Time Limit</p>
            <p className="text-lg font-semibold text-primary">{quiz.timeLimit}</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Difficulty</p>
            <p className="text-lg font-semibold text-primary">{quiz.difficulty}</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Topics</p>
            <p className="text-lg font-semibold text-primary">{quiz.topics.join(", ")}</p>
          </div>
        </div>
        
        <Link
          to={`/quiz/${id}/start`}
          className="block w-full bg-primary text-white text-center py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Start Quiz
        </Link>
      </div>
    </div>
  );
};

export default QuizDetails;