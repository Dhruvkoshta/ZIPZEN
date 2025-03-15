
import { handleSignIn, handleSignOut, } from "@/app/actions/auth"
import { Button } from "./button"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { useSession } from "next-auth/react"
import { LogOutIcon } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

export  function AuthComponent() {
  const {data:session} = useSession() 

  if (!session) {
    return (
      <form action={handleSignIn}>
        <Button type="submit">Sign in</Button>
      </form>
    )
  }

  return (
    <div className="flex items-center gap-4">
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Avatar>
            <AvatarImage src={session.user?.image ?? ''} alt={session.user?.name ?? ''} />
            <AvatarFallback>{session.user?.name?.[0] ?? '?'}</AvatarFallback>
        </Avatar>
        </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            <DropdownMenuItem><form action={handleSignOut}>
                <Button type="submit" variant="ghost"><LogOutIcon/> Sign out</Button>
            </form></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>                
      
    </div>
  )
}