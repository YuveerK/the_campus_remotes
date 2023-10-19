import axios from "axios";
import React, { useEffect, useState } from "react";
import env from "react-dotenv";

const Profile = ({ owner_id }) => {
  const [cellphoneNumber, setCellphoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  useEffect(() => {
    getOwnerInfo();
  }, []);

  const getOwnerInfo = async () => {
    try {
      const response = await axios.get(`${env.BASE_URL}/get-owner/${owner_id}`);
      const ownerInfo = response.data;

      setCellphoneNumber(ownerInfo.cell_phone_number);
      setEmail(ownerInfo.email);
      setIdNumber(ownerInfo.id_number);
      setName(ownerInfo.name);
      setSurname(ownerInfo.surname);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const updateOwner = async () => {
    try {
      const data = {
        id_number: idNumber,
        name: name,
        surname: surname,
        email: email,
        cell_phone_number: cellphoneNumber,
      };
      const response = await axios.put(
        `${env.BASE_URL}/update-owner/${owner_id}`,
        data
      );
      const ownerInfo = response.data;
      setCellphoneNumber(ownerInfo.cell_phone_number);
      setEmail(ownerInfo.email);
      setIdNumber(ownerInfo.id_number);
      setName(ownerInfo.name);
      setSurname(ownerInfo.surname);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="bg-gray-100 p-4 rounded-md mt-8">
        <label className="text-gray-500 mb-2 block" htmlFor={name}>
          Name
        </label>
        <input
          id={name}
          name={name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="bg-gray-100 p-4 rounded-md mt-8">
        <label className="text-gray-500 mb-2 block" htmlFor={surname}>
          Surname
        </label>
        <input
          id={surname}
          name={surname}
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="bg-gray-100 p-4 rounded-md mt-8">
        <label className="text-gray-500 mb-2 block" htmlFor={email}>
          Email
        </label>
        <input
          id={email}
          name={email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="bg-gray-100 p-4 rounded-md mt-8">
        <label className="text-gray-500 mb-2 block" htmlFor={idNumber}>
          ID Number
        </label>
        <input
          id={idNumber}
          name={idNumber}
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="bg-gray-100 p-4 rounded-md mt-8">
        <label className="text-gray-500 mb-2 block" htmlFor={cellphoneNumber}>
          Cellphone Number
        </label>
        <input
          id={cellphoneNumber}
          name={cellphoneNumber}
          value={cellphoneNumber}
          onChange={(e) => setCellphoneNumber(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mt-8">
        <div
          onClick={() => updateOwner()}
          className="w-fit px-4 py-2 bg-green-500 text-white text-center rounded-md hover:bg-green-600 hover:cursor-pointer "
        >
          <p>Update Profile</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
