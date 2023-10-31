import React, { useState } from 'react';

const API = process.env.REACT_APP_API
// const TOKEN = process.env.TOKEN_AUTH_JWT
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW8ifQ.PuRbZekcfxsKPo92zbIXFQD04N8HHk6ZDoRGvTxjOEs'

const ModalRisk = ({ getLocalRisks ,formDataRisk , setFormDataRisk, clearFormDataRisk, idRisk, editingRisk}) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDataRisk({ ...formDataRisk, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingRisk) {
      const res = await fetch(`${API}/risk/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': TOKEN
        },
        body: JSON.stringify(formDataRisk)
      })
    } else {
      const res = await fetch(`${API}/risk/${idRisk}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': TOKEN
        },
        body: JSON.stringify(formDataRisk)
      })
    }
    document.getElementById('btn-close').click();
    clearFormDataRisk();
    getLocalRisks();
  };



  return (
      <>
        <div className="modal fade" id="riskModal" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog">
            <form onSubmit={handleSubmit}>
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Create/Update Risk
                  </h1>
                  <button type="button" className="btn-close" id="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlName" className="form-label">
                      Name
                    </label>
                    <input type="text" className="form-control" name="name" required value={formDataRisk.name || ''} onChange={handleInputChange} placeholder="Type a name"/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlCountry" className="form-label">
                      Contry
                    </label>
                    <input type="text" className="form-control" name="country" required value={formDataRisk.country || ''} onChange={handleInputChange} placeholder="Type your country"/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlImpact" className="form-label">
                      Impact
                    </label>
                    <input type="text" className="form-control" name="impact" required value={formDataRisk.impact || ''} onChange={handleInputChange} placeholder="Type the impact"/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlProbability" className="form-label">
                      Probability
                    </label>
                    <input type="text" className="form-control" name="probability" required value={formDataRisk.probability || ''} onChange={handleInputChange} placeholder="Type the probability"/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlLevel" className="form-label">
                      Level
                    </label>
                    <input type="text" className="form-control" name="level" required value={formDataRisk.level || ''} onChange={handleInputChange} placeholder="Type the level"/>
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

export default ModalRisk;
