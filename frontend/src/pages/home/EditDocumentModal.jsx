import React, { useEffect, useState } from "react";
import axios from "axios";
import env from "react-dotenv";

const EditDocumentModal = ({
  owner_id,
  closeEditDocumentModal,
  documents_id,
}) => {
  const [file, setFile] = useState(null);
  const [document, setDocument] = useState({});
  const [fileName, setFileName] = useState(document.file_name);

  useEffect(() => {
    getDocument();
  }, []);

  const getDocument = async () => {
    const response = await axios.get(
      `${env.BASE_URL}/get-document/${documents_id}`
    );
    setDocument(response.data[0]);
    setFileName(response.data[0].file_name);
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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
    formData.append("tenant_id", null);
    formData.append("file_name", fileName);

    try {
      const response = await axios.put(
        `${env.BASE_URL}/update-document/${documents_id}`,
        formData
      );
      console.log("File uploaded successfully:", response.data);
      //   closeEditDocumentModal(false);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  console.log(fileName);
  return (
    <div className="w-full h-screen absolute top-0 left-0 flex items-center justify-center">
      <div className="w-[1000px] h-[1000px] bg-white shadow-md rounded-md p-8 overflow-auto">
        <div className="w-full flex items-center justify-end">
          <div
            className="w-fit px-4 py-2 bg-red-500 text-white text-center rounded-md hover:bg-red-600 hover:cursor-pointer "
            onClick={() => closeEditDocumentModal(false)}
          >
            <p>Close</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            value={fileName} // Updated this line
            onChange={(e) => setFileName(e.target.value)}
            placeholder="File Name"
            required
            className="w-full p-2 border rounded-md mb-8"
          />

          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md "
          />
          <p className="mb-8">{document.file_path}</p>
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

export default EditDocumentModal;
