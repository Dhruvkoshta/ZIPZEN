import { File, FileText, ImageIcon } from "lucide-react";

export interface File {
  id: number;
  name: string;
  type: 'file';
  url: string;
  parent: number;
  size: number; // size in bytes
}	

export type Folder = {
  id: number;
  name: string;
  type: "folder";
  parent: number | null;
}

export const mockFolders: Folder[] = [
  {
    id: 0,
    name: "Drive",
    type: "folder",
    parent: null,
  },
  {
    id: 1,
    name: "Documents",
    type: "folder",
    parent: 0,
  },
  {
    id: 2,
    name: "Images",
    type: "folder",
    parent: 0,
  },
  {
    id: 3,
    name: "Work Documents",
    type: "folder",
    parent: 1,
  },
  {
    id: 4,
    name: "Personal Files",
    type: "folder",
    parent: 1,
  },
  {
    id: 5,
    name: "Vacation Photos",
    type: "folder",
    parent: 2,
  }
]

export const mockFiles: File[] = [
  {
    id: 1,
    name: "Project Report.pdf",
    type: "file",
    url: "/files/report.pdf",
    parent: 3,
    size: 2 * 1024 * 1024, // 2.5MB
  },
  {
    id: 2,
    name: "Meeting Notes.txt",
    type: "file",
    url: "/files/notes.txt",
    parent: 3,
    size: 45 * 1024, // 45KB
  },
  {
    id: 3,
    name: "Beach Photo.jpg",
    type: "file",
    url: "/files/beach.jpg",
    parent: 5,
    size: 3 * 1024 * 1024, // 3.2MB
  },
  {
    id: 4,
    name: "Resume.pdf",
    type: "file",
    url: "/files/resume.pdf",
    parent: 4,
    size: 1 * 1024 * 1024, // 1.8MB
  },
  {
    id: 5,
    name: "Welcome Guide.pdf",
    type: "file",
    url: "/files/welcome.pdf",
    parent: 0,
    size: 1 * 1024 * 1024, // 1.1MB
  }
]

// Helper function to format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

// Helper function to get file icon based on type
export const getFileIcon = (type: string) => {
  switch (type) {
	case "pdf":
	  return <FileText className="h-16 w-16 text-red-500" />;
	case "image":
	  return <ImageIcon className="h-16 w-16 text-green-500" />;
	default:
	  return <File className="h-16 w-16 text-gray-500" />;
  }
}