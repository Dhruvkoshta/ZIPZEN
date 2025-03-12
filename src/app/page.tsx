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
// Mock data for files and folders
// Mock file data
import { mockFiles, mockFolders, getFileIcon, formatFileSize } from "../mockData"
import { Sidebar } from "@/components/ui/Sidebar"
import { Header } from "@/components/ui/Header"
import { BreadcrumbComponent } from "@/components/ui/breadcrumb"

// Helper function to get full path
const buildPathArray = (currentFolderId: number): number[] => {
  const paths: number[] = [];
  let currentFolder = mockFolders.find(f => f.id === currentFolderId);
  
  while (currentFolder) {
    paths.unshift(currentFolder.id);
    currentFolder = currentFolder?.parent !== null ? 
      mockFolders.find(f => f.id === currentFolder?.parent) : 
      undefined;
  }
  
  return paths;
}

export default function DriveUI() {
  const [currentFolder, setCurrentFolder] = useState(0) // Start with root folder (id: 0)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Set dark mode as default when component mounts
  useEffect(() => {
    setTheme("dark")
    setMounted(true)
  }, [setTheme])

  // Get current folder data
  const folder = mockFolders.find(f => f.id === currentFolder)

  // Get current folder contents including parent info
  const getFolderContents = () => {
    const files = mockFiles.filter(file => file.parent === currentFolder)
    const folders = mockFolders.filter(folder => folder.parent === currentFolder)
    
    return [
      ...folders.map(folder => ({
        ...folder,
        isFolder: true,
        childCount: mockFolders.filter(f => f.parent === folder.id).length +
                   mockFiles.filter(f => f.parent === folder.id).length
      })),
      ...files.map(file => ({ ...file, isFolder: false }))
    ]
  }

  const folderContents = getFolderContents()

  // Handle folder click
  const handleFolderClick = (folderId: number) => {
    setCurrentFolder(folderId)
  }

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
        <Sidebar sidebarCollapsed={sidebarCollapsed} handleFolderClick={handleFolderClick} />

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Breadcrumbs */}
          <BreadcrumbComponent pathArray={buildPathArray(currentFolder)} mockData={Object.fromEntries(mockFolders.map(folder => [folder.id, { name: folder.name }]))} handleFolderClick={handleFolderClick} />

          {/* Actions */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{folder?.name}</h2>
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
              {folderContents.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  {item.isFolder ? (
                    <div
                      className="flex h-40 cursor-pointer flex-col items-center justify-center p-4 hover:bg-muted"
                      onClick={() => handleFolderClick(item.id)}
                    >
                      <Folder className="h-16 w-16 text-blue-500" />
                      <div className="mt-2 text-center font-medium">{item.name}</div>
                    </div>
                  ) : (
                    <Link href={item.url} className="block">
                      <div className="flex h-40 flex-col items-center justify-center p-4 hover:bg-muted">
                        {getFileIcon(item.type)}
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
              {folderContents.map((item) => (
                <div key={item.id} className="grid grid-cols-12 items-center gap-2 p-3 hover:bg-muted">
                  <div className="col-span-6">
                    {item.isFolder ? (
                      <div
                        className="flex cursor-pointer items-center gap-2"
                        onClick={() => handleFolderClick(item.id)}
                      >
                        <Folder className="h-5 w-5 text-blue-500" />
                        <span>{item.name}</span>
                      </div>
                    ) : (
                      <Link href={item.url} className="flex items-center gap-2">
                        {getFileIcon(item.type)}
                        <span>{item.name}</span>
                      </Link>
                    )}
                  </div>
                  <div className="col-span-2 text-sm text-muted-foreground">
                    {!item.isFolder && 'size' in item && formatFileSize(item.size)}
                  </div>
                  <div className="col-span-3 text-sm text-muted-foreground">{!item.isFolder && item.type}</div>
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

