import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import {auth} from "@/auth"
import { MUTATIONS, QUERIES } from "@/server/db/queries";
import { headers } from "next/headers";
import { z } from "zod";

const f = createUploadthing();



// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    blob: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "1GB",
      maxFileCount: 9999,
    },
  })
  .input(z.object({
    folderId:z.number()
  }))
    // Set permissions and file types for this FileRoute
    .middleware(async ({input}) => {
      // This code runs on your server before upload
      const user = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      const folder = await QUERIES.getFolderById(input.folderId)

      if(!folder) throw new UploadThingError("Folder not found")

      if(folder.ownerId !== user.user.id) throw new UploadThingError("Unauthorized")
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.user.id, parentId: folder.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
     

      if (!metadata.userId) throw new Error("User ID is required");
      
      await MUTATIONS.createFile({
        file: {
            name: file.name,
            size: file.size,
            url: file.ufsUrl,
            parent: metadata.parentId
            },
        userId: metadata.userId,
        })

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
