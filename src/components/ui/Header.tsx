import { ChevronLeft, ChevronRight, Moon, Settings, Sun } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { Signout } from "./Signout";

interface HeaderProps {
	sidebarCollapsed: boolean;
	toggleSidebar: () => void;
	theme: string;
	toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
	sidebarCollapsed,
	toggleSidebar,
	theme,
	toggleTheme,
}) => {
	const { data: session } = authClient.useSession();

	return (
		<header className='flex h-16 items-center border-b px-4'>
			<div className='flex items-center gap-2'>
				<Button
					variant='ghost'
					size='icon'
					className='rounded-full'
					onClick={toggleSidebar}
				>
					{sidebarCollapsed ? (
						<ChevronRight className='h-5 w-5' />
					) : (
						<ChevronLeft className='h-5 w-5' />
					)}
				</Button>
				<h1 className='text-xl font-bold'>Drive</h1>
			</div>
			<div className='mx-4 flex-1'>
				<Input placeholder='Search in Drive' className='max-w-lg' />
			</div>
			<div className='flex items-center gap-2'>
				<Button
					variant='ghost'
					size='icon'
					className='rounded-full'
					onClick={toggleTheme}
				>
					{theme === "dark" ? (
						<Sun className='h-5 w-5' />
					) : (
						<Moon className='h-5 w-5' />
					)}
				</Button>
				<Button variant='ghost' size='icon' className='rounded-full'>
					<Settings className='h-5 w-5' />
				</Button>
				<div className='flex items-center gap-4'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Avatar>
								<AvatarImage
									src={session?.user?.image ?? ""}
									alt={session?.user?.name ?? ""}
								/>
								<AvatarFallback>
									{session?.user?.name?.[0] ?? "?"}
								</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuItem>
								<Signout />
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
};
