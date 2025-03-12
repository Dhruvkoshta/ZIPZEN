import type { files, folders } from "@/server/db/schema"
import { InferSelectModel } from "drizzle-orm"

export type FileType = InferSelectModel<typeof files>
export type FolderType = InferSelectModel<typeof folders>

export interface FolderWithChildren extends FolderType {
  isFolder: true;
  childCount: number;
}

export interface FileWithExtra extends FileType {
  isFolder: false;
}

export type DriveItem = FolderWithChildren | FileWithExtra
