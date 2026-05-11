import { login } from '@/lib/auth'

export default function SignInPage() {
    return (
        <div className='flex min-h-[calc(100vh-10rem)] items-center justify-center'>
            <div className='mx-4 w-full max-w-md overflow-hidden rounded-3xl border border-[#e7dfcf] bg-[#fffdf8] shadow-[0_12px_30px_rgba(51,65,85,0.08)]'>
                <div className='bg-linear-to-r from-[#0f766e] to-[#115e59] px-8 py-7 text-white'>
                    <p className='text-xs uppercase tracking-[0.18em] text-white/80'>Welcome back</p>
                    <h2 className='mt-2 text-3xl font-bold tracking-tight'>Sign in to Job Board</h2>
                    <p className='mt-2 text-sm text-white/80'>Post jobs, apply faster, and manage everything in one place.</p>
                </div>

                <div className='space-y-6 p-8'>
                    <form action={login}>
                        <button type='submit' className='flex w-full items-center justify-center gap-3 rounded-xl border border-[#d9ccb7] bg-white px-4 py-3 text-sm font-semibold text-[#1f2937] transition hover:border-[#c9b79c] hover:bg-[#faf5ec]'>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            fill="#111827"
                            className='h-5 w-5'
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z" />
                        </svg>
                        <span>Continue with GitHub</span>
                        </button>
                    </form>

                    <p className='text-center text-xs leading-relaxed text-[#6b7280]'>
                        By signing in, you agree to our <a href='/terms' className='font-medium text-[#0f766e] hover:text-[#115e59]'>Terms of Service</a> and <a href='/privacy' className='font-medium text-[#0f766e] hover:text-[#115e59]'>Privacy Policy</a>.
                    </p>
                </div>

            </div>
        </div>
    )
}
