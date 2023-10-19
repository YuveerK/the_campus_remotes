import React, { useState } from "react";
import axios from "axios";
import env from "react-dotenv";

const AddDocumentModal = ({ owner_id, closeModal }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(""); // State to hold the file name input

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileNameChange = (event) => {
    setFileName(event.target.value); // Update the file name state when the input changes
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!fileName) {
      alert("File name is required");
      return;
    }

    const formData = new FormData();
    formData.append("documentFile", file);
    formData.append("owner_id", owner_id);
    formData.append("tenant_id", null); // Replace 'your-tenant-id' with actual tenant ID
    formData.append("fileName", fileName);

    try {
      const response = await axios.post(
        `${env.BASE_URL}/upload-document`,
        formData
      );
      console.log("File uploaded successfully:", response.data);
      closeModal(false);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="w-full h-screen absolute top-0 left-0 flex items-center justify-center">
      <div className="w-[1000px] h-[1000px] bg-white shadow-md rounded-md p-8 overflow-auto">
        <div className="w-full flex items-center justify-end">
          <div
            className="w-fit px-4 py-2 bg-red-500 text-white text-center rounded-md hover:bg-red-600 hover:cursor-pointer "
            onClick={() => closeModal(false)}
          >
            <p>Close</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            value={fileName}
            onChange={handleFileNameChange}
            placeholder="File Name"
            required
            className="w-full p-2 border rounded-md mb-8"
          />
          <input
            type="file"
            onChange={handleFileChange}
            required
            className="w-full p-2 border rounded-md mb-8"
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDocumentModal;
