import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { MUTATIONS, QUERIES } from "@/server/db/queries";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Drive(){    
    const session = await auth.api.getSession({
        headers: await headers() 
    })
    if(!session?.user.id){
        return redirect("/")
    }
    const rootFolder = await QUERIES.getRootFolderForUser(session.user.id)
    if(!rootFolder){
        return <form className="flex flex-col justify-center items-center" action={async () => {
            "use server";
            const rootFolderId = await MUTATIONS.OnBoardUser(session.user.id)
            return redirect(`/f/${rootFolderId}`)
        }}>
            <Button>
                Create Root Folder
            </Button>
        </form>
    }
  return redirect(`/f/${rootFolder.id}`)
}
