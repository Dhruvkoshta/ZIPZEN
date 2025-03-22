import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { FolderPlus } from "lucide-react"

interface CreateFolderDialogProps {
  onSubmit: (name: string) => void
}

export function CreateFolderDialog({ onSubmit }: CreateFolderDialogProps) {
  const [folderName, setFolderName] = useState("")
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FolderPlus className="mr-2 h-4 w-4" />
          New Folder
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={() => {
            onSubmit(folderName)
            setFolderName("")
            setOpen(false)
          }}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
