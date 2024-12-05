import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";

const Profile = () => {
  const [error, setError] = useState(null);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const {backendUrl} = useContext(AppContext)

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen w-full">
      {user.profile_pic && (
        <img
          src={`${backendUrl}/${user.profile_pic}`}
          alt="Profile"
          width={80}
          className="rounded-full h-20 w-20 my-5 mx-auto"
        />
      )}

      <table className="min-w-full border border-collapse border-black">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left border border-black">Field</th>
            <th className="px-4 py-2 text-left border border-black">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border border-black">Username</td>
            <td className="px-4 py-2 border border-black">{user.name || "NA"}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border border-black">Email</td>
            <td className="px-4 py-2 border border-black">{user.email || "NA"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
