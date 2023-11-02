import React, { useState } from 'react';
import {toast} from "react-toastify";

const API = process.env.REACT_APP_API

const ModalUser = ({ getLocalUsers ,formDataUser , setFormDataUser, clearFormDataUser, idUser, editingUser}) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataUser({ ...formDataUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingUser) {
      const res = await fetch(`${API}/user/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataUser)
      })
      const data = await res.json();
      if (res.status === 200) {
          toast.success(data.message);
      } else {
          toast.error(data.message);
      }
    } else {
      const res = await fetch(`${API}/user/${idUser}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataUser)
      })
      const data = await res.json();
      if (res.status === 200) {
          toast.success(data.message);
      } else {
          toast.error(data.message);
      }
    }
    document.getElementById('btn-close').click();
    clearFormDataUser();
    getLocalUsers();
  };



  return (
      <>
        <div className="modal fade" id="userModal" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog">
            <form onSubmit={handleSubmit}>
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Create/Update User
                  </h1>
                  <button type="button" className="btn-close" id="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                      Username
                    </label>
                    <input type="text" className="form-control mb-2" name="username" required value={formDataUser.username || ''} onChange={handleInputChange} placeholder="Set a username"/>
                    <label htmlFor="exampleFormControlInput2" className="form-label">
                      Password
                    </label>
                    <input type="password" className="form-control mb-2" name="password" required onChange={handleInputChange} placeholder="Set the password"/>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
  );
};

export default ModalUser;
