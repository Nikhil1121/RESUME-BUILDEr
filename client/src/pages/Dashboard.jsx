import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloudIcon, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

// FIX: Modal moved OUTSIDE Dashboard component.
// Earlier it was defined inside Dashboard, so every re-render (e.g. every
// keystroke calling setTitle) recreated the Modal function as a *new*
// component identity. React then unmounted + remounted the <input> on every
// keystroke, which reset its focus/value -> only the last typed letter survived,
// and the file input lost its selected file the same way.
const Modal = ({ show, onClose, onSubmit, heading, btnText, btnColor, loading, children }) => {
  if (!show) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <form onClick={e => e.stopPropagation()} onSubmit={onSubmit} className="relative bg-white rounded-2xl w-full max-w-sm p-7 shadow-2xl">
        <h2 className="text-xl font-bold mb-5 text-gray-800">{heading}</h2>
        {children}
        <button type="submit" disabled={loading} className={`w-full py-2.5 text-white rounded-lg font-medium transition-all disabled:opacity-60 ${btnColor}`}>
          {loading ? "Please wait..." : btnText}
        </button>
        <button type="button" onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <XIcon className="size-5" />
        </button>
      </form>
    </div>
  );
};

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const colors = ["#9333ea", "#dc2626", "#0284c7", "#16a34a", "#f97316", "#0891b2"];
  const navigate = useNavigate();

  const [allResume, setAllResume] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [loading, setLoading] = useState(false);

  const loadAllResume = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", { headers: { Authorization: token } });
      setAllResume(data.resumes || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const createResume = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.post("/api/resumes/create", { title }, { headers: { Authorization: token } });
      if (data?.resume) {
        navigate(`/app/builder/${data.resume._id}`);
      }
      setTitle(""); setShowCreateResume(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally { setLoading(false); }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    if (!resumeFile) return toast.error("Please select a PDF file!");
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resumeFile", resumeFile);
      formData.append("title", title);
      const { data } = await api.post("/api/ai/upload-resume", formData, {
        headers: { Authorization: token, "Content-Type": "multipart/form-data" },
      });
      if (data?.resumeId) {
        await loadAllResume();
        navigate(`/app/builder/${data.resumeId}`);
      }
      setShowUploadResume(false); setTitle(""); setResumeFile(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally { setLoading(false); }
  };

  const editTitle = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("resumeId", editResumeId);
      formData.append("resumeData", JSON.stringify({ title }));
      await api.put("/api/resumes/update", formData, {
        headers: { Authorization: token, "Content-Type": "multipart/form-data" },
      });
      setAllResume(prev => prev.map(r => r._id === editResumeId ? { ...r, title } : r));
      setEditResumeId(""); setTitle("");
      toast.success("Title updated!");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (id) => {
    if (!window.confirm("Delete this resume?")) return;
    try {
      await api.delete(`/api/resumes/delete/${id}`, { headers: { Authorization: token } });
      setAllResume(prev => prev.filter(r => r._id !== id));
      toast.success("Deleted!");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => { if (token) loadAllResume(); }, [token]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <p className="text-2xl font-medium mb-6 text-slate-700 sm:hidden">Welcome, {user?.name}</p>

      {/* Action Buttons */}
      <div className="flex gap-4 flex-wrap">
        <button onClick={() => setShowCreateResume(true)}
          className="w-full sm:w-36 h-48 flex flex-col items-center justify-center rounded-xl gap-2 text-slate-600 border-2 border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 bg-white">
          <PlusIcon className="size-11 p-2.5 bg-gradient-to-r from-indigo-400 to-indigo-600 text-white rounded-full transition-transform group-hover:scale-110" />
          <p className="text-sm font-medium group-hover:text-indigo-600">Create Resume</p>
        </button>

        <button onClick={() => setShowUploadResume(true)}
          className="w-full sm:w-36 h-48 flex flex-col items-center justify-center rounded-xl gap-2 text-slate-600 border-2 border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 bg-white">
          <UploadCloudIcon className="size-11 p-2.5 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-full transition-transform group-hover:scale-110" />
          <p className="text-sm font-medium group-hover:text-purple-600">Upload Existing</p>
        </button>
      </div>

      <hr className="border-slate-200 my-6" />

      {/* Resume Grid */}
      <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
        {allResume.length === 0 && (
          <p className="text-slate-400 text-sm col-span-2">No resumes yet. Create one above!</p>
        )}
        {allResume.map((resume, index) => {
          const color = colors[index % colors.length];
          return (
            <div key={resume._id} onClick={() => navigate(`/app/builder/${resume._id}`)}
              className="relative w-full sm:w-36 h-48 flex flex-col items-center justify-center rounded-xl gap-2 border-2 group hover:shadow-xl transition-all duration-300 cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${color}15, ${color}35)`, borderColor: color + "50" }}>
              <FilePenLineIcon className="size-8 transition-transform group-hover:scale-110" style={{ color }} />
              <p className="text-sm font-medium px-2 text-center" style={{ color }}>{resume.title}</p>
              <p className="absolute bottom-2 text-[10px] px-2 text-center" style={{ color: color + "99" }}>
                {new Date(resume.updatedAt).toLocaleDateString()}
              </p>
              <div className="absolute top-2 right-2 hidden group-hover:flex gap-1" onClick={e => e.stopPropagation()}>
                <button onClick={() => deleteResume(resume._id)} className="p-1.5 bg-white/80 rounded-lg hover:bg-red-50 transition-colors">
                  <TrashIcon className="size-3.5 text-red-500" />
                </button>
                <button onClick={() => { setEditResumeId(resume._id); setTitle(resume.title); }} className="p-1.5 bg-white/80 rounded-lg hover:bg-blue-50 transition-colors">
                  <PencilIcon className="size-3.5 text-blue-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE MODAL */}
      <Modal show={showCreateResume} loading={loading} onClose={() => { setShowCreateResume(false); setTitle(""); }}
        onSubmit={createResume} heading="Create New Resume" btnText="Create Resume" btnColor="bg-indigo-500 hover:bg-indigo-600">
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Resume title (e.g. Software Engineer)"
          className="w-full px-4 py-2.5 mb-4 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 outline-none" required autoFocus />
      </Modal>

      {/* UPLOAD MODAL */}
      <Modal show={showUploadResume} loading={loading} onClose={() => { setShowUploadResume(false); setTitle(""); setResumeFile(null); }}
        onSubmit={uploadResume} heading="Upload Existing Resume" btnText="Upload & Extract" btnColor="bg-purple-500 hover:bg-purple-600">
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Give it a title"
          className="w-full px-4 py-2.5 mb-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-400 outline-none" required autoFocus />
        <input type="file" accept=".pdf" onChange={e => setResumeFile(e.target.files[0])}
          className="w-full mb-4 text-sm text-gray-600 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-purple-100 file:text-purple-700" required />
        {resumeFile && <p className="text-xs text-green-600 mb-2">✓ {resumeFile.name}</p>}
        <p className="text-xs text-gray-400 mb-4">Only PDF files supported. AI will extract your data automatically.</p>
      </Modal>

      {/* EDIT TITLE MODAL */}
      <Modal show={!!editResumeId} loading={loading} onClose={() => { setEditResumeId(""); setTitle(""); }}
        onSubmit={editTitle} heading="Edit Resume Title" btnText="Save Changes" btnColor="bg-green-500 hover:bg-green-600">
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="New title"
          className="w-full px-4 py-2.5 mb-4 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-400 outline-none" required autoFocus />
      </Modal>
    </div>
  );
};

export default Dashboard;
