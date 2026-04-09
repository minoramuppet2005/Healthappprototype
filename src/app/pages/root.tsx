import { Outlet } from "react-router";
import { IPhoneFrame } from "../components/iphone-frame";

export function Root() {
  return (
    <IPhoneFrame>
      <div className="min-h-screen bg-background">
        <Outlet />
      </div>
    </IPhoneFrame>
  );
}