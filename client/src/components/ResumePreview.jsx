import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import MinimalImageTemplate from './templates/MinimalImageTemplate'

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const render = () => {
    switch (template) {
      case "modern":       return <ModernTemplate data={data} accentColor={accentColor} />
      case "minimal":      return <MinimalTemplate data={data} accentColor={accentColor} />
      case "minimalImage": return <MinimalImageTemplate data={data} accentColor={accentColor} />
      default:             return <ClassicTemplate data={data} accentColor={accentColor} />
    }
  }

  return (
    <div className={`w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm print:shadow-none print:border-none ${classes}`}>
      <div id="resume-preview">{render()}</div>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #resume-preview, #resume-preview * { visibility: visible !important; }
          #resume-preview { position: fixed; top: 0; left: 0; width: 100%; }
        }
      `}</style>
    </div>
  )
}

export default ResumePreview
