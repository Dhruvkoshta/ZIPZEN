
import { LogOutIcon } from "lucide-react"
import { Button } from "./button";
import { signOut } from "@/lib/auth-client";

export const Signout = () => {
  return (
    <Button variant="ghost" onClick={async () => {
        await signOut();
      }}>
        <LogOutIcon/> Sign out
    </Button>
  )
}
