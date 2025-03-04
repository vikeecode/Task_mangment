
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteToPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(deleteToPaste(pasteId));
  }

  function handleShare(pasteId) {
    const shareableLink = `${window.location.origin}/pastes/${pasteId}`;
    navigator.clipboard.writeText(shareableLink);
    toast.success("Link copied! Share it with others.");
  }

  return (
    <div className="border p-4">
      <input
        type="text"
        className="p-2 rounded-xl min-w-[500px] mt-4"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-3 mt-3">
        {filteredData.length > 0 &&
          filteredData.map((paste) => (
            <div key={paste._id} className="border border-zinc-400 p-4 rounded-md">
              <div><strong>Title:</strong> {paste.title}</div>
              <div><strong>Content:</strong> {paste.content}</div>
              <div className="flex flex-row gap-3 place-content-evenly mt-2">
                <button>
                  <Link to={`/?pasteId=${paste._id}`}>Edit</Link>
                </button>
                <button>
                  <Link to={`/pastes/${paste._id}`}>View</Link>
                </button>
                <button onClick={() => handleDelete(paste._id)}>Delete</button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Copied to clipboard!");
                  }}
                >
                  Copy
                </button>
                <button onClick={() => handleShare(paste._id)}>Share</button>
              </div>
              <div className="text-gray-500 text-sm mt-2">{paste.createdAt}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Paste;
