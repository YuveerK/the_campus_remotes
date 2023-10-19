import React, { useEffect, useState } from "react";
import AddDocumentModal from "./AddDocumentModal";
import axios from "axios";
import env from "react-dotenv";
import { FcDocument } from "react-icons/fc";
import EditDocumentModal from "./EditDocumentModal";
const Documents = ({ owner_id }) => {
  const [isAddDocumentClicked, setIsAddDocumentClicked] = useState(false);
  const [isEditDocumentClicked, setIsEditDocumentClicked] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState("");
  useEffect(() => {
    getDocuments();
  }, []);

  const getDocuments = async () => {
    const response = await axios.get(
      `${env.BASE_URL}/get-owner-documents/${owner_id}`
    );
    setDocuments(response.data);
  };
  const closeModal = (payload) => {
    setIsAddDocumentClicked(payload);
    getDocuments();
  };

  const closeEditDocumentModal = (payload) => {
    setIsEditDocumentClicked(payload);
  };

  const editDocument = (documentId) => {
    setIsEditDocumentClicked(true);
    setSelectedDocument(documentId);
  };
  return (
    <div>
      <div
        onClick={() => setIsAddDocumentClicked(true)}
        className="w-fit bg-green-500 rounded-md px-4 py-2 hover:bg-green-600 hover:cursor-pointer text-white"
      >
        <p>Add Document</p>
      </div>
      <div className="w-full flex items-center justify-around flex-wrap mt-8">
        <table width={"100%"}>
          <thead className="bg-gray-100 border-b-4">
            <tr className="text-left">
              <th className="p-4">File Name</th>
              <th className="p-4 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document, index) => (
              <tr className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="p-4 w-[50%]">{document.file_name}</td>
                <td className="p-4 w-[50%] flex items-center ">
                  <a
                    href={`${env.BASE_URL}/uploads/${document.file_path}`}
                    download={document.file_path}
                    target="__blank"
                    className="w-fit bg-green-500 rounded-md px-4 py-2 hover:bg-green-600 hover:cursor-pointer text-white"
                  >
                    Download
                  </a>
                  <div
                    onClick={() => editDocument(document.documents_id)}
                    className="w-fit mx-8 bg-orange-500 rounded-md px-4 py-2 hover:bg-orange-600 hover:cursor-pointer text-white"
                  >
                    Edit
                  </div>
                  <div className="w-fit bg-red-500 rounded-md px-4 py-2 hover:bg-red-600 hover:cursor-pointer text-white">
                    Delete
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isAddDocumentClicked && (
        <AddDocumentModal closeModal={closeModal} owner_id={owner_id} />
      )}

      {isEditDocumentClicked && (
        <EditDocumentModal
          owner_id={owner_id}
          closeEditDocumentModal={closeEditDocumentModal}
          documents_id={selectedDocument}
        />
      )}
    </div>
  );
};

export default Documents;
