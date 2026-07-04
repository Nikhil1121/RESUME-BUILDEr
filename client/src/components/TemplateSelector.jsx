import React, { useState } from "react";
import { Check, Layout } from "lucide-react";

const Preview = {
  classic: (c) => (
    <svg viewBox="0 0 80 100" className="w-full h-16 rounded">
      <rect width="80" height="100" fill="#fff"/>
      <rect x="20" y="7" width="40" height="5" rx="2" fill={c}/>
      <rect x="10" y="15" width="60" height="1.5" rx="1" fill="#e5e7eb"/>
      <rect x="15" y="20" width="20" height="1.5" rx="1" fill="#d1d5db"/>
      <rect x="40" y="20" width="20" height="1.5" rx="1" fill="#d1d5db"/>
      <rect x="5" y="29" width="22" height="2" rx="1" fill={c}/>
      <rect x="5" y="34" width="70" height="1.5" rx="1" fill="#e5e7eb"/>
      <rect x="5" y="39" width="55" height="1.5" rx="1" fill="#e5e7eb"/>
      <rect x="5" y="49" width="22" height="2" rx="1" fill={c}/>
      <rect x="5" y="54" width="70" height="1.5" rx="1" fill="#e5e7eb"/>
      <rect x="5" y="59" width="45" height="1.5" rx="1" fill="#e5e7eb"/>
      <rect x="5" y="69" width="22" height="2" rx="1" fill={c}/>
      <rect x="5" y="75" width="14" height="4" rx="2" fill="#e5e7eb"/>
      <rect x="22" y="75" width="14" height="4" rx="2" fill="#e5e7eb"/>
      <rect x="39" y="75" width="14" height="4" rx="2" fill="#e5e7eb"/>
    </svg>
  ),
  modern: (c) => (
    <svg viewBox="0 0 80 100" className="w-full h-16 rounded">
      <rect width="80" height="100" fill="#fff"/>
      <rect width="80" height="28" fill={c}/>
      <rect x="5" y="7" width="38" height="5" rx="2" fill="white" opacity="0.9"/>
      <rect x="5" y="15" width="22" height="1.5" rx="1" fill="white" opacity="0.6"/>
      <rect x="32" y="15" width="18" height="1.5" rx="1" fill="white" opacity="0.6"/>
      <rect x="5" y="34" width="25" height="2" rx="1" fill="#374151"/>
      <rect x="5" y="39" width="70" height="1.5" rx="1" fill="#e5e7eb"/>
      <rect x="5" y="44" width="55" height="1.5" rx="1" fill="#e5e7eb"/>
      <rect x="5" y="53" width="25" height="2" rx="1" fill="#374151"/>
      <rect x="5" y="58" width="70" height="1.5" rx="1" fill="#e5e7eb"/>
      <rect x="5" y="63" width="45" height="1.5" rx="1" fill="#e5e7eb"/>
      <rect x="5" y="77" width="14" height="5" rx="2.5" fill={c} opacity="0.8"/>
      <rect x="22" y="77" width="14" height="5" rx="2.5" fill={c} opacity="0.8"/>
      <rect x="39" y="77" width="14" height="5" rx="2.5" fill={c} opacity="0.8"/>
    </svg>
  ),
  minimal: (c) => (
    <svg viewBox="0 0 80 100" className="w-full h-16 rounded">
      <rect width="80" height="100" fill="#fff"/>
      <rect x="5" y="7" width="50" height="6" rx="1" fill="#111827" opacity="0.8"/>
      <rect x="5" y="17" width="18" height="1.5" rx="1" fill="#9ca3af"/>
      <rect x="26" y="17" width="18" height="1.5" rx="1" fill="#9ca3af"/>
      <rect x="5" y="25" width="70" height="0.8" fill="#e5e7eb"/>
      <rect x="5" y="31" width="18" height="2" rx="1" fill={c}/>
      <rect x="5" y="36" width="70" height="1.5" rx="1" fill="#e5e7eb"/>
      <rect x="5" y="41" width="55" height="1.5" rx="1" fill="#e5e7eb"/>
      <rect x="5" y="51" width="18" height="2" rx="1" fill={c}/>
      <rect x="5" y="56" width="70" height="1.5" rx="1" fill="#e5e7eb"/>
      <rect x="5" y="61" width="40" height="1.5" rx="1" fill="#e5e7eb"/>
      <rect x="5" y="75" width="65" height="1.5" rx="1" fill="#d1d5db"/>
    </svg>
  ),
  minimalImage: (c) => (
    <svg viewBox="0 0 80 100" className="w-full h-16 rounded">
      <rect width="80" height="100" fill="#fff"/>
      <rect width="25" height="100" fill="#f3f4f6"/>
      <circle cx="12.5" cy="18" r="8" fill={c} opacity="0.25"/>
      <circle cx="12.5" cy="18" r="5" fill={c} opacity="0.5"/>
      <rect x="3" y="31" width="18" height="1.5" rx="1" fill="#9ca3af"/>
      <rect x="3" y="36" width="18" height="1.5" rx="1" fill="#e5e7eb"/>
      <rect x="3" y="40" width="14" height="1.5" rx="1" fill="#e5e7eb"/>
      <rect x="3" y="50" width="18" height="1.5" rx="1" fill="#9ca3af"/>
      <rect x="3" y="55" width="18" height="1.5" rx="1" fill="#e5e7eb"/>
      <rect x="3" y="59" width="14" height="1.5" rx="1" fill="#e5e7eb"/>
      <rect x="29" y="7" width="42" height="5" rx="1" fill="#111827" opacity="0.8"/>
      <rect x="29" y="15" width="28" height="1.5" rx="1" fill="#9ca3af"/>
      <rect x="29" y="25" width="18" height="2" rx="1" fill={c}/>
      <rect x="29" y="30" width="46" height="1.5" rx="1" fill="#e5e7eb"/>
      <rect x="29" y="35" width="38" height="1.5" rx="1" fill="#e5e7eb"/>
      <rect x="29" y="45" width="18" height="2" rx="1" fill={c}/>
      <rect x="29" y="50" width="46" height="1.5" rx="1" fill="#e5e7eb"/>
      <rect x="29" y="55" width="32" height="1.5" rx="1" fill="#e5e7eb"/>
    </svg>
  ),
};

