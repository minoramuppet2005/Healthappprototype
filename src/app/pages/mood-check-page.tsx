import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Smile, Meh, Frown, Angry, Laugh } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";

const moods = [
  { id: 1, emoji: Laugh, label: "Great", color: "bg-green-500", message: "Amazing! Keep up the positive energy!" },
  { id: 2, emoji: Smile, label: "Good", color: "bg-blue-500", message: "Wonderful! You're doing great today." },
  { id: 3, emoji: Meh, label: "Okay", color: "bg-yellow-500", message: "That's okay. Some days are just like that." },
  { id: 4, emoji: Frown, label: "Sad", color: "bg-orange-500", message: "It's okay to feel this way. Consider talking to someone or trying a calming activity." },
  { id: 5, emoji: Angry, label: "Stressed", color: "bg-red-500", message: "Take a deep breath. You've got this. Consider some grounding exercises." },
];

export function MoodCheckPage() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (selectedMood !== null) {
      setShowResponse(true);
    }
  };

  const selectedMoodData = moods.find(m => m.id === selectedMood);

  if (showResponse && selectedMoodData) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-background px-4 pt-16 pb-4">
        <Button 
          onClick={() => navigate("/")} 
          variant="outline"
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Button>

        <Card className="p-6 mb-4 bg-white text-center">
          <div className={`w-20 h-20 ${selectedMoodData.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
            <selectedMoodData.emoji className="w-10 h-10 text-white" />
          </div>
          <h2 className="mb-3 text-lg">Thank you for sharing!</h2>
          <p className="mb-4">{selectedMoodData.message}</p>
          {note && (
            <div className="bg-muted p-3 rounded-lg mb-3 text-left">
              <p className="text-sm font-medium mb-1">Your note:</p>
              <p className="text-sm text-muted-foreground">{note}</p>
            </div>
          )}
        </Card>

        <div className="space-y-2">
          <h3 className="mb-2 text-base">Suggested Activities:</h3>
          {selectedMood && selectedMood <= 2 ? (
            <>
              <Card className="p-3 bg-white">
                <p className="text-sm">✨ Share your positivity with a friend</p>
              </Card>
              <Card className="p-3 bg-white">
                <p className="text-sm">📝 Journal about what made you happy</p>
              </Card>
              <Card className="p-3 bg-white">
                <p className="text-sm">🎵 Listen to your favorite uplifting music</p>
              </Card>
            </>
          ) : (
            <>
              <Card className="p-3 bg-white">
                <p className="text-sm">🧘 Try a 5-minute breathing exercise</p>
              </Card>
              <Card className="p-3 bg-white">
                <p className="text-sm">🚶 Take a short walk outside</p>
              </Card>
              <Card className="p-3 bg-white">
                <p className="text-sm">💬 Talk to someone you trust</p>
              </Card>
            </>
          )}
        </div>

        <Button className="w-full mt-4" onClick={() => navigate("/")}>
          Done
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background px-4 pt-16 pb-4">
      <Button 
        onClick={() => navigate("/")} 
        variant="outline"
        className="mb-4 flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </Button>

      <div className="mb-4">
        <h1 className="mb-1 text-xl">How are you feeling today?</h1>
        <p className="text-muted-foreground text-sm">Select the emotion that best describes your mood</p>
      </div>

      {/* Mood Selection */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {moods.map((mood) => {
          const Icon = mood.emoji;
          return (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={`p-4 rounded-2xl transition-all ${
                selectedMood === mood.id
                  ? `${mood.color} scale-105 shadow-lg`
                  : 'bg-white hover:scale-105'
              }`}
            >
              <Icon
                className={`w-10 h-10 mx-auto mb-1 ${
                  selectedMood === mood.id ? 'text-white' : 'text-gray-600'
                }`}
              />
              <p className={`text-xs ${selectedMood === mood.id ? 'text-white font-medium' : 'text-gray-600'}`}>
                {mood.label}
              </p>
            </button>
          );
        })}
      </div>

      {/* Optional Note */}
      {selectedMood !== null && (
        <Card className="p-4 mb-4 bg-white">
          <label className="block mb-2 text-sm">Why do you feel this way? (Optional)</label>
          <Textarea
            placeholder="Share what's on your mind..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-20 text-sm"
          />
        </Card>
      )}

      <Button
        className="w-full"
        disabled={selectedMood === null}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
}