import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ResumePreview from '../components/ResumePreview'
import Loader from '../components/Loader'
import api from '../configs/api'

const Preview = () => {
  const { resumeId } = useParams()
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/api/resumes/public/${resumeId}`)
      .then(({ data }) => setResume(data?.resume || null))
      .catch(() => setResume(null))
      .finally(() => setLoading(false))
  }, [resumeId])

  if (loading) return <Loader />

  if (!resume) return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <p className='text-4xl text-slate-300 font-medium'>Resume not found</p>
      <a href='/' className='text-sm bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors'>
        Go Home
      </a>
    </div>
  )

  return (
    <div className='bg-slate-100 min-h-screen py-10'>
      <div className='max-w-3xl mx-auto'>
        <ResumePreview data={resume} template={resume.template} accentColor={resume.accent_color} classes='bg-white' />
      </div>
    </div>
  )
}

export default Preview
