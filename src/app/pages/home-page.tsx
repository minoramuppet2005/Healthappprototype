import { Link } from "react-router";
import { Heart, MessageCircle, AlertCircle, TrendingUp } from "lucide-react";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import { useState } from "react";
import safePathLogo from "figma:asset/81ade8e3a58f3d088818ad10cb90a3fded64fc3d.png";

export function HomePage() {
  const [tasks, setTasks] = useState([
    { id: 1, label: "Mood check", completed: false },
    { id: 2, label: "Drink water", completed: true },
    { id: 3, label: "Call family", completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const progressPercentage = (completedTasks / tasks.length) * 100;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background px-4 py-4 pt-16">
      {/* Welcome Message */}
      <div className="mb-4">
        <h1 className="mb-1 text-xl">Welcome back!</h1>
        <p className="text-muted-foreground text-sm">Here's your health overview for today</p>
      </div>

      {/* Progress Chart */}
      <Card className="p-4 mb-3 bg-white">
        <h3 className="mb-2 text-base">Your Progress</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Daily Goals</span>
            <span className="text-muted-foreground">{completedTasks}/{tasks.length} completed</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </Card>

      {/* Motivational Message */}
      <Card className="p-4 mb-3 bg-gradient-to-br from-secondary to-primary text-white">
        <p className="text-center italic text-sm">"You're doing great! Every step forward is progress."</p>
      </Card>

      {/* Today's Tasks Checklist */}
      <Card className="p-4 mb-3 bg-white">
        <h3 className="mb-3 text-base">Today's Tasks</h3>
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-3">
              <Checkbox
                id={`task-${task.id}`}
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <label
                htmlFor={`task-${task.id}`}
                className={`flex-1 cursor-pointer text-sm ${
                  task.completed ? 'line-through text-muted-foreground' : ''
                }`}
              >
                {task.label}
              </label>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="mb-4">
        <h3 className="mb-3 text-base">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/mood-check">
            <Button className="w-full h-20 flex flex-col gap-1 text-sm" variant="outline">
              <Heart className="w-5 h-5" />
              <span>Mood Check</span>
            </Button>
          </Link>
          <Link to="/chat">
            <Button className="w-full h-20 flex flex-col gap-1 text-sm" variant="outline">
              <MessageCircle className="w-5 h-5" />
              <span>Chat</span>
            </Button>
          </Link>
          <Link to="/emergency">
            <Button className="w-full h-20 flex flex-col gap-1 text-sm bg-destructive text-destructive-foreground hover:bg-destructive/90">
              <AlertCircle className="w-5 h-5" />
              <span>Help</span>
            </Button>
          </Link>
          <Link to="/progress">
            <Button className="w-full h-20 flex flex-col gap-1 text-sm" variant="outline">
              <TrendingUp className="w-5 h-5" />
              <span>Progress</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Logo at Bottom */}
      <div className="mt-6 mb-4 text-center">
        <img src={safePathLogo} alt="SafePath" className="h-12 mx-auto mb-1" />
      </div>
    </div>
  );
}