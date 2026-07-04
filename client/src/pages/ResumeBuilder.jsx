import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, GraduationCap, Share2Icon, Sparkles, User } from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummary from '../components/ProfessionalSummary'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const EMPTY = {
  _id: '', title: '', template: 'classic', accent_color: '#3B82F6', public: false,
  personal_info: { image: '', full_name: '', profession: '', email: '', phone: '', location: '', linkedin: '', website: '' },
  professional_summary: '', experience: [], education: [], project: [], skills: [],
}

const sections = [
  { id: 'personal',   name: 'Personal',   icon: User },
  { id: 'summary',    name: 'Summary',    icon: FileText },
  { id: 'experience', name: 'Experience', icon: Briefcase },
  { id: 'project',    name: 'Projects',   icon: User },
  { id: 'education',  name: 'Education',  icon: GraduationCap },
  { id: 'skills',     name: 'Skills',     icon: Sparkles },
]

const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const { token } = useSelector(s => s.auth)
  const [resume, setResume] = useState(EMPTY)
  const [activeIdx, setActiveIdx] = useState(0)
  const [removeBg, setRemoveBg] = useState(false)
  const [saving, setSaving] = useState(false)

  // Load resume
  useEffect(() => {
    if (!token || !resumeId) return
    api.get(`/api/resumes/get/${resumeId}`, { headers: { Authorization: token } })
      .then(({ data }) => {
        if (data?.resume) {
          setResume({
            ...EMPTY, ...data.resume,
            personal_info: { ...EMPTY.personal_info, ...(data.resume.personal_info || {}) },
            experience: data.resume.experience || [],
            education:  data.resume.education  || [],
            project:    data.resume.project    || [],
            skills:     data.resume.skills     || [],
          })
        }
      })
      .catch(() => {}) // New resume — keep defaults
  }, [token, resumeId])

  const update = (key, val) => setResume(p => ({ ...p, [key]: val }))

  // Save
  const saveResume = async () => {
    try {
      setSaving(true)
      const { _id, ...rest } = resume
      const imageFile = rest.personal_info?.image instanceof File ? rest.personal_info.image : null

      const fd = new FormData()
      fd.append('resumeId', _id || resumeId)
      fd.append('resumeData', JSON.stringify({
        ...rest,
        personal_info: { ...rest.personal_info, image: imageFile ? '' : (rest.personal_info?.image || '') }
      }))
      fd.append('removeBackground', removeBg ? 'true' : 'false')
      if (imageFile) fd.append('image', imageFile)

      const { data } = await api.put('/api/resumes/update', fd, {
        headers: { Authorization: token, 'Content-Type': 'multipart/form-data' }
      })

      if (data?.resume) {
        setResume(p => ({
          ...p, ...data.resume,
          personal_info: { ...p.personal_info, ...data.resume.personal_info },
        }))
      }
      toast.success('Saved!')
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message)
    } finally { setSaving(false) }
  }

  // Visibility toggle
  const toggleVisibility = async () => {
    const newPublic = !resume.public
    try {
      const fd = new FormData()
      fd.append('resumeId', resume._id || resumeId)
      fd.append('resumeData', JSON.stringify({ public: newPublic }))
      await api.put('/api/resumes/update', fd, {
        headers: { Authorization: token, 'Content-Type': 'multipart/form-data' }
      })
      update('public', newPublic)
      toast.success(newPublic ? 'Now Public' : 'Now Private')
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message)
    }
  }

  const handleShare = () => {
    const url = `${window.location.origin}/view/${resume._id || resumeId}`
    navigator.clipboard?.writeText(url).then(() => toast.success('Link copied!'))
  }

  const activeSection = sections[activeIdx]

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-4'>
        <Link to='/app' className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 text-sm transition-all'>
          <ArrowLeftIcon className='size-4' /> Back to Dashboard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-10'>
        <div className='grid lg:grid-cols-12 gap-6'>

          {/* LEFT — Form */}
          <div className='lg:col-span-5'>
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
              {/* Progress bar */}
              <div className='h-1 bg-gray-100'>
                <div className='h-1 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500'
                  style={{ width: `${(activeIdx * 100) / (sections.length - 1)}%` }} />
              </div>

              <div className='p-5'>
                {/* Top bar */}
                <div className='flex justify-between items-center mb-4 pb-3 border-b border-gray-100'>
                  <div className='flex items-center gap-2'>
                    <TemplateSelector selectedTemplate={resume.template} onChange={v => update('template', v)} />
                    <ColorPicker selectedColor={resume.accent_color} onChange={v => update('accent_color', v)} />
                  </div>
                  <div className='flex items-center gap-1'>
                    {activeIdx > 0 && (
                      <button onClick={() => setActiveIdx(p => p - 1)} className='flex items-center gap-1 px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition-all'>
                        <ChevronLeft className='size-3.5' /> Prev
                      </button>
                    )}
                    {activeIdx < sections.length - 1 && (
                      <button onClick={() => setActiveIdx(p => p + 1)} className='flex items-center gap-1 px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition-all'>
                        Next <ChevronRight className='size-3.5' />
                      </button>
                    )}
                  </div>
                </div>

                {/* Section pills */}
                <div className='flex flex-wrap gap-1.5 mb-5'>
                  {sections.map((s, i) => (
                    <button key={s.id} onClick={() => setActiveIdx(i)}
                      className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${i === activeIdx ? 'bg-green-500 text-white shadow-sm' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                      {s.name}
                    </button>
                  ))}
                </div>

                {/* Form content */}
                <div className='min-h-64'>
                  {activeSection.id === 'personal' && (
                    <PersonalInfoForm data={resume.personal_info} onChange={v => update('personal_info', v)} removeBackground={removeBg} setRemoveBackground={setRemoveBg} />
                  )}
                  {activeSection.id === 'summary' && (
                    <ProfessionalSummary data={resume.professional_summary} onChange={v => update('professional_summary', v)} />
                  )}
                  {activeSection.id === 'experience' && (
                    <ExperienceForm data={resume.experience} onChange={v => update('experience', v)} />
                  )}
                  {activeSection.id === 'project' && (
                    <ProjectForm data={resume.project} onChange={v => update('project', v)} />
                  )}
                  {activeSection.id === 'education' && (
                    <EducationForm data={resume.education} onChange={v => update('education', v)} />
                  )}
                  {activeSection.id === 'skills' && (
                    <SkillsForm data={resume.skills} onChange={v => update('skills', v)} />
                  )}
                </div>

                <button onClick={saveResume} disabled={saving}
                  className='mt-6 w-full py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium text-sm hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-60 shadow-sm'>
                  {saving ? 'Saving...' : '💾 Save Changes'}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — Preview */}
          <div className='lg:col-span-7'>
            {/* Action bar */}
            <div className='flex items-center justify-end gap-2 mb-3'>
              {resume.public && (
                <button onClick={handleShare} className='flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors'>
                  <Share2Icon className='size-3.5' /> Share
                </button>
              )}
              <button onClick={toggleVisibility} className='flex items-center gap-1.5 px-3 py-1.5 text-xs bg-purple-50 text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors'>
                {resume.public ? <EyeIcon className='size-3.5' /> : <EyeOffIcon className='size-3.5' />}
                {resume.public ? 'Public' : 'Private'}
              </button>
              <button onClick={() => window.print()} className='flex items-center gap-1.5 px-4 py-1.5 text-xs bg-green-50 text-green-600 border border-green-200 rounded-lg hover:bg-green-100 transition-colors'>
                <DownloadIcon className='size-3.5' /> Download PDF
              </button>
            </div>

            <ResumePreview data={resume} template={resume.template} accentColor={resume.accent_color} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder
