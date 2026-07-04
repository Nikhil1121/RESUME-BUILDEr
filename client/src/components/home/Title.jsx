import React from 'react'

const Title = ({ title, description }) => {
    return (
        <div className='text-center mt-6 text-slate-700 px-4'>
            <h2 className='text-2xl sm:text-3xl md:text-4xl font-medium'>{title}</h2>
            <p className='max-w-2xl mx-auto mt-4 text-slate-500 text-sm sm:text-base'>{description}</p>
        </div>
    )
}

export default Title
