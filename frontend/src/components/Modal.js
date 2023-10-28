import React, { useState } from 'react';

const API = process.env.REACT_APP_API

const Modal = ({ getRiesgosLocal ,formData , setFormData, clearFormData, idRiesgo, editing}) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Algo1', editing, idRiesgo)
    if (!editing) {
      console.log('entro')
      const res = await fetch(`${API}/riesgo/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
    } else {
      const res = await fetch(`${API}/riesgo/${idRiesgo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
    }
    document.getElementById('btn-close').click();
    clearFormData();
    getRiesgosLocal();
  };



  return (
      <>
        <div className="modal fade" id="riesgoModal" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog">
            <form onSubmit={handleSubmit}>
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Crear/Editar Riesgo
                  </h1>
                  <button type="button" className="btn-close" id="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                      Nombre
                    </label>
                    <input type="text" className="form-control" name="name" value={formData.name || ''} onChange={handleInputChange} placeholder="Escriba un nombre"/>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                  <button type="submit" className="btn btn-primary">Guardar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
  );
};

export default Modal;
