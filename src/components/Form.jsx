import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../utils/validation";
import axios from "axios";

export default function Form() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const consent = watch("consent");

  // 📂 FILE HANDLE
  const handleFile = (e) => {
    const f = e.target.files[0];
    setFile(f);

    // 🔥 IMPORTANT (Zod ko file dena)
    setValue("file", f || undefined, { shouldValidate: true });

    // fake progress
    setProgress(1);
    let p = 1;

    const interval = setInterval(() => {
      p += Math.max(2, (100 - p) * 0.15);
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
      }
      setProgress(Math.floor(p));
    }, 120);
  };

  // 🚀 SUBMIT
  const onSubmit = async (data) => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("email", data.email);
      fd.append("message", data.comment || "");
      if (file) {
        fd.append("file", file);
      }
      await axios.post(API_URL, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      setSuccess(true);
      reset();
      setFile(null);
      setProgress(0);

    }catch (e) {
  const msg = e.response?.data?.message || "";

  if (e.response?.status === 400) {
    if (msg.toLowerCase().includes("email")) {
      h("email", { type: "server", message: msg });
    } else if (msg.toLowerCase().includes("file")) {
      h("file", { type: "server", message: msg });
    } else {
      l(msg);
    }
  } else {
    l(msg || "Something went wrong");
  }
}finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center h-[200px]">

        <div className="bg-white px-6 py-3 rounded-lg shadow text-center relative">

          {/* close */}
          <button
            onClick={() => setSuccess(false)}
            className="absolute right-2 top-1 text-gray-400"
          >
            ✕
          </button>

          <p className="text-sm font-medium">
            Thank you for your request!
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Our manager will contact you within 24 hours
          </p>

        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      {/* TITLE */}
      <h2 className="text-[15px] font-semibold mb-1">
        Fill out the form to discuss the project
      </h2>
      <p className="text-[12px] text-gray-400 mb-4">
        Leave a request, our manager will contact you within 24 hours
      </p>

      {/* NAME */}
      <div className="mb-3">
        <label className="text-[12px] text-gray-600">Name</label>
        <input
          {...register("name")}
          placeholder="Enter name"
          className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm outline-none ${errors.name ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* EMAIL */}
      <div className="mb-3">
        <label className="text-[12px] text-gray-600">E-mail*</label>
        <input
          {...register("email")}
          placeholder="Enter e-mail"
          className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm outline-none ${errors.email ? "border-red-500" : "border-gray-300"
            }`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* FILE */}
      <div className="mb-3">
        <label className="text-[12px] text-gray-600">File</label>

        <input
          type="file"
          id="fileUpload"
          className="hidden"
          onChange={handleFile}
        />

        <label
          htmlFor="fileUpload"
          className={`mt-1 flex items-center border rounded-lg px-3 py-2 text-sm cursor-pointer ${errors.file ? "border-red-500" : "border-gray-300"
            }`}
        >
          <span className="flex-1 text-gray-400">
            {file ? file.name : "Select or drag file"}
          </span>
          <span className="text-gray-400">📎</span>
        </label>

        {/* progress */}
        {file && (
          <div className="h-1 bg-gray-200 mt-2 rounded">
            <div
              className="h-1 bg-blue-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {errors.file && (
          <p className="text-red-500 text-xs mt-1">
            {errors.file.message}
          </p>
        )}
      </div>

      {/* COMMENT */}
      <div className="mb-3">
        <label className="text-[12px] text-gray-600">Comment</label>
        <p className="text-[11px] text-gray-400 mb-1">
          If you want us to contact you by phone, leave it here
        </p>
        <textarea
          {...register("comment")}
          placeholder="Enter comment"
          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm outline-none resize-none h-20"
        />
      </div>

      {/* CHECKBOX */}
      <div className="flex items-center gap-2 mb-4">
        <input type="checkbox" {...register("consent")} />
        <p className="text-[11px] text-gray-500">
          I agree to personal data processing
        </p>
      </div>

      {errors.consent && (
        <p className="text-red-500 text-xs mb-2">
          {errors.consent.message}
        </p>
      )}

      {/* BUTTON */}
      <button
        disabled={!consent || loading}
        className={`w-full py-2.5 rounded-lg text-sm ${consent
          ? "bg-blue-600 text-white"
          : "bg-gray-200 text-gray-500"
          }`}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {/* SERVER ERROR */}
      {serverError && (
        <p className="text-red-500 text-xs text-center mt-2">
          {serverError}
        </p>
      )}

    </form>
  );
}