import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

// Handles both: File object (instant local preview) and string URL (saved)
const getImageSrc = (image) => {
    if (!image) return null;
    if (typeof image === 'string' && image.length > 0) return image;
    if (image instanceof File || image instanceof Blob) return URL.createObjectURL(image);
    return null;
};

const MinimalImageTemplate = ({ data, accentColor }) => {
    const formatDate = (d) => {
        if (!d) return "";
        const [y, m] = d.split("-");
        return new Date(y, m - 1).toLocaleDateString("en-US", { year: "numeric", month: "short" });
    };

    const imageSrc = getImageSrc(data.personal_info?.image);

    return (
        <div className="max-w-5xl mx-auto bg-white text-zinc-800 min-h-[900px]">
            <div className="grid grid-cols-3 min-h-[900px]">

                {/* SIDEBAR */}
                <aside className="col-span-1 bg-gray-50 border-r border-zinc-200 p-6">
                    {/* Photo */}
                    <div className="flex justify-center mb-5">
                        {imageSrc ? (
                            <img src={imageSrc} alt="Profile" className="w-28 h-28 object-cover rounded-full shadow-md"
                                style={{ border: `3px solid ${accentColor}` }} />
                        ) : (
                            <div className="w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold shadow-md"
                                style={{ backgroundColor: accentColor + "20", color: accentColor, border: `3px solid ${accentColor}40` }}>
                                {data.personal_info?.full_name?.[0] || "?"}
                            </div>
                        )}
                    </div>

                    {/* Name & Profession */}
                    <div className="text-center mb-6">
                        <h1 className="text-base font-bold text-zinc-800 leading-tight">
                            {data.personal_info?.full_name || "Your Name"}
                        </h1>
                        {data.personal_info?.profession && (
                            <p className="text-xs mt-1 font-medium uppercase tracking-wider" style={{ color: accentColor }}>
                                {data.personal_info.profession}
                            </p>
                        )}
                    </div>

                    {/* Contact */}
                    <div className="mb-6">
                        <h2 className="text-[10px] font-bold tracking-widest text-zinc-400 mb-3 uppercase">Contact</h2>
                        <div className="space-y-2">
                            {[
                                { val: data.personal_info?.phone,    Icon: Phone },
                                { val: data.personal_info?.email,    Icon: Mail },
                                { val: data.personal_info?.location, Icon: MapPin },
                                { val: data.personal_info?.linkedin, Icon: Linkedin },
                                { val: data.personal_info?.website,  Icon: Globe },
                            ].filter(x => x.val).map(({ val, Icon }, i) => (
                                <div key={i} className="flex items-start gap-2">
                                    <Icon size={11} className="mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                                    <span className="text-[11px] text-zinc-600 break-all leading-tight">{val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    {data.education?.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-[10px] font-bold tracking-widest text-zinc-400 mb-3 uppercase">Education</h2>
                            <div className="space-y-3">
                                {data.education.map((e, i) => (
                                    <div key={i}>
                                        <p className="text-xs font-semibold text-zinc-800">{e.degree}</p>
                                        {e.field && <p className="text-[11px] text-zinc-500">{e.field}</p>}
                                        <p className="text-[11px] text-zinc-600">{e.institution}</p>
                                        <p className="text-[10px] text-zinc-400">{formatDate(e.graduation_date)}</p>
                                        {e.gpa && <p className="text-[10px] text-zinc-400">GPA: {e.gpa}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    {data.skills?.length > 0 && (
                        <div>
                            <h2 className="text-[10px] font-bold tracking-widest text-zinc-400 mb-3 uppercase">Skills</h2>
                            <ul className="space-y-1.5">
                                {data.skills.map((s, i) => (
                                    <li key={i} className="flex items-center gap-1.5 text-[11px] text-zinc-700">
                                        <span style={{ color: accentColor }} className="text-xs">▪</span> {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </aside>

                {/* MAIN */}
                <main className="col-span-2 p-7">
                    {data.professional_summary && (
                        <section className="mb-7">
                            <h2 className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: accentColor }}>Summary</h2>
                            <div className="w-8 h-0.5 mb-3 rounded" style={{ backgroundColor: accentColor }} />
                            <p className="text-sm text-zinc-700 leading-relaxed">{data.professional_summary}</p>
                        </section>
                    )}

                    {data.experience?.length > 0 && (
                        <section className="mb-7">
                            <h2 className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: accentColor }}>Experience</h2>
                            <div className="w-8 h-0.5 mb-4 rounded" style={{ backgroundColor: accentColor }} />
                            <div className="space-y-5">
                                {data.experience.map((exp, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-sm font-semibold text-zinc-900">{exp.position}</h3>
                                            <span className="text-[10px] text-zinc-400 whitespace-nowrap ml-2">
                                                {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="text-xs font-medium mt-0.5 mb-1" style={{ color: accentColor }}>{exp.company}</p>
                                        {exp.description && <p className="text-xs text-zinc-600 leading-relaxed whitespace-pre-line">{exp.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.project?.length > 0 && (
                        <section>
                            <h2 className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: accentColor }}>Projects</h2>
                            <div className="w-8 h-0.5 mb-4 rounded" style={{ backgroundColor: accentColor }} />
                            <div className="space-y-4">
                                {data.project.map((p, i) => (
                                    <div key={i}>
                                        <h3 className="text-sm font-medium text-zinc-800">{p.name}</h3>
                                        {p.type && <p className="text-[10px] mb-0.5" style={{ color: accentColor }}>{p.type}</p>}
                                        {p.description && <p className="text-xs text-zinc-600 leading-relaxed">{p.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default MinimalImageTemplate;
