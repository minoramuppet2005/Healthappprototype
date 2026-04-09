import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/home-page";
import { MoodCheckPage } from "./pages/mood-check-page";
import { EmergencyHelpPage } from "./pages/emergency-help-page";
import { ChatbotPage } from "./pages/chatbot-page";
import { ProgressPage } from "./pages/progress-page";
import { Root } from "./pages/root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "mood-check", Component: MoodCheckPage },
      { path: "emergency", Component: EmergencyHelpPage },
      { path: "chat", Component: ChatbotPage },
      { path: "progress", Component: ProgressPage },
    ],
  },
]);
