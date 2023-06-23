import React, { useEffect, useState } from "react";
import AuthApiClient from "../utils/api";

const Contents = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data: response } = await AuthApiClient.get("/document/view/", {
      headers: {
        authorization: `Token ${token}`,
      },
    });
    setData(response);
  };

  // const handleDelete = (i) => {
  //     setFilterData(filterData.filter(filter=>filter.id!==i.id));
  // }

  const handleViewClick = (i) => {
    window.location.href = "/document/view/" + i.id;
  };

  const handleEditClick = (i) => {
    window.location.href = "/document/edit/" + i.id;
  };

  return (
    <div>
      <div className="contentContainer" style={{ width: "100%" }}>
        {data.map((i) => (
          <div className="card" key={i.id}>
            <div className="file">{i.context}</div>
            <div className="cardFooter">
              <button id="view" onClick={() => handleViewClick(i)}>
                View
              </button>
              {/* <button id="delete" onClick={()=>handleDelete(i)}>Delete</button> */}
              <button id="edit" onClick={() => handleEditClick(i)}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contents;
