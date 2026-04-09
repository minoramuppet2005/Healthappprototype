import { Link } from "react-router";
import { ArrowLeft, TrendingUp, Calendar, Smile, Meh, Frown } from "lucide-react";
import { Card } from "../components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "../components/ui/button";

// Mock data for mood tracking over time
const moodData = [
  { date: "Apr 3", mood: 4, label: "Thu" },
  { date: "Apr 4", mood: 3, label: "Fri" },
  { date: "Apr 5", mood: 5, label: "Sat" },
  { date: "Apr 6", mood: 4, label: "Sun" },
  { date: "Apr 7", mood: 2, label: "Mon" },
  { date: "Apr 8", mood: 3, label: "Tue" },
  { date: "Apr 9", mood: 4, label: "Wed" },
];

const recentMoods = [
  { date: "Apr 9, 2026", mood: "Good", color: "bg-blue-500", icon: Smile },
  { date: "Apr 8, 2026", mood: "Okay", color: "bg-yellow-500", icon: Meh },
  { date: "Apr 7, 2026", mood: "Sad", color: "bg-orange-500", icon: Frown },
  { date: "Apr 6, 2026", mood: "Good", color: "bg-blue-500", icon: Smile },
];

export function ProgressPage() {
  const averageMood = (moodData.reduce((sum, d) => sum + d.mood, 0) / moodData.length).toFixed(1);
  const trend = moodData[moodData.length - 1].mood > moodData[0].mood ? "improving" : "stable";

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background px-4 pt-16 pb-4">
      <Link to="/">
        <Button variant="outline" className="mb-4 flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Button>
      </Link>

      <div className="mb-4">
        <h1 className="mb-1 text-xl">Your Progress</h1>
        <p className="text-muted-foreground text-sm">Track your emotional journey over time</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Card className="p-3 bg-white">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-secondary" />
            <p className="text-xs text-muted-foreground">Trend</p>
          </div>
          <p className="text-xl font-semibold capitalize">{trend}</p>
        </Card>
        <Card className="p-3 bg-white">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-secondary" />
            <p className="text-xs text-muted-foreground">Avg. Mood</p>
          </div>
          <p className="text-xl font-semibold">{averageMood}/5</p>
        </Card>
      </div>

      {/* Mood Chart */}
      <Card className="p-4 mb-4 bg-white">
        <h3 className="mb-3 text-base">7-Day Mood Trend</h3>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={moodData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8F4F4" />
            <XAxis dataKey="label" stroke="#4A5568" fontSize={11} />
            <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} stroke="#4A5568" fontSize={11} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E8F4F4",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#4A9B9B"
              strokeWidth={2}
              dot={{ fill: "#4A9B9B", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>1 = Stressed</span>
          <span>5 = Great</span>
        </div>
      </Card>

      {/* Recent Check-ins */}
      <Card className="p-4 mb-4 bg-white">
        <h3 className="mb-3 text-base">Recent Check-ins</h3>
        <div className="space-y-2">
          {recentMoods.map((entry, index) => {
            const Icon = entry.icon;
            return (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-9 h-9 ${entry.color} rounded-full flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{entry.mood}</p>
                  <p className="text-xs text-muted-foreground">{entry.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Insights */}
      <Card className="p-4 bg-gradient-to-br from-secondary to-primary text-white">
        <h3 className="mb-2 text-base">Insight</h3>
        <p className="text-xs">
          {trend === "improving" 
            ? "Your mood has been trending upward! Keep up the great work with your daily check-ins and self-care activities."
            : "Your mood has been consistent this week. Remember that it's okay to have ups and downs. Keep checking in with yourself."}
        </p>
      </Card>
    </div>
  );
}