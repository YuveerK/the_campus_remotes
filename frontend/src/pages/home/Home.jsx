import React, { useEffect, useState } from "react";
import env from "react-dotenv";
import axios from "axios";
import OwnerModal from "./OwnerModal";
const Home = () => {
  const [owners, setOwners] = useState([]);
  const [selectedOwnerId, setSelectedOwnerId] = useState("");
  const [isViewOwnerModalClicked, setIsViewOwnerModalClicked] = useState(false);
  useEffect(() => {
    getOwners();
  }, []);

  const getOwners = async () => {
    try {
      const allOwners = await axios.get(`${env.BASE_URL}/get-owners`);
      setOwners(allOwners.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const viewOwner = (owner_id) => {
    console.log(owner_id);
    setSelectedOwnerId(owner_id);
    setIsViewOwnerModalClicked(true);
  };

  const closeModal = (payload) => {
    setIsViewOwnerModalClicked(payload);
  };
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <table className="min-w-full bg-white rounded-md shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              ID Document
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Surname
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Cell Phone Number
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner, index) => (
            <tr
              key={owner.owner_id}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="py-2 px-4 border-b border-gray-200 text-sm">
                {owner.id_number}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-sm">
                {owner.name}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-sm">
                {owner.surname}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-sm">
                {owner.email}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-sm">
                {owner.cell_phone_number}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-sm">
                {new Date(owner.created_at).toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-sm">
                <div
                  className="w-fit px-4 py-2 rounded-md text-white bg-green-500 text-center hover:bg-green-600 hover:cursor-pointer"
                  onClick={() => viewOwner(owner.owner_id)}
                >
                  <p>View Profile</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isViewOwnerModalClicked && (
        <OwnerModal closeModal={closeModal} owner_id={selectedOwnerId} />
      )}
    </div>
  );
};

export default Home;
