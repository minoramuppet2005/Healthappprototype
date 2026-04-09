import { Link } from "react-router";
import { ArrowLeft, Phone, MessageSquare, Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

export function EmergencyHelpPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-destructive/10 px-4 pt-16 pb-4">
      <Link to="/">
        <Button variant="outline" className="mb-4 flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Button>
      </Link>

      <div className="mb-4 text-center">
        <div className="w-16 h-16 bg-destructive/20 rounded-full mx-auto mb-3 flex items-center justify-center">
          <Heart className="w-8 h-8 text-destructive" />
        </div>
        <h1 className="mb-2 text-xl">We're Here for You</h1>
        <p className="text-muted-foreground text-sm">
          You are not alone. Help is available 24/7.
        </p>
      </div>

      {/* Emergency Hotlines */}
      <Card className="p-4 mb-4 bg-white">
        <h2 className="mb-3 text-base">Immediate Help</h2>
        <div className="space-y-2">
          <Button
            className="w-full h-auto py-4 flex items-center justify-between text-sm"
            variant="destructive"
            onClick={() => window.open('tel:988', '_self')}
          >
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" />
              <div className="text-left">
                <p className="font-semibold">988 Suicide & Crisis Lifeline</p>
                <p className="text-xs opacity-90">Call or text 988</p>
              </div>
            </div>
          </Button>

          <Button
            className="w-full h-auto py-4 flex items-center justify-between text-sm"
            onClick={() => window.open('tel:911', '_self')}
          >
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" />
              <div className="text-left">
                <p className="font-semibold">Emergency Services</p>
                <p className="text-xs opacity-90">Call 911</p>
              </div>
            </div>
          </Button>

          <Button
            className="w-full h-auto py-4 flex items-center justify-between text-sm"
            variant="outline"
            onClick={() => window.open('sms:741741', '_self')}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5" />
              <div className="text-left">
                <p className="font-semibold">Crisis Text Line</p>
                <p className="text-xs">Text HOME to 741741</p>
              </div>
            </div>
          </Button>
        </div>
      </Card>

      {/* Additional Resources */}
      <Card className="p-4 mb-4 bg-white">
        <h3 className="mb-3 text-base">Additional Support</h3>
        <div className="space-y-2 text-sm">
          <div className="p-2 bg-muted rounded-lg">
            <p className="font-medium text-sm">SAMHSA National Helpline</p>
            <p className="text-muted-foreground text-xs">1-800-662-4357 (24/7)</p>
          </div>
          <div className="p-2 bg-muted rounded-lg">
            <p className="font-medium text-sm">Veterans Crisis Line</p>
            <p className="text-muted-foreground text-xs">1-800-273-8255 (Press 1)</p>
          </div>
          <div className="p-2 bg-muted rounded-lg">
            <p className="font-medium text-sm">Trevor Project (LGBTQ+)</p>
            <p className="text-muted-foreground text-xs">1-866-488-7386 • Text START to 678678</p>
          </div>
        </div>
      </Card>

      {/* Reassuring Message */}
      <Card className="p-4 bg-gradient-to-br from-secondary to-primary text-white text-center">
        <p className="italic text-sm">
          "Remember: This too shall pass. You are stronger than you know, and help is always available."
        </p>
      </Card>
    </div>
  );
}