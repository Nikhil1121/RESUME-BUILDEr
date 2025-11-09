// import React, { useState } from "react";
// import { Upload, Download } from "lucide-react";
// import jsPDF from "jspdf";
// import ResumePreview from "../components/ResumePreview";

// const ResumeBuilder = () => {
//   const [resumeData, setResumeData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     linkedin: "",
//     github: "",
//     summary: "",
//     education: "",
//     experience: "",
//     skills: "",
//     image: "",
//   });

//   const handleChange = (e) => {
//     setResumeData({ ...resumeData, [e.target.name]: e.target.value });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setResumeData({ ...resumeData, image: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const downloadPDF = () => {
//     const doc = new jsPDF("p", "pt", "a4");

//     // Add profile image on right side
//     if (resumeData.image) {
//       doc.addImage(resumeData.image, "JPEG", 430, 40, 100, 100);
//     }

//     // Name
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(20);
//     if (resumeData.name) doc.text(resumeData.name, 40, 70);

//     // Contact info
//     doc.setFontSize(10);
//     doc.setFont("helvetica", "normal");
//     if (resumeData.email) doc.text(resumeData.email, 40, 90);
//     if (resumeData.phone) doc.text(resumeData.phone, 40, 105);

//     // Links
//     if (resumeData.linkedin || resumeData.github) {
//       doc.text(
//         `${resumeData.linkedin || ""} ${
//           resumeData.github ? " | " + resumeData.github : ""
//         }`,
//         40,
//         120
//       );
//     }

//     // Sections
//     let y = 160;
//     const addSection = (title, text) => {
//       if (!text) return;
//       doc.setFont("helvetica", "bold");
//       doc.setFontSize(12);
//       doc.text(title, 40, y);
//       y += 15;
//       doc.setFont("helvetica", "normal");
//       doc.text(text, 40, y, { maxWidth: 500 });
//       y += 30;
//     };

//     addSection("Summary", resumeData.summary);
//     addSection("Education", resumeData.education);
//     addSection("Experience", resumeData.experience);
//     addSection("Skills", resumeData.skills);

//     doc.save(`${resumeData.name || "resume"}.pdf`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row gap-6 p-6">
//       {/* LEFT SIDE: Input Form */}
//       <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-xl p-6 border border-slate-200">
//         <h2 className="text-3xl font-bold mb-6 text-slate-800 text-center">
//           Make Your Resume
//         </h2>

//         {/* Image Upload */}
//         <div className="flex flex-col items-center mb-6">
//           <label className="cursor-pointer flex flex-col items-center">
//             {resumeData.image ? (
//               <img
//                 src={resumeData.image}
//                 alt="profile"
//                 className="w-24 h-24 object-cover rounded-full border border-gray-300"
//               />
//             ) : (
//               <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full border border-dashed border-gray-400">
//                 <Upload className="w-6 h-6 text-gray-500" />
//               </div>
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="hidden"
//             />
//             <span className="text-sm text-indigo-600 mt-2 hover:underline">
//               Upload Photo
//             </span>
//           </label>
//         </div>

//         {/* Form */}
//         <form className="flex flex-col gap-3">
//           <input
//             type="text"
//             name="name"
//             value={resumeData.name}
//             onChange={handleChange}
//             placeholder="Full Name"
//             className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//           />
//           <input
//             type="email"
//             name="email"
//             value={resumeData.email}
//             onChange={handleChange}
//             placeholder="Email Address"
//             className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//           />
//           <input
//             type="text"
//             name="phone"
//             value={resumeData.phone}
//             onChange={handleChange}
//             placeholder="Phone Number"
//             className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//           />
//           <input
//             type="text"
//             name="linkedin"
//             value={resumeData.linkedin}
//             onChange={handleChange}
//             placeholder="LinkedIn URL"
//             className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//           />
//           <input
//             type="text"
//             name="github"
//             value={resumeData.github}
//             onChange={handleChange}
//             placeholder="GitHub URL"
//             className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//           />
//           <textarea
//             name="summary"
//             value={resumeData.summary}
//             onChange={handleChange}
//             placeholder="Professional Summary"
//             className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//             rows={3}
//           ></textarea>
//           <textarea
//             name="education"
//             value={resumeData.education}
//             onChange={handleChange}
//             placeholder="Education Details"
//             className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//             rows={3}
//           ></textarea>
//           <textarea
//             name="experience"
//             value={resumeData.experience}
//             onChange={handleChange}
//             placeholder="Experience Details"
//             className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//             rows={3}
//           ></textarea>
//           <textarea
//             name="skills"
//             value={resumeData.skills}
//             onChange={handleChange}
//             placeholder="Skills (comma separated)"
//             className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
//             rows={2}
//           ></textarea>

//           <button
//             type="button"
//             onClick={downloadPDF}
//             className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium flex items-center justify-center gap-2 mt-4 transition-all"
//           >
//             <Download className="w-5 h-5" /> Download PDF
//           </button>
//         </form>
//       </div>

