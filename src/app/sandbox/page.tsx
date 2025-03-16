
import { db } from "@/server/db"
import { files_table, folders_table } from "@/server/db/schema";
import { mockFiles,mockFolders } from "@/mockData"
import { headers } from "next/headers";
import { auth } from "@/auth";

const SandboxPage = () => {
  
  

  return (
    <div className="flex flex-col gap-4">
        SEED Function
        <form action={async () => {
            "use server";

          const session = await auth.api.getSession({
              headers: await headers() // you need to pass the headers object.
          })
          if(!session){
            throw new Error("Unauthorized")
          }
          const rootFolder = await db.insert(folders_table).values({
            name: "Drive",
            parent: null,
            ownerId: session.user.id
          }).returning({insertedId: folders_table.id})

            const insertFolder = mockFolders.map((folder) => ({
                name: folder.name,
                parent: rootFolder[0]!.insertedId,

                ownerId: session.user.id
            }))
            
            await db.insert(folders_table).values(insertFolder)

           


        }}>
            <button type="submit" className="bg-amber-500 p-10 text-white ">SEED</button>
        </form>

    </div>
  )
}
export default SandboxPage