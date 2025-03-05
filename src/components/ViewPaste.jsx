
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
      <div className="flex flex-row gap-5 place-content-between">
        <input
          type="text"
          className="p-1 rounded-lg mt-2 w-[100%] pl-3 md:w-[66%]"
          value={paste.title || ""}
          disabled
        />
      </div>
      <div className="mt-1 md:mt-4">
        <textarea
          className="rounded-2xl mt-2 min-w-[300px] p-4 md:w-[500px]"
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
