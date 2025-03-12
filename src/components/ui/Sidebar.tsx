import { Home, Plus, Star, Trash } from "lucide-react"
import { Button } from "./button"
import { Separator } from "./separator"
import { Progress } from "./progress"


interface SidebarProps {
    sidebarCollapsed: boolean;
    handleFolderClick: (folderId: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    sidebarCollapsed,
    handleFolderClick,
}) => {
  return (
    <aside className={`border-r transition-all duration-300 ${sidebarCollapsed ? "w-0 overflow-hidden" : "w-64"}`}>
          <div className="p-4">
            <div className="mb-6">
              <Button className="w-full justify-start gap-2 rounded-full">
                <Plus className="h-4 w-4" />
                New
              </Button>
            </div>

            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" onClick={() => handleFolderClick(0)}>
                <Home className="mr-2 h-4 w-4" />
                My Drive
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Star className="mr-2 h-4 w-4" />
                Starred
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Trash className="mr-2 h-4 w-4" />
                Trash
              </Button>
            </nav>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="text-sm font-medium">Storage</div>
              <Progress value={35} className="h-2" />
              <div className="text-xs text-muted-foreground">3.5 GB of 15 GB used</div>
            </div>
          </div>
        </aside>
  )
}
