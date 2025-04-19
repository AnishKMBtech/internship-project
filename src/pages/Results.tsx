import { useLocation, Link } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const { score, total } = location.state || { score: 0, total: 0 };
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="container mx-auto px-4 pt-24 pb-8 animate-fade-in">
      <div className="max-w-md mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
          Quiz Complete!
        </h1>
        
        <div className="mb-8">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-primary">{percentage}%</span>
            </div>
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="60"
                fill="none"
                stroke="currentColor"
                className="text-muted/20"
                strokeWidth="8"
              />
              <circle
                cx="64"
                cy="64"
                r="60"
                fill="none"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="8"
                strokeDasharray={`${percentage * 3.77} 377`}
              />
            </svg>
          </div>
          <p className="text-muted-foreground">
            You scored {score} out of {total} questions correctly
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            to="/categories"
            className="block w-full bg-white/50 dark:bg-gray-800/50 text-primary border border-primary py-3 rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
          >
            Try Another Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Results;