// src/components/Form.jsx
import { useForm } from "react-hook-form";
import FileUpload from "./FileUpload";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../utils/validation";
import { useState } from "react";

const Form = () => {
    const [selectedFile, setSelectedFile] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
  data.file = selectedFile;
  console.log(data);
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      {/* Name */}
      <div>
        <input
          {...register("name")}
          placeholder="Enter name"
          className="w-full border p-2 rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          {...register("email")}
          placeholder="Enter email"
          className="w-full border p-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* File */}
      <div>
        <FileUpload
  onFileSelect={(file) => setSelectedFile(file)}
  error={errors.file}
/>
        {errors.file && (
          <p className="text-red-500 text-sm">{errors.file.message}</p>
        )}
      </div>

      {/* Comment */}
      <div>
        <textarea
          {...register("comment")}
          placeholder="Enter comment"
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Consent */}
      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("consent")} />
        <label>I agree to terms</label>
      </div>
      {errors.consent && (
        <p className="text-red-500 text-sm">{errors.consent.message}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Submit
      </button>

    </form>
  );
};

export default Form;