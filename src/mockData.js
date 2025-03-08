import { File, FileText, ImageIcon } from "lucide-react";

export const mockData = {
	root: {
		name: "My Drive",
		type: "folder",
		children: ["documents", "images", "projects", "file1.pdf", "file2.docx"],
	},
	documents: {
		name: "Documents",
		type: "folder",
		parent: "root",
		children: ["work", "personal", "resume.pdf", "notes.txt"],
	},
	work: {
		name: "Work",
		type: "folder",
		parent: "documents",
		children: ["presentation.pptx", "report.docx", "data.xlsx"],
	},
	personal: {
		name: "Personal",
		type: "folder",
		parent: "documents",
		children: ["budget.xlsx", "journal.docx"],
	},
	images: {
		name: "Images",
		type: "folder",
		parent: "root",
		children: ["vacation", "profile.jpg", "background.png"],
	},
	vacation: {
		name: "Vacation",
		type: "folder",
		parent: "images",
		children: ["beach.jpg", "mountain.jpg", "sunset.jpg"],
	},
	projects: {
		name: "Projects",
		type: "folder",
		parent: "root",
		children: ["website", "app", "project-plan.pdf"],
	},
	website: {
		name: "Website",
		type: "folder",
		parent: "projects",
		children: ["index.html", "styles.css", "script.js"],
	},
	app: {
		name: "App",
		type: "folder",
		parent: "projects",
		children: ["app.js", "readme.md", "config.json"],
	},
};

export const fileData = {
	"file1.pdf": {
		name: "file1.pdf",
		type: "pdf",
		size: "2.5 MB",
		modified: "May 15, 2023",
		parent: "root",
	},
	"file2.docx": {
		name: "file2.docx",
		type: "docx",
		size: "1.2 MB",
		modified: "Jun 3, 2023",
		parent: "root",
	},
	"resume.pdf": {
		name: "resume.pdf",
		type: "pdf",
		size: "1.8 MB",
		modified: "Apr 10, 2023",
		parent: "documents",
	},
	"notes.txt": {
		name: "notes.txt",
		type: "txt",
		size: "45 KB",
		modified: "Jul 22, 2023",
		parent: "documents",
	},
	"presentation.pptx": {
		name: "presentation.pptx",
		type: "pptx",
		size: "5.7 MB",
		modified: "Aug 1, 2023",
		parent: "work",
	},
	"report.docx": {
		name: "report.docx",
		type: "docx",
		size: "3.2 MB",
		modified: "Aug 5, 2023",
		parent: "work",
	},
	"data.xlsx": {
		name: "data.xlsx",
		type: "xlsx",
		size: "2.1 MB",
		modified: "Jul 30, 2023",
		parent: "work",
	},
	"budget.xlsx": {
		name: "budget.xlsx",
		type: "xlsx",
		size: "1.5 MB",
		modified: "Jun 15, 2023",
		parent: "personal",
	},
	"journal.docx": {
		name: "journal.docx",
		type: "docx",
		size: "4.3 MB",
		modified: "Aug 10, 2023",
		parent: "personal",
	},
	"profile.jpg": {
		name: "profile.jpg",
		type: "jpg",
		size: "3.5 MB",
		modified: "May 5, 2023",
		parent: "images",
	},
	"background.png": {
		name: "background.png",
		type: "png",
		size: "2.8 MB",
		modified: "Jun 20, 2023",
		parent: "images",
	},
	"beach.jpg": {
		name: "beach.jpg",
		type: "jpg",
		size: "4.2 MB",
		modified: "Jul 10, 2023",
		parent: "vacation",
	},
	"mountain.jpg": {
		name: "mountain.jpg",
		type: "jpg",
		size: "5.1 MB",
		modified: "Jul 12, 2023",
		parent: "vacation",
	},
	"sunset.jpg": {
		name: "sunset.jpg",
		type: "jpg",
		size: "3.7 MB",
		modified: "Jul 15, 2023",
		parent: "vacation",
	},
	"project-plan.pdf": {
		name: "project-plan.pdf",
		type: "pdf",
		size: "2.3 MB",
		modified: "Jun 5, 2023",
		parent: "projects",
	},
	"index.html": {
		name: "index.html",
		type: "html",
		size: "15 KB",
		modified: "Jul 25, 2023",
		parent: "website",
	},
	"styles.css": {
		name: "styles.css",
		type: "css",
		size: "8 KB",
		modified: "Jul 26, 2023",
		parent: "website",
	},
	"script.js": {
		name: "script.js",
		type: "js",
		size: "12 KB",
		modified: "Jul 27, 2023",
		parent: "website",
	},
	"app.js": {
		name: "app.js",
		type: "js",
		size: "45 KB",
		modified: "Aug 2, 2023",
		parent: "app",
	},
	"readme.md": {
		name: "readme.md",
		type: "md",
		size: "5 KB",
		modified: "Aug 3, 2023",
		parent: "app",
	},
	"config.json": {
		name: "config.json",
		type: "json",
		size: "3 KB",
		modified: "Aug 4, 2023",
		parent: "app",
	},
};

// Helper function to get file icon based on type

export const getFileIcon = (type) => {
	switch (type) {
		case "pdf":
			return <FileText className='h-6 w-6 text-red-500' />;
		case "docx":
			return <FileText className='h-6 w-6 text-blue-500' />;
		case "txt":
			return <FileText className='h-6 w-6 text-gray-500' />;
		case "pptx":
			return <FileText className='h-6 w-6 text-orange-500' />;
		case "xlsx":
			return <FileText className='h-6 w-6 text-green-500' />;
		case "jpg":
		case "png":
			return <ImageIcon className='h-6 w-6 text-purple-500' />;
		case "html":
		case "css":
		case "js":
		case "json":
		case "md":
			return <File className='h-6 w-6 text-yellow-500' />;
		default:
			return <File className='h-6 w-6' />;
	}
};
