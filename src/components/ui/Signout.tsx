
import { LogOutIcon } from "lucide-react"
import { Button } from "./button";
import { signOut } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export const Signout = () => {
  return (
    <Button variant="ghost" onClick={async () => {
        await signOut();
        redirect("/")
      }}>
        <LogOutIcon/> Sign out
    </Button>
  )
}
