import axios from "axios";
import React, { useEffect, useState } from "react";
import env from "react-dotenv";
import AddPropertyModal from "./AddPropertyModal";
import { BsHouseDoor } from "react-icons/bs";
import { AiOutlineEye, AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import EditPropertyModal from "./EditPropertyModal";
const Properties = ({ owner_id }) => {
  const [properties, setProperties] = useState([]);
  const [isAddPropertyClicked, setIsAddPropertyClicked] = useState(false);
  const [isEditPropertyClicked, setIsEditPropertyClicked] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const getProperties = async () => {
    try {
      const response = await axios.get(
        `${env.BASE_URL}/owner-property-info/${owner_id}`
      );
      setProperties(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  const closeAddPropertyModal = (payload) => {
    setIsAddPropertyClicked(payload);
    getProperties();
  };

  const closeEditPropertyModal = (payload) => {
    setIsEditPropertyClicked(payload);
    getProperties();
  };
  const editProperty = (property_id) => {
    setIsEditPropertyClicked(true);
    setSelectedProperty(property_id);
  };
  return (
    <div>
      <div
        onClick={() => setIsAddPropertyClicked(true)}
        className="w-fit px-4 py-2 bg-green-500 hover:bg-green-600 hover:cursor-pointer text-white rounded-md"
      >
        <p>Add Property</p>
      </div>
      <div className="w-full flex items-center justify-around flex-wrap">
        {properties.map((property, index) => (
          <div className="flex items-center flex-col justify-center">
            <BsHouseDoor size={100} />
            <p>{`Unit ${property.unit}`}</p>
            <div className="flex items-center mt-2">
              <div
                onClick={() => editProperty(property.property_id)}
                className=" p-2 rounded-md"
              >
                <AiOutlineEdit
                  className=" text-orange-500 hover:cursor-pointer"
                  size={26}
                />
              </div>
              <div className=" p-2 rounded-md">
                <AiFillDelete
                  className="text-red-500 hover:cursor-pointer"
                  size={26}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {isAddPropertyClicked && (
        <AddPropertyModal
          owner_id={owner_id}
          closeAddPropertyModal={closeAddPropertyModal}
        />
      )}
      {isEditPropertyClicked && (
        <EditPropertyModal
          owner_id={owner_id}
          closeEditPropertyModal={closeEditPropertyModal}
          property_id={selectedProperty}
        />
      )}
    </div>
  );
};

export default Properties;
