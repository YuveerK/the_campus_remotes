import React, { useEffect, useState } from "react";
import env from "react-dotenv";
import axios from "axios";
import { ownerTabs } from "../../constants/view-owner-modal-tab-options.constant";
import Profile from "./Profile";
import Documents from "./Documents";
import Properties from "./Properties";
const OwnerModal = ({ owner_id, closeModal }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <div className="w-full h-screen absolute top-0 left-0 bg-black/50 flex items-center justify-center">
      <div className="w-[1000px] h-[1000px] bg-white shadow-md rounded-md p-8 overflow-auto">
        <div className="w-full flex items-center justify-end">
          <div
            className="w-fit px-4 py-2 bg-red-500 text-white text-center rounded-md hover:bg-red-600 hover:cursor-pointer "
            onClick={() => closeModal(false)}
          >
            <p>Close</p>
          </div>
        </div>

        <div className="mt-8">
          <div className="w-full mb-8 flex items-center">
            {ownerTabs.map((tab, index) => (
              <div
                className={`p-2 ml-8 ${
                  selectedTabIndex === index
                    ? "border-b-4 border-b-blue-500"
                    : ""
                } hover:bg-blue-500 hover:cursor-pointer hover:text-white hover:rounded-md`}
                onClick={() => setSelectedTabIndex(index)}
                key={index}
              >
                <p className="">{tab}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
        </div>

        {selectedTabIndex === 0 && <Profile owner_id={owner_id} />}
        {selectedTabIndex === 1 && <Documents owner_id={owner_id} />}
        {selectedTabIndex === 2 && <Properties owner_id={owner_id} />}
      </div>
    </div>
  );
};

export default OwnerModal;
