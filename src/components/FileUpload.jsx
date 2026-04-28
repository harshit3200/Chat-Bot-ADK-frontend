// src/components/FileUpload.jsx
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ onFileSelect, error }) => {
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const selected = acceptedFiles[0];

    if (selected) {
      setFile(selected);
      onFileSelect(selected);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const removeFile = () => {
    setFile(null);
    onFileSelect(null);
  };

  return (
    <div>
      {/* Drop Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-4 rounded cursor-pointer ${
          isDragActive ? "border-blue-500" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />

        {file ? (
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-gray-500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>

            <button
              onClick={removeFile}
              className="text-red-500 font-bold"
            >
              ❌
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Drag & drop file here, or click to select
          </p>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default FileUpload;