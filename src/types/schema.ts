import type { files_table, folders_table } from "@/server/db/schema"
import { InferSelectModel } from "drizzle-orm"

export type FileType = InferSelectModel<typeof files_table>
export type FolderType = InferSelectModel<typeof folders_table>

export interface FolderWithChildren extends FolderType {
  isFolder: true;
  childCount: number;
}

export interface FileWithExtra extends FileType {
  isFolder: false;
}

export type DriveItem = FolderWithChildren | FileWithExtra
