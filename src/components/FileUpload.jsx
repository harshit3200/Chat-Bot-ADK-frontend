import { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ onFileChange, error }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const timer = useRef(null);

  const validateFile = (f) => {
    if (!f) return "File required";

    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowed.includes(f.type)) return "Upload PDF or DOCX";

    if (f.size > 10 * 1024 * 1024) return "Max size is 10MB";

    return null;
  };

  const startProgress = () => {
    setProgress(1);

    timer.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer.current);
          return 100;
        }
        return p + Math.max(2, (100 - p) * 0.1);
      });
    }, 120);
  };

  const onDrop = (files) => {
    const f = files[0];
    const err = validateFile(f);

    if (err) {
      onFileChange(null, err);
      return;
    }

    setFile(f);
    onFileChange(f, null);
    startProgress();
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div>
      {!file && (
        <div
          {...getRootProps()}
          className={`border rounded-lg p-3 cursor-pointer ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-gray-400 text-sm">
            Upload or drag file
          </p>
        </div>
      )}

      {file && (
        <div className="border rounded-lg p-3 flex justify-between items-center">
          <div>
            <p className="text-sm">{file.name}</p>
            <p className="text-xs text-gray-400">
              {(file.size / 1024 / 1024).toFixed(1)} MB
            </p>

            <div className="h-1 bg-gray-200 mt-2 rounded">
              <div
                className="h-1 bg-blue-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <button onClick={() => setFile(null)}>✕</button>
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FileUpload;