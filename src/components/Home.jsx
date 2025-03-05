import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { addToPaste } from "../redux/pasteSlice"
import { editToPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParamas] = useSearchParams();
  const dispatch = useDispatch();
  const pasteId = searchParams.get("pasteId");
  const allPastes = useSelector((state)=> state.paste.pastes);
  const navigate = useNavigate();

  useEffect(() => {
    if (pasteId && allPastes.length > 0) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  const createPaste=()=>{
    if (!title.trim() || !value.trim()) {
      toast.error("Title and Content cannot be empty!"); // Show error message
      return;
    }
    const paste ={
        title:title,
        content:value,
        _id: pasteId || Date.now().toString(34),
        createdAt:new Date(). toISOString(),
    }
    if(pasteId){
        dispatch(editToPaste(paste))
        //update

    }
    else{
        //create
        dispatch(addToPaste(paste))
    }
    //after creation or updation clear everything
    setTitle("");
    setValue("");
    setSearchParamas({});

    navigate("/");
  }
  return (
    <div>
      <div className="flex flex-row gap-8 sm:place-content-between">
        <input
          type="text"
          className="p-1 rounded-lg mt-2 w-[40%] pl-3 sm:w-[60%]"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="p-1 rounded-md mt-2 md:mr-10" onClick={createPaste}>
          {pasteId ? "Update Paste" : "Create My Paste"}
        </button>
      </div>
      <div className="mt-6">
        <textarea
        className="rounded-2xl mr-14 mt-2 min-w-[300px] p-4 sm:min-w-[500px]"
        value={value}
        placeholder="Enter Content here"
        onChange={(e) => setValue(e.target.value)}
        rows={20}
         />
      </div>
    </div>
  );
};

export default Home;
