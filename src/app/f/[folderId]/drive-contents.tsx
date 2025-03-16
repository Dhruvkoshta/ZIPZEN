"use client"
import React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  File,
  Folder,
  FolderPlus,

  MoreVertical,
  
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Separator } from "@/components/ui/separator"

import { useTheme } from "next-themes"
import { formatFileSize } from "@/mockData"
import { Sidebar } from "@/components/ui/Sidebar"
import { Header } from "@/components/ui/Header"
import { BreadcrumbComponent } from "@/components/ui/breadcrumb"
import { FileType, FolderType } from "@/types/schema"
import { usePathname, useRouter,  } from "next/navigation"
import { UploadButton } from "@/components/uploadthing"

interface DriveUIProps {
  files: FileType[];
  folders: FolderType[];
  parents: FolderType[]; 
  currentFolderId:number
}

export default function DriveUI({ files, folders, parents }: DriveUIProps) {
  const pathname = usePathname()
  const folderId = pathname.split('/').pop() || '0'
  const currentFolder = Number(folderId)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
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



  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const navigate = useRouter()

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
             
              <UploadButton endpoint="imageUploader"
              onClientUploadComplete={(res)=> {
                console.log("Upload complete",res)
                navigate.refresh()
              }}
              input={
                {folderId:currentFolder}
              }
              />
              
              <Button variant="outline" size="sm">
                <FolderPlus className="mr-2 h-4 w-4" />
                New Folder
              </Button>
            </div>
          </div>


          {/* Files and folders */}
          
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
                       <File className="h-5 w-5 text-gray-500" />
                        <span>{item.name.substring(0, 20) + '...' }</span>
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
          
        </main>
      </div>
    </div>
  )
}

