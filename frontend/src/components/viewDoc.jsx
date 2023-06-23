import React, { useEffect, useState } from 'react';
import Navbar from '../utils/navbar';
import AuthApiClient from '../utils/api';

const Viewdoc = () => {
    const [doc, setDoc] = useState({});
    const [text, setText] = useState(doc.text);
    let docId=window.location.pathname.substring(15);
    const token = localStorage.getItem('token');


    useEffect(() => {
        const getFile = async () => {
            let {data:response} = await AuthApiClient.get('/document/view/'+docId,{
                headers: {
                    authorization: `Token ${token}`,
            
                }});
            setText(response.text)
            setDoc(response);
        }
        const interval = setInterval(getFile, 200);
        return () => {
            clearInterval(interval); // Clean up the interval on component unmount
          };
    }, []);


    return (
        <div>
            <div className="viewDocContainer">
                <Navbar value={doc.context} createOrEdit="Created By : " createdOrEdited={doc.host_id}  page="View Document"/>
                <textarea defaultValue={text} disabled />
                {/* <div className="ViewDocFooter">
footer
                </div> */}
            </div>
        </div>
    );
};

export default Viewdoc;