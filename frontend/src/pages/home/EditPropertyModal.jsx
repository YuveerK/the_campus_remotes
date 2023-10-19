import React, { useEffect, useState } from "react";
import axios from "axios";
import env from "react-dotenv";

const EditPropertyModal = ({
  owner_id,
  closeEditPropertyModal,
  property_id,
}) => {
  const [complexId, setComplexId] = useState("");
  const [unit, setUnit] = useState("");
  const [bedrooms, setBedrooms] = useState(null);
  const [bathrooms, setBathrooms] = useState(null);
  const [complexes, setComplexes] = useState("");
  const [complexName, setComplexName] = useState("");
  useEffect(() => {
    getComplexes();
    getPropertyInformation();
  }, []);

  const getComplexes = async () => {
    const response = await axios.get(`${env.BASE_URL}/complex`);

    setComplexes(response.data);
  };
  const getPropertyInformation = async () => {
    const response = await axios.get(
      `${env.BASE_URL}/property-info/${property_id}`
    );
    const data = response.data[0];
    console.log(data);
    setComplexId(data.complex_id);
    setUnit(data.unit);
    setBedrooms(data.bedrooms);
    setBathrooms(data.bathrooms);
    setComplexName(data.complex_name);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      complex_id: complexId,
      owner_id: owner_id,
      tenant_address:
        "The Campus, 152 Van Dalen Road South, Ruimsig, Roodepoort, Gauteng, 1724",
      unit: unit,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
    };
    try {
      await axios.put(`${env.BASE_URL}/update-property/${property_id}`, data);
      setComplexes("");
      setUnit("");
      setBedrooms("");
      setBathrooms("");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(complexName);
  return (
    <div className="w-full h-screen absolute top-0 left-0 flex items-center justify-center">
      <div className="w-[1000px] h-[1000px] bg-white shadow-md rounded-md p-8 overflow-auto">
        <div className="w-full flex items-center justify-end">
          <div
            className="w-fit px-4 py-2 bg-red-500 text-white text-center rounded-md hover:bg-red-600 hover:cursor-pointer "
            onClick={() => closeEditPropertyModal(false)}
          >
            <p>Close</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="complexId"
            >
              Complex
            </label>
            <select
              name="complexes"
              id="complexes"
              onChange={(e) => setComplexId(e.target.value)}
              className="w-full p-2 border rounded-md mb-8"
              required
              value={complexId} // Change complexName to complexId
            >
              <option className="w-full p-2 border rounded-md mb-8" value="">
                Please select a complex
              </option>
              {complexes &&
                complexes.map((complex, index) => (
                  <option
                    className="w-full p-2 border rounded-md mb-8"
                    value={complex.complex_id}
                    key={index}
                  >
                    {complex.complex_name}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="complexId"
            >
              Unit
            </label>
            <input
              required
              type="text"
              name="unit"
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full p-2 border rounded-md mb-8"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="complexId"
            >
              Bedrooms
            </label>
            <input
              required
              type="text"
              name="bedrooms"
              id="bedrooms"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full p-2 border rounded-md mb-8"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="complexId"
            >
              Bathrooms
            </label>
            <input
              required
              type="text"
              name="bathrooms"
              id="bathrooms"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              className="w-full p-2 border rounded-md mb-8"
            />
          </div>
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

export default EditPropertyModal;
