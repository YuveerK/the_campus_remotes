import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[280px] bg-gray-800 h-full">
      <div className="p-4 border-b">
        <h1 className="font-bold text-2xl text-white  text-center">
          The Campus Remote Tracking
        </h1>
      </div>
      <div className=" text-white w-full  p-4">
        <div className="font-bold text-xl mb-4">Menu</div>
        <ul>
          <li className="mb-2">
            <Link
              className="block p-2 rounded hover:bg-gray-600"
              to="/dashboard"
            >
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link
              className="block p-2 rounded hover:bg-gray-600"
              to="/complexes"
            >
              Complexes
            </Link>
          </li>
          <li className="mb-2">
            <Link className="block p-2 rounded hover:bg-gray-600" to="/owners">
              Owners
            </Link>
          </li>
          <li className="mb-2">
            <Link
              className="block p-2 rounded hover:bg-gray-600"
              to="/properties"
            >
              Properties
            </Link>
          </li>
          <li className="mb-2">
            <Link className="block p-2 rounded hover:bg-gray-600" to="/tenants">
              Tenants
            </Link>
          </li>
          <li className="mb-2">
            <Link
              className="block p-2 rounded hover:bg-gray-600"
              to="/vehicles"
            >
              Vehicles
            </Link>
          </li>
          <li className="mb-2">
            <Link className="block p-2 rounded hover:bg-gray-600" to="/remotes">
              Remotes
            </Link>
          </li>
          <li className="mb-2">
            <Link className="block p-2 rounded hover:bg-gray-600" to="/reports">
              Reports
            </Link>
          </li>
          <li className="mb-2">
            <Link
              className="block p-2 rounded hover:bg-gray-600"
              to="/settings"
            >
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