//       {/* RIGHT SIDE: Resume Preview */}
//       <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-xl p-8 border border-slate-200">
//         {(resumeData.name ||
//           resumeData.email ||
//           resumeData.phone ||
//           resumeData.linkedin ||
//           resumeData.github ||
//           resumeData.summary ||
//           resumeData.education ||
//           resumeData.experience ||
//           resumeData.skills ||
//           resumeData.image) && (
//           <>
//             <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between border-b pb-4 mb-4">
//               <div className="text-left">
//                 {resumeData.name && (
//                   <h2 className="text-2xl font-bold text-green-700">
//                     {resumeData.name}
//                   </h2>
//                 )}
//                 {(resumeData.email || resumeData.phone) && (
//                   <p className="text-sm text-slate-600">
//                     {resumeData.email && resumeData.email}
//                     {resumeData.phone && ` | ${resumeData.phone}`}
//                   </p>
//                 )}
//                 {(resumeData.linkedin || resumeData.github) && (
//                   <p className="text-sm text-blue-600 mt-1">
//                     {resumeData.linkedin && (
//                       <a
//                         href={resumeData.linkedin}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="hover:underline mr-2"
//                       >
//                         LinkedIn
//                       </a>
//                     )}
//                     {resumeData.github && (
//                       <a
//                         href={resumeData.github}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="hover:underline"
//                       >
//                         GitHub
//                       </a>
//                     )}
//                   </p>
//                 )}
//               </div>

//               {/* IMAGE ON RIGHT */}
//               {resumeData.image && (
//                 <img
//                   src={resumeData.image}
//                   alt="Profile"
//                   className="w-28 h-28 rounded-full object-cover border border-gray-300"
//                 />
//               )}
//             </div>

//             {/* Resume Sections */}
//             <div className="space-y-4 text-slate-700">
//               {resumeData.summary && (
//                 <div>
//                   <h3 className="font-semibold text-green-600 mb-1">Summary</h3>
//                   <p>{resumeData.summary}</p>
//                 </div>
//               )}
//               {resumeData.education && (
//                 <div>
//                   <h3 className="font-semibold text-green-600 mb-1">Education</h3>
//                   <p>{resumeData.education}</p>
//                 </div>
//               )}
//               {resumeData.experience && (
//                 <div>
//                   <h3 className="font-semibold text-green-600 mb-1">Experience</h3>
//                   <p>{resumeData.experience}</p>
//                 </div>
//               )}
//               {resumeData.skills && (
//                 <div>
//                   <h3 className="font-semibold text-green-600 mb-1">Skills</h3>
//                   <p>{resumeData.skills}</p>
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResumeBuilder;


// 

import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkles,
  User
} from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'

const ResumeBuilder = () => {

  const { resumeId } = useParams

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: "",
    experienced: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  })

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find(resume => resume._id === resumeId)
    if (resume) {
      setResumeData(resume)
      document.title
    }
  }

  const [activeSectionIndex, setActiveSectuionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "project", name: "Projects", icon: User },
    { id: "skills", name: "Skills", icon: Sparkles },
  ]

  const activeSection = sections[activeSectionIndex]

  useEffect(() => {
    loadExistingResume()
  }, [])

  return (
    <div>

      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link to={'/app'} className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
          <ArrowLeftIcon className='size-4' /> Back to Dashboard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>

          {/* left panel - form */}
          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>

              {/* progress bar using activeSectionIndex */}
              <hr className='absolute top-0 left-0 right-0 border-2 border-gray-300' />
              <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000'
                style={{ width: `${activeSectionIndex * 100 / (sections.length - 1)} %` }} />

              {/* section navigation */}
              <div className='flex justify-between items-center mb-6 border-b broder-gray-300 py-1'>

                <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-1'>
                  <TemplateSelector selectedTemplate={resumeData.template} onChange={(template)=> setResumeData(prev => ({...prev, template}))}/>
                </div>

                <div className='flex items-center'>
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() => setActiveSectuionIndex((prevIndex) => Math.max(prevIndex - 1, 0))}
                      className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all'
                      disabled={activeSectionIndex === 0}>
                      <ChevronLeft className='size-4' /> Previous
                    </button>
                  )}
                  <button
                    onClick={() => setActiveSectuionIndex((prevIndex) => Math.min(prevIndex + 1, sections.length - 1))}
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && 'opacity-50'}`}
                    disabled={activeSectionIndex === sections.length - 1}>
                    Next <ChevronRight className='size-4' />
                  </button>
                </div>
              </div>

              {/* form content */}
              <div className='space-y-6 gap-2'>
                {activeSection.id === 'personal' && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) => setResumeData(prev => ({
                      ...prev,
                      personal_info: data
                    }))}
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}
              </div>

            </div>
          </div>

          {/* right panel - preview */}
          <div className='lg:col-span-7 max-lg:mt-6'>
            <div>
              {/* ------buttons------ */}
              
            </div>
            
            <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color}/>
          </div>

        </div>
      </div>

    </div>
  )
}

export default ResumeBuilder
