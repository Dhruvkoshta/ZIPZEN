import { db } from "@/server/db"
import { files, folders } from "@/server/db/schema";
import { mockFiles,mockFolders } from "@/mockData"

const SandboxPage = () => {
  return (
    <div className="flex flex-col gap-4">
        SEED Function
        <form action={async () => {
            "use server";

            const folderInsert = await db.insert(folders).values(mockFolders)
            console.log(folderInsert)
            const fileInsert = await db.insert(files).values(mockFiles)
            console.log(fileInsert)

        }}>
            <button type="submit" className="bg-amber-500 p-10 text-white ">SEED</button>
        </form>

    </div>
  )
}
export default SandboxPage