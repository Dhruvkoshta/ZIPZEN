"use server"
import DriveUI from "./drive-contents"
import { QUERIES } from "@/server/db/queries"



export default async function DriveClone(props:{
    params: Promise<{folderId: string}>
}) {
    const params = await props.params;
    const parsedFolderId = parseInt(params.folderId)

    if(isNaN(parsedFolderId)) {
        return <div>Invalid Folder Id</div>
    }


    const [files,folders,parents] = await Promise.all([
        QUERIES.getFiles(parsedFolderId),
        QUERIES.getFolders(parsedFolderId),
        QUERIES.getAllParentsForFolders(parsedFolderId),
        QUERIES.getFolderById(parsedFolderId)
    ])

  return (
    <DriveUI files={files} folders={folders} parents={parents} currentFolderId={parsedFolderId} />
  )
}
