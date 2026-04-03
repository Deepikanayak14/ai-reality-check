// NEW: Document dump / upload zone
import { useState, useRef, useCallback } from "react";
import { Upload, FileText, X } from "lucide-react";

interface DocumentUploadProps {
  onAnalyzeDocument: (fileName: string, content: string) => void;
  isLoading: boolean;
}

export default function DocumentUpload({ onAnalyzeDocument, isLoading }: DocumentUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<{ name: string; content: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFile({ name: f.name, content: e.target?.result as string || "" });
    };
    reader.readAsText(f);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const handleAnalyze = () => {
    if (file && !isLoading) onAnalyzeDocument(file.name, file.content);
  };

  return (
    <section className="animate-fade-in-up mx-auto max-w-3xl">
      <h2 className="mb-4 text-xl font-bold">📁 Document Analyzer</h2>
      <div
        onDragOver={e => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-all duration-300 ${
          dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        }`}
      >
        <Upload className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Drag & drop files here, or click to browse</p>
        <p className="mt-1 text-xs text-muted-foreground">Accepts photos, emails, PDFs, text documents</p>
        <input ref={inputRef} type="file" className="hidden" accept=".txt,.pdf,.eml,.jpg,.jpeg,.png,.doc,.docx" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
      </div>
      {file && (
        <div className="mt-3 flex items-center justify-between rounded-lg border border-border bg-card p-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{file.name}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setFile(null)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
            <button onClick={handleAnalyze} disabled={isLoading} className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:opacity-40">Analyze</button>
          </div>
        </div>
      )}
    </section>
  );
}
