"use client"

import React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Folder,
  FolderPlus,
  Grid,
  List,
  MoreVertical,
  Upload,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

import { useTheme } from "next-themes"
import { getFileIcon, formatFileSize } from "../mockData"
import { Sidebar } from "@/components/ui/Sidebar"
import { Header } from "@/components/ui/Header"
import { BreadcrumbComponent } from "@/components/ui/breadcrumb"
import { FileType, FolderType } from "@/types/schema"
import { usePathname,  } from "next/navigation"

interface DriveUIProps {
  files: FileType[];
  folders: FolderType[];
  parents: FolderType[]; 
}

export default function DriveUI({ files, folders, parents }: DriveUIProps) {
  const pathname = usePathname()
  const folderId = pathname.split('/').pop() || '0'
  const currentFolder = Number(folderId)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Set dark mode as default when component mounts
  useEffect(() => {
    setMounted(true)
  }, [setTheme])

  // Get current folder data
  const folder = folders.find(f => Number(f.id) === currentFolder)

  // Get current folder contents including parent info
  const getFolderContents = React.useMemo(() => {
    const currentFiles = files.filter(file => Number(file.parent) === currentFolder)
    const currentFolders = folders.filter(folder => Number(folder.parent) === currentFolder)
    
    return [
      ...currentFolders.map(folder => ({
        ...folder,
        isFolder: true as const,
        childCount: folders.filter(f => Number(f.parent) === Number(folder.id)).length +
                   files.filter(f => Number(f.parent) === Number(folder.id)).length
      })),
      ...currentFiles.map(file => ({ ...file, isFolder: false as const }))
    ]
  }, [files, folders, currentFolder])

  // Handle mock upload
  const handleUpload = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return 0
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setUploadProgress(null), 1000)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  // Don't render theme-dependent UI until mounted to prevent hydration mismatch
  if (!mounted) return null

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <Header sidebarCollapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} theme={theme || "light"} toggleTheme={toggleTheme} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarCollapsed={sidebarCollapsed} />

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          <BreadcrumbComponent 
            pathArray={parents.map(folder => folder.id)} 
            mockData={Object.fromEntries([
              [0, { name: "My Drive" }],
              ...parents.map(folder => [folder.id, { name: folder.name }])
            ])}
          />

          {/* Actions */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{folder?.name?.toString()}</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-muted" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-muted" : ""}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleUpload}>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
              <Button variant="outline" size="sm">
                <FolderPlus className="mr-2 h-4 w-4" />
                New Folder
              </Button>
            </div>
          </div>

          {/* Upload progress */}
          {uploadProgress !== null && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm">
                <span>Uploading file...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2 mt-1" />
            </div>
          )}

          {/* Files and folders */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {getFolderContents.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  {item.isFolder ? (
                    <Link
                      className="flex h-40 cursor-pointer flex-col items-center justify-center p-4 hover:bg-muted"
                      href={`/f/${item.id}`}
                    >
                      <Folder className="h-16 w-16 text-blue-500" />
                      <div className="mt-2 text-center font-medium">{String(item.name)}</div>
                    </Link>
                  ) : (
                    <Link href={item.url} className="block">
                      <div className="flex h-40 flex-col items-center justify-center p-4 hover:bg-muted">
                        {getFileIcon()}
                        <div className="mt-2 text-center font-medium">{item.name}</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {formatFileSize(item.size)}
                        </div>
                      </div>
                    </Link>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border">
              <div className="grid grid-cols-12 gap-2 p-3 font-medium text-muted-foreground">
                <div className="col-span-6">Name</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-3">Type</div>
                <div className="col-span-1"></div>
              </div>
              <Separator />
              {getFolderContents.map((item) => (
                <div key={item.id} className="grid grid-cols-12 items-center gap-2 p-3 hover:bg-muted">
                  <div className="col-span-6">
                    {item.isFolder ? (
                      <Link
                        className="flex cursor-pointer items-center gap-2"
                        href={`/f/${item.id}`}
                      >
                        <Folder className="h-5 w-5 text-blue-500" />
                        <span>{item.name}</span>
                      </Link>
                    ) : (
                      <Link href={item.url} className="flex items-center gap-2">
                        {getFileIcon()}
                        <span>{item.name}</span>
                      </Link>
                    )}
                  </div>
                  <div className="col-span-2 text-sm text-muted-foreground">
                    {!item.isFolder && 'size' in item && formatFileSize(item.size)}
                  </div>
                  <div className="col-span-3 text-sm text-muted-foreground">{!item.isFolder }</div>
                  <div className="col-span-1 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem>Move</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

