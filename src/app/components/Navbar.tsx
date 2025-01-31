import React from "react";
// import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  // const navigate = useNavigate();

  return (
    <nav className="bg-green-700 flex items-center justify-between px-6 py-2">
      <img src="/image/Logo.jpg" alt="Placeholder Image" className="w-9 h-10 " />

      <div className="flex gap-4">
        {["/page1", "/page2", "/page3", "/page4"].map((path, index) => (
          <button
            key={index}
            // onClick={() => navigate(path)}
            className="w-10 h-10 bg-white rounded-full hover:bg-gray-200 transition flex items-center justify-center border-2 border-gray"
          >
            {index === 3 ? (
              <img
                src="/image/ProfilePicture.jpg"
                alt="Circle 4"
                className="w-10 h-10 rounded-full "
              />
            ) : null}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;