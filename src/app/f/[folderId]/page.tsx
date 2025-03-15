"use server"
import DriveUI from "../../drive-contents"
import { getAllParentsForFolders, getFiles, getFolders } from "@/server/db/queries"



export default async function DriveClone(props:{
    params: Promise<{folderId: string}>
}) {
    const params = await props.params;
    const parsedFolderId = parseInt(params.folderId)

    if(isNaN(parsedFolderId)) {
        return <div>Invalid Folder Id</div>
    }


    const [files,folders,parents] = await Promise.all([
        getFiles(parsedFolderId),
        getFolders(parsedFolderId),getAllParentsForFolders(parsedFolderId)
    ])

  return (
    <DriveUI files={files} folders={folders} parents={parents} />
  )
}
