import React, { useState, useRef } from 'react';
import { X, Upload, Sparkles, RefreshCw } from 'lucide-react';

interface PhotoUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPhoto: (dataUrl: string) => void;
  onResetDefault: () => void;
}

export const PhotoUploaderModal: React.FC<PhotoUploaderModalProps> = ({
  isOpen,
  onClose,
  onSelectPhoto,
  onResetDefault,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewSrc(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleApply = () => {
    if (previewSrc) {
      onSelectPhoto(previewSrc);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-carbon-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl bg-carbon-900 border border-white/10 p-4 sm:p-6 md:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-carbon-800 text-slate-400 hover:text-white hover:bg-carbon-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-accent-cyan" />
          <span className="font-mono text-xs text-accent-cyan tracking-widest uppercase">
            3D Particle Mesh Generator
          </span>
        </div>
        <h3 className="font-display font-extrabold text-2xl text-white mb-2">
          Provide Your Photograph
        </h3>
        <p className="font-sans text-xs text-slate-400 mb-6 leading-relaxed">
          Upload any high-contrast headshot or portrait. The WebGL engine samples pixel luminance and generates a responsive 3D volumetric point cloud in real time.
        </p>

        {/* Drag & Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-accent-cyan bg-accent-cyan/10'
              : 'border-white/15 bg-carbon-950/60 hover:border-white/30 hover:bg-carbon-850'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                processFile(e.target.files[0]);
              }
            }}
          />

          {previewSrc ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent-cyan shadow-glow">
                <img src={previewSrc} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <span className="font-mono text-xs text-slate-300">
                Photograph loaded! Click Apply to generate 3D particles.
              </span>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-carbon-800 border border-white/10 flex items-center justify-center text-accent-cyan mb-3">
                <Upload className="w-5 h-5" />
              </div>
              <p className="font-sans font-medium text-sm text-slate-200 mb-1">
                Drop your photo here, or <span className="text-accent-cyan underline">browse</span>
              </p>
              <p className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                PNG, JPG, or WebP (Centered portrait recommended)
              </p>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            onClick={() => {
              onResetDefault();
              setPreviewSrc(null);
              onClose();
            }}
            className="flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-2 font-mono text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Cybernetic Silhouette</span>
          </button>

          <button
            disabled={!previewSrc}
            onClick={handleApply}
            className={`min-h-[44px] px-5 py-2.5 rounded-xl font-display font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center ${
              previewSrc
                ? 'bg-accent-cyan text-carbon-950 hover:bg-cyan-300 shadow-glow cursor-pointer'
                : 'bg-carbon-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Apply to 3D Scene
          </button>
        </div>
      </div>
    </div>
  );
};

