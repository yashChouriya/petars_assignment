import React, { useEffect, useState } from "react";
import Navbar from "../utils/navbar";
import { debounce } from "lodash";
import AuthApiClient from "../utils/api";

const EditDoc = () => {
  // let doc = JSON.parse(localStorage.getItem('editDoc'));
  const [doc, setDoc] = useState({});
  const [text, setText] = useState(doc.text);
  let docId = window.location.pathname.substring(15);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getFile();
  }, []);

  const getFile = async () => {
    let { data: response } = await AuthApiClient.get(
      "/document/view/" + docId,
      {
        headers: {
          authorization: `Token ${token}`,
        },
      }
    );
    setText(response.text);
    setDoc(response);
  };

  const debouncedInputs = debounce(async (value) => {
    const updateData = {
      context: doc.context,
      text: value,
    };
    // setText(update.context);
    await AuthApiClient.put("/document/update/" + doc.id + "/", updateData, {
      headers: {
        authorization: `Token ${token}`,
      },
    });
  }, 500); // Debounce delay of 500 milliseconds

  const handleChange = (e) => {
    setText(e.target.value);
    if (!e.target.value) return;
    debouncedInputs(e.target.value);
  };

  return (
    <div>
      <div className="editDocContainer">
        <Navbar
          value={doc.context}
          createOrEdit="last Edited By : "
          createdOrEdited={doc.modified_by_id}
          page="Edit Document"
        />
        <textarea onChange={handleChange} value={text} />
        {/* <div className="editDocFooter">
footer
                </div> */}
      </div>
    </div>
  );
};

export default EditDoc;
