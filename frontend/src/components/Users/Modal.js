import React, { useState } from 'react';

const API = process.env.REACT_APP_API
// const TOKEN = process.env.TOKEN_AUTH_JWT
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW8ifQ.PuRbZekcfxsKPo92zbIXFQD04N8HHk6ZDoRGvTxjOEs'

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
          'Content-Type': 'application/json',
          'Authorization': TOKEN
        },
        body: JSON.stringify(formDataUser)
      })
    } else {
      const res = await fetch(`${API}/riesgo/${idUser}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': TOKEN
        },
        body: JSON.stringify(formDataUser)
      })
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
                    <input type="text" className="form-control mb-2" name="username" value={formDataUser.username || ''} onChange={handleInputChange} placeholder="Set a username"/>
                    <label htmlFor="exampleFormControlInput2" className="form-label">
                      Password
                    </label>
                    <input type="password" className="form-control mb-2" name="password" value={formDataUser.password || ''} onChange={handleInputChange} placeholder="Set the password"/>
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
