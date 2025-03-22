import Image from "next/image";
import Link from "next/link";
import HomeImg from "../../public/q1kkivjb.png";
import contentImg from "../../public/image.png";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className='flex min-h-screen flex-col bg-black text-white'>
			{/* Header */}
			<header className='container mx-auto flex items-center justify-between px-4 py-4'>
				<Link href='/' className='flex items-center space-x-2'>
					<div className='flex h-10 w-10 items-center justify-center rounded-md bg-blue-500'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='h-6 w-6 text-white'
						>
							<path d='M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16' />
						</svg>
					</div>
					<span className='text-xl font-bold'>ZipZen</span>
				</Link>
				<div className='gap-2 flex items-center'>
					<Button>
						<Link href='/signin'>SignIn</Link>
					</Button>
					<Button variant='outline'>
						<Link href='/signup'>SignUp</Link>
					</Button>
				</div>
			</header>

			{/* Hero Section */}
			<main className='flex-1'>
				<section className='container mx-auto grid grid-cols-1 items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24'>
					<div className='space-y-8'>
						<div className='space-y-2'>
							<h1 className='text-7xl font-bold leading-tight tracking-tighter md:text-8xl'>
								Smart.
								<br />
								Fast.
								<br />
								Secure.
							</h1>
							<p className='text-2xl font-medium text-orange-500'>
								A modern cloud storage solution designed to
								<br />
								leverage the full power of any device.
							</p>
						</div>
						<Link
							href='#'
							className='inline-flex items-center justify-center rounded-full border border-white/20 bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10'
						>
							Now in Beta
						</Link>
					</div>
					<div className='relative h-[600px] w-full'>
						<Image
							src={HomeImg}
							alt='HomeImg'
							fill
							className='object-contain'
							priority
						/>
					</div>
				</section>

				{/* Features Section */}
				<section className='container mx-auto grid grid-cols-1 gap-8 px-4 py-16 md:grid-cols-2 md:py-24'>
					<div className='relative overflow-hidden rounded-3xl bg-orange-500 p-8'>
						<div className='relative z-10 h-[400px]'>
							<Image
								src={contentImg}
								alt='Feature 1'
								fill
								className='object-contain rounded-2xl'
							/>
						</div>
						<div className='relative z-10 mt-8 space-y-4'>
							<h2 className='text-3xl font-bold'>Intelligent Organization</h2>
							<p className='text-lg'>
								Automatically categorize and organize your files with our smart
								AI-powered system.
							</p>
						</div>
					</div>
					<div className='relative overflow-hidden rounded-3xl bg-zinc-900 p-8'>
						<div className='relative z-10 h-[400px]'>
							<Image
								src={contentImg}
								alt='Feature 2'
								fill
								className='object-contain'
							/>
						</div>
						<div className='relative z-10 mt-8 space-y-4'>
							<h2 className='text-3xl font-bold'>Seamless Sharing</h2>
							<p className='text-lg'>
								Share files and folders with anyone, anywhere, with just a few
								clicks.
							</p>
						</div>
					</div>
				</section>

				{/* Testimonials Section */}
				<section className='container mx-auto px-4 py-16 md:py-24'>
					<div className='mx-auto max-w-3xl text-center'>
						<h2 className='text-4xl font-bold'>What people are saying</h2>
						<div className='mt-12 grid gap-8 md:grid-cols-2'>
							<div className='rounded-xl bg-zinc-900 p-6'>
								<p className='text-lg'>
									`ZipZen has completely transformed how I manage my files. The
									interface is intuitive and the speed is unmatched.`
								</p>
								<p className='mt-4 font-medium'>— Me, Designer</p>
							</div>
							<div className='rounded-xl bg-zinc-900 p-6'>
								<p className='text-lg'>
									`The security features give me peace of mind, and the
									cross-platform sync works flawlessly.`
								</p>
								<p className='mt-4 font-medium'>— Me, Developer</p>
							</div>
						</div>
					</div>
				</section>

				{/* CTA Section */}
				<section className='container mx-auto px-4 py-16 md:py-24'>
					<div className='rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-center'>
						<h2 className='text-4xl font-bold'>
							Ready to upgrade your storage?
						</h2>
						<p className='mt-4 text-xl'>
							Join thousands of users who have already made the switch.
						</p>
						<div className='mt-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
							<Link
								href='#'
								className='inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-lg font-medium text-blue-600 transition-colors hover:bg-white/90'
							>
								Get Started
							</Link>
							<Link
								href='#'
								className='inline-flex items-center justify-center rounded-full border border-white px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-white/10'
							>
								Learn More
							</Link>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className='container mx-auto px-4 py-8'>
				<div className='flex flex-col items-center justify-between space-y-4 border-t border-white/10 pt-8 md:flex-row md:space-y-0'>
					<div className='flex items-center space-x-2'>
						<div className='flex h-8 w-8 items-center justify-center rounded-md bg-blue-500'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='h-4 w-4 text-white'
							>
								<path d='M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16' />
							</svg>
						</div>
						<span className='text-sm font-medium'>ZipZen © 2024</span>
					</div>
					<div className='flex space-x-6'>
						<Link href='#' className='text-sm text-white/70 hover:text-white'>
							Privacy
						</Link>
						<Link href='#' className='text-sm text-white/70 hover:text-white'>
							Terms
						</Link>
						<Link href='#' className='text-sm text-white/70 hover:text-white'>
							Contact
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}
