import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const colors = ["#9333ea", "#dc2626", "#0284c7", "#16a34a"];
  const [allResume, setAllResume] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");

  const navigate = useNavigate();

  const loadAllResume = async () => {
    setAllResume(dummyResumeData);
  };

  const createResume = async (event) => {
    event.preventDefault();
    setShowCreateResume(false);
    navigate(`/app/builder/${title || "new-resume"}`);
  };

  const uploadResume = async (event) => {
    event.preventDefault();
    if (!resumeFile) {
      alert("Please select a file to upload!");
      return;
    }
    setShowUploadResume(false);
    navigate(`/app/builder/uploaded-${title || "resume"}`);
  };

  // ✅ EDIT Resume Logic
  const editTitle = async (event) => {
    event.preventDefault();
    const updated = allResume.map((resume) =>
      resume._id === editResumeId ? { ...resume, title } : resume
    );
    setAllResume(updated);
    setEditResumeId("");
    setTitle("");
  };

  // ✅ DELETE Resume Logic (with confirmation)
  const deleteResume = (id) => {
    const resumeToDelete = allResume.find((r) => r._id === id);
    if (!resumeToDelete) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${resumeToDelete.title}"?`
    );

    if (confirmDelete) {
      const filtered = allResume.filter((resume) => resume._id !== id);
      setAllResume(filtered);
    } else {
      console.log("Delete cancelled");
    }
  };

  useEffect(() => {
    loadAllResume();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Nikhil Shendre
        </p>

        <div className="flex gap-4">
          {/* Create Resume */}
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-r from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
              Create Resume
            </p>
          </button>

          {/* Upload Resume */}
          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-r from-purple-300 to-purple-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-purple-600 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[305px]" />

        {/* RESUME LIST */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResume.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <div
                key={index}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + "40",
                }}
              >
                <FilePenLineIcon
                  className="size-7 group-hover:scale-105 transition-all"
                  style={{ color: baseColor }}
                  onClick={() => navigate(`/app/builder/${resume._id}`)}
                />
                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>
                <p
                  className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                  style={{ color: baseColor + "90" }}
                >
                  updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                {/* Action Buttons */}
                <div className="absolute top-1 right-1 hidden group-hover:flex items-center">
                  <TrashIcon
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                    onClick={() => deleteResume(resume._id)}
                  />
                  <PencilIcon
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* CREATE MODAL */}
        {showCreateResume && (
          <div
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <form
              onSubmit={createResume}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border rounded focus:ring-2 focus:ring-green-600 focus:outline-none"
                required
              />

              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Create Resume
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </form>
          </div>
        )}

        {/* UPLOAD MODAL */}
        {showUploadResume && (
          <div
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <form
              onSubmit={uploadResume}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Upload Existing Resume</h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-3 border rounded focus:ring-2 focus:ring-purple-600 focus:outline-none"
                required
              />
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResumeFile(e.target.files[0])}
                className="w-full mb-4"
                required
              />

              <button
                type="submit"
                className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                Upload Resume
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResume(false);
                  setTitle("");
                  setResumeFile(null);
                }}
              />
            </form>
          </div>
        )}

        {/* EDIT MODAL */}
        {editResumeId && (
          <div
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <form
              onSubmit={editTitle}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter new title"
                className="w-full px-4 py-2 mb-4 border rounded focus:ring-2 focus:ring-blue-600 focus:outline-none"
                required
              />

              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Update
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;



