
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  console.log("URL ID:", id); 
  const paste = allPastes.find((p) => String(p._id) === String(id));

  if (!paste) {
    return (
      <div>
        <h2>Paste Not Found</h2>
        <Link to="/">Go Back</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Viewing Paste</h2>
      <div className="flex flex-row gap-6 place-content-between">
        <input
          type="text"
          className="p-1 rounded-lg mt-2 w-[66%] pl-3"
          value={paste.title || ""}
          disabled
        />
      </div>
      <div className="mt-6">
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4"
          value={paste.content || ""}
          disabled
          rows={20}
        />
      </div>
      <br />
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default ViewPaste;
