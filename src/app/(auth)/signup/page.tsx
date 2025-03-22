"use client";

import { SignUp } from "@/components/ui/Signup";

export default function SignupPage() {
	return (
		<div className='min-h-screen w-full flex items-center justify-center bg-black'>
			<div className='w-full max-w-md p-8'>
				<SignUp />
			</div>
		</div>
	);
}