const templates = [
  { id: "classic",      name: "Classic",    desc: "Traditional centered layout" },
  { id: "modern",       name: "Modern",     desc: "Bold colored header" },
  { id: "minimal",      name: "Minimal",    desc: "Clean typography" },
  { id: "minimalImage", name: "With Photo", desc: "Sidebar + profile photo" },
];

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [open, setOpen] = useState(false);
  const selected = templates.find(t => t.id === selectedTemplate);

  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-sm text-blue-600 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-all px-3 py-2 rounded-lg">
        <Layout size={14} />
        <span className="max-sm:hidden">{selected?.name || 'Template'}</span>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-xl border border-gray-200 shadow-xl p-3 grid grid-cols-2 gap-2 w-72">
          <p className="col-span-2 text-xs font-semibold text-gray-500 mb-1">Choose Template</p>
          {templates.map(t => {
            const active = selectedTemplate === t.id;
            return (
              <div key={t.id} onClick={() => { onChange(t.id); setOpen(false); }}
                className={`relative p-2 border-2 rounded-lg cursor-pointer transition-all ${active ? 'border-blue-400 bg-blue-50' : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50'}`}>
                <div className="rounded overflow-hidden border border-gray-100 mb-1.5">
                  {Preview[t.id]?.('#3B82F6')}
                </div>
                <p className="text-xs font-semibold text-center text-gray-800">{t.name}</p>
                <p className="text-[10px] text-center text-gray-400 leading-tight">{t.desc}</p>
                {active && (
                  <div className="absolute top-1.5 right-1.5 size-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="size-2.5 text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
