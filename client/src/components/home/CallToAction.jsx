import React from 'react'
import { useNavigate } from 'react-router-dom'

const CallToAction = () => {
    const navigate = useNavigate()
    return (
        <div id='cta' className='border-y border-dashed border-slate-200 w-full max-w-5xl mx-auto px-4 sm:px-10 md:px-16 mt-20 sm:mt-28'>
            <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-6 px-4 md:px-10 border-x border-dashed border-slate-200 py-12 sm:py-20 -mt-10 -mb-10 w-full">
                <p className="text-lg sm:text-xl font-medium max-w-md text-slate-800">
                    Build a Professional Resume That Helps You Stand Out and Get Hired
                </p>
                <button
                    onClick={() => navigate('/login')}
                    className="flex items-center gap-2 rounded-lg py-3 px-8 bg-green-600 hover:bg-green-700 transition text-white font-medium whitespace-nowrap"
                >
                    <span>Get Started</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
            </div>
        </div>
    )
}

export default CallToAction
