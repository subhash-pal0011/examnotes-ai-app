import React, { useEffect, useState } from "react";
import axios from "axios";

const RightHistory = ({ notesId }) => {
  const [noteDetail, setNoteDetail] = useState(null);

  useEffect(() => {
    if (!notesId) return;

    const getResult = async () => {
      try {
        const res = await axios.get(`/api/history/${notesId}`);
        if (res.data.success) {
          setNoteDetail(res.data.data); 
        }
      } catch (error) {
        console.log("getNotes error:", error);
      }
    };

    getResult();
  }, [notesId]);

  if (!notesId)
    return (
      <div className="flex md:flex-row flex-col items-center justify-center h-screen w-full">
        <img src="/Loader_cat.gif" className="h-30 w-30" />
        <p className="text-gray-700 text-lg font-semibold capitalize line-clamp-1">Select a note to see details</p>
      </div>
    );

  return (
    <div className="w-full px-4 p-2 min-h-screen rounded bg-green-50 shadow">
      {noteDetail ? (
        <div>
          <h2 className="font-bold text-lg text-gray-800">{noteDetail.topic}</h2>
          <p className="text-sm">{noteDetail.examType}</p>
          <div className="mt-2 text-sm whitespace-pre-wrap">{noteDetail.content}</div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RightHistory;
