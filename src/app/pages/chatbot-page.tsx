import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Send, Bot, User } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

type Message = {
  id: number;
  text: string;
  sender: "bot" | "user";
  emoji?: string;
};

const initialQuestions = [
  { id: 1, question: "What brings you here today?", options: ["Feeling anxious", "Need support", "Just checking in", "Crisis situation"] },
  { id: 2, question: "How urgent is your situation?", options: ["Not urgent", "Somewhat urgent", "Very urgent", "Emergency"] },
  { id: 3, question: "Would you like to speak with a professional?", options: ["Yes, a therapist", "Yes, a counselor", "Not right now", "I need immediate help"] },
];

export function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I'm your AI Health Bot. I'm here to help connect you with the right support. 😊", sender: "bot", emoji: "👋" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(true);
  const [conversationComplete, setConversationComplete] = useState(false);

  const handleOptionClick = (option: string) => {
    // Add user response
    const userMessage: Message = {
      id: messages.length + 1,
      text: option,
      sender: "user",
    };
    setMessages([...messages, userMessage]);

    // Add bot response after a short delay
    setTimeout(() => {
      let botResponse = "";
      let emoji = "";

      if (currentQuestionIndex === 0) {
        botResponse = "I understand. Let me help you get the right support.";
        emoji = "💙";
      } else if (currentQuestionIndex === 1) {
        if (option === "Emergency") {
          botResponse = "Please call 988 or 911 immediately if you're in crisis. I can also connect you with emergency resources.";
          emoji = "🚨";
        } else {
          botResponse = "Thank you for sharing that with me.";
          emoji = "🤝";
        }
      } else if (currentQuestionIndex === 2) {
        if (option === "Yes, a therapist" || option === "Yes, a counselor") {
          botResponse = "Great! I'm connecting you with a licensed professional. They'll be with you shortly.";
          emoji = "✨";
          setConversationComplete(true);
        } else if (option === "I need immediate help") {
          botResponse = "I'm directing you to emergency resources right away.";
          emoji = "🚨";
          setConversationComplete(true);
        } else {
          botResponse = "That's okay. I'm here whenever you need me. Here are some resources you might find helpful.";
          emoji = "💚";
          setConversationComplete(true);
        }
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        emoji,
      };

      setMessages(prev => [...prev, botMessage]);

      // Move to next question or complete conversation
      if (currentQuestionIndex < initialQuestions.length - 1 && !conversationComplete) {
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setShowOptions(true);
        }, 1500);
      } else {
        setShowOptions(false);
      }
    }, 800);

    setShowOptions(false);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: "user",
      };
      setMessages([...messages, userMessage]);
      setInputValue("");

      // Bot responds
      setTimeout(() => {
        const botMessage: Message = {
          id: messages.length + 2,
          text: "Thank you for sharing. A professional will review your message and respond shortly.",
          sender: "bot",
          emoji: "💬",
        };
        setMessages(prev => [...prev, botMessage]);
      }, 800);
    }
  };

  const currentQuestion = initialQuestions[currentQuestionIndex];

  return (
    <div className="max-w-md mx-auto h-screen bg-background flex flex-col pt-16">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <Link to="/">
          <Button variant="outline" className="mb-4 flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg">AI Health Bot</h1>
            <p className="text-xs text-muted-foreground">Online • Ready to help</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-3 overflow-y-auto space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === "bot" ? "bg-secondary" : "bg-primary"
              }`}>
                {message.sender === "bot" ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>
              <Card className={`p-2.5 ${
                message.sender === "bot" ? "bg-white" : "bg-primary text-primary-foreground"
              }`}>
                {message.emoji && <span className="text-lg mr-1">{message.emoji}</span>}
                <p className="text-xs">{message.text}</p>
              </Card>
            </div>
          </div>
        ))}

        {/* Question Options */}
        {showOptions && currentQuestion && (
          <div className="space-y-2">
            <Card className="p-2.5 bg-white border-2 border-secondary">
              <p className="text-xs font-medium">{currentQuestion.question}</p>
            </Card>
            <div className="grid grid-cols-2 gap-2">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto py-2 text-xs"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        )}

        {conversationComplete && (
          <Card className="p-3 bg-gradient-to-br from-secondary to-primary text-white text-center">
            <p className="text-xs">
              ✨ You're taking great steps toward getting help. We're proud of you!
            </p>
          </Card>
        )}
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 bg-white border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 text-sm"
          />
          <Button onClick={handleSendMessage} size="icon" className="h-9 w-9">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}