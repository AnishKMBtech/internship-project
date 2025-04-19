import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  { id: 1, name: "Science", quizCount: 15, icon: "🔬" },
  { id: 2, name: "History", quizCount: 12, icon: "📚" },
  { id: 3, name: "Geography", quizCount: 10, icon: "🌍" },
  { id: 4, name: "Mathematics", quizCount: 8, icon: "🔢" },
  { id: 5, name: "Literature", quizCount: 14, icon: "📖" },
  { id: 6, name: "Technology", quizCount: 11, icon: "💻" },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 pt-24 pb-8 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
          Quiz Categories
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="group hover:shadow-lg transition-all duration-300 backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 border-none"
              onClick={() => navigate(`/quiz/${category.id}`)}
            >
              <CardHeader className="space-y-1">
                <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-primary">
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {category.quizCount} {category.quizCount === 1 ? 'quiz' : 'quizzes'} available
                </p>
                <Button 
                  variant="ghost" 
                  className="mt-4 w-full group-hover:bg-primary group-hover:text-white transition-colors"
                >
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;