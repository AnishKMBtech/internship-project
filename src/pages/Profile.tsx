import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Target, Clock } from "lucide-react";

const mockUserStats = {
  username: "QuizMaster",
  joinDate: "2024-01-15",
  avatarUrl: "/placeholder.svg",
  quizzesTaken: 15,
  averageScore: 75,
  totalPoints: 1250,
  achievements: [
    { id: 1, name: "Quick Learner", description: "Complete 5 quizzes", icon: Target },
    { id: 2, name: "High Scorer", description: "Score 80%+", icon: Trophy },
    { id: 3, name: "Perfect Round", description: "100% on a quiz", icon: Star },
  ],
  recentQuizzes: [
    { id: 1, title: "Science Quiz", score: 8, total: 10, date: "2024-02-20" },
    { id: 2, title: "History Challenge", score: 7, total: 10, date: "2024-02-18" },
    { id: 3, title: "Geography Test", score: 9, total: 10, date: "2024-02-15" },
  ],
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  });
};

const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={mockUserStats.avatarUrl} alt={mockUserStats.username} />
            <AvatarFallback>{mockUserStats.username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{mockUserStats.username}</CardTitle>
            <CardDescription>Joined on {formatDate(mockUserStats.joinDate)}</CardDescription>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
            <p className="text-3xl font-bold text-primary">{mockUserStats.quizzesTaken}</p>
            <p className="text-sm text-muted-foreground">Quizzes Taken</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
            <p className="text-3xl font-bold text-primary">{mockUserStats.averageScore}%</p>
            <p className="text-sm text-muted-foreground">Average Score</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
            <p className="text-3xl font-bold text-primary">{mockUserStats.totalPoints}</p>
            <p className="text-sm text-muted-foreground">Total Points</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockUserStats.achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div key={achievement.id} className="flex flex-col items-center text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                <Icon className="h-10 w-10 text-yellow-500 mb-2" />
                <p className="font-semibold mb-1">{achievement.name}</p>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockUserStats.recentQuizzes.map((quiz) => {
            const percentage = Math.round((quiz.score / quiz.total) * 100);
            return (
              <div key={quiz.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg gap-2">
                <div className="flex-1">
                  <p className="font-semibold">{quiz.title}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                     <Clock className="h-3 w-3"/> {formatDate(quiz.date)}
                  </p>
                </div>
                <div className="w-full sm:w-auto flex items-center gap-4 mt-2 sm:mt-0">
                   <div className="w-full sm:w-32">
                     <Progress value={percentage} className="h-2" />
                   </div>
                   <Badge variant={percentage > 80 ? "default" : "secondary"} className="whitespace-nowrap">
                     {quiz.score}/{quiz.total} ({percentage}%)
                   </Badge>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;