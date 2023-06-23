import React, { useEffect, useState } from 'react';
import Modal from './modal';
import AuthApiClient from './api';

const Navbar = ({ value, createOrEdit, createdOrEdited,page }) => {

    const [data, setData] = useState([]);
    let docId=window.location.pathname.substring(15);
    const token = localStorage.getItem('token')
    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const { data: response } = await AuthApiClient.get('/document/view/'+docId, {
            headers: {
                authorization: `Token ${token}`,
        
            },
        });
        setData(response)
    }

    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleClick = (e) => {
        e.preventDefault();
        handleOpenModal();
    }

    const handleAdd = async() => {
        let x = document.getElementById('addTF').value;
        let newData = {
            text:"Write here...",
            context:x
        }
        await AuthApiClient.post('/document/add/',newData,{
            headers: {
                authorization: `Token ${token}`,
        
            }});
        handleCloseModal();
        window.location.href='/dashboard';
    }

    const handleLogout=()=>{
        localStorage.clear();
        localStorage.clear();
        window.location.href='/';
    }



    return (
        <div>
            <div className="navbarContainer">
                {/* <div className="logo"></div> */}
                <p>{page}</p>
                <p>{value}<br />

                    <span>{createOrEdit}{createdOrEdited}</span>


                </p>
                <div className="accounts">
                    {window.location.pathname === '/dashboard' ? (
                        <span onClick={handleClick}>+</span>
                    ) : null}
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <div className='modalDiv'>
                <Modal isOpen={modalOpen} onClose={handleCloseModal}>
                    <h5 className="mt-3 mb-3">Enter the Name of New Document</h5>
                    <input type="text" className="my-2" placeholder="Enter Doc Name" id="addTF" /><br />
                    <button id='add' onClick={handleAdd}>Add Document</button>
                </Modal></div>
        </div>
    );
};

export default Navbar;