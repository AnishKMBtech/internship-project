const mockLeaderboard = [
  { id: 1, name: "John Doe", points: 2500, rank: 1, avatar: "JD" },
  { id: 2, name: "Jane Smith", points: 2350, rank: 2, avatar: "JS" },
  { id: 3, name: "Mike Johnson", points: 2200, rank: 3, avatar: "MJ" },
  { id: 4, name: "Sarah Wilson", points: 2100, rank: 4, avatar: "SW" },
  { id: 5, name: "David Brown", points: 2000, rank: 5, avatar: "DB" },
];

const Leaderboard = () => {
  return (
    <div className="container mx-auto px-4 pt-24 pb-8 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
          Leaderboard
        </h1>

        <div className="space-y-4">
          {mockLeaderboard.map((user) => (
            <div
              key={user.id}
              className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-md p-6 flex items-center ${
                user.rank <= 3 ? "border-l-4" : ""
              } ${
                user.rank === 1
                  ? "border-yellow-400"
                  : user.rank === 2
                  ? "border-gray-400"
                  : user.rank === 3
                  ? "border-orange-400"
                  : ""
              }`}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold mr-4">
                {user.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.points} points</p>
              </div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  user.rank === 1
                    ? "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400"
                    : user.rank === 2
                    ? "bg-gray-100 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400"
                    : user.rank === 3
                    ? "bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400"
                    : "bg-white/50 dark:bg-gray-800/50 text-muted-foreground"
                }`}
              >
                {user.rank}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;