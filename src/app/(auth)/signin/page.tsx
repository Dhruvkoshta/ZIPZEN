"use client";

import SignIn from "@/components/ui/Signin";

export default function SigninPage() {
	return (
		<div className='min-h-screen w-full flex items-center justify-center bg-black'>
			<div className='w-full max-w-md p-8'>
				<SignIn />
			</div>
		</div>
	);
}
