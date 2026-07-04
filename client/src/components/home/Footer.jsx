import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="flex flex-wrap justify-center lg:justify-between overflow-hidden gap-8 md:gap-16 py-12 px-5 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500 bg-gradient-to-r from-white via-green-200/60 to-white mt-28 sm:mt-40">
                <div className="flex flex-wrap items-start gap-8 md:gap-[60px] xl:gap-[100px] justify-center lg:justify-start w-full lg:w-auto">
                    <a href="/" className="w-full sm:w-auto flex justify-center sm:justify-start">
                        <img src="/logo.svg" alt="logo" className='h-9 sm:h-11 w-auto' />
                    </a>
                    <div>
                        <p className="text-slate-800 font-semibold">Product</p>
                        <ul className="mt-2 space-y-2">
                            <li><a href="/" className="hover:text-green-500 transition">Home</a></li>
                            <li><a href="/" className="hover:text-green-500 transition">Support</a></li>
                            <li><a href="/" className="hover:text-green-500 transition">Pricing</a></li>
                            <li><a href="/" className="hover:text-green-500 transition">Affiliate</a></li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-slate-800 font-semibold">Resources</p>
                        <ul className="mt-2 space-y-2">
                            <li><a href="/" className="hover:text-green-500 transition">Company</a></li>
                            <li><a href="/" className="hover:text-green-500 transition">Blogs</a></li>
                            <li><a href="/" className="hover:text-green-500 transition">Community</a></li>
                            <li><a href="/" className="hover:text-green-500 transition">About</a></li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-slate-800 font-semibold">Legal</p>
                        <ul className="mt-2 space-y-2">
                            <li><a href="/" className="hover:text-green-500 transition">Privacy</a></li>
                            <li><a href="/" className="hover:text-green-500 transition">Terms</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center lg:items-end gap-2 w-full lg:w-auto">
                    <p className="max-w-60 text-center lg:text-right">Making every candidate feel confident — no matter the role.</p>
                    <div className="flex items-center gap-4 mt-3">
                        <a href="https://www.linkedin.com/in/nikhil-shendre-523218381" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-green-500 transition">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
                            </svg>
                        </a>
                        <a href="https://x.com/" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-green-500 transition">
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-green-500 transition">
                                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>
                            </svg>
                        </a>
                    </div>
                    <p className="mt-3 text-center">© 2025 Resume Builder. All rights reserved.</p>
                </div>
            </footer>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                * { font-family: 'Poppins', sans-serif; }
            `}</style>
        </>
    )
}

export default Footer
