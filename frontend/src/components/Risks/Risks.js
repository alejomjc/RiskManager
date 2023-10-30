import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import {getRisks, getRisk, deleteRisk} from './CRUD';
import ModalRisk from "./Modal";



export const Risks = () => {

    const [risks, setRisks] = useState([])

    const [formDataRisk, setFormDataRisk] = useState({});

    const [idRisk, setIdRisk] = useState(false);

    const [editingRisk, setEditingRisk] = useState(false);

    const getLocalRisks = async (e) => {
        const data = await getRisks();
        setRisks(data);
    }

    const editLocalRisk = async (e) => {
        const data = await getRisk(e)
        setEditingRisk(true)
        setIdRisk(e)
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                setFormDataRisk(prevFormData => {
                    return { ...prevFormData, [key]: data[key] };
                });
            }
        }
    }

    const deleteLocalRisk = async (e) => {
        await deleteRisk(e)
        await getLocalRisks();
    }

    const clearFormDataRisk = () => {
          const emptyFormData = {};
          for (const key in formDataRisk) {
              if (formDataRisk.hasOwnProperty(key)) {
                  emptyFormData[key] = '';
              }
          }
          setFormDataRisk(emptyFormData);
      }

    const resetEditRisk = () => {
        clearFormDataRisk();
        setEditingRisk(false);
        setIdRisk('');
    };

    useEffect(() => {
        getLocalRisks();
    }, []);

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#riskModal" onClick={resetEditRisk}>
              Create Risk
            </button>
            <table id="example" className="table table-striped" style={{width: "100%"}}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Office</th>
                    <th>Age</th>
                    <th>Start date</th>
                    <th>Salary</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {risks.map(risk =>(
                        <tr key={risk._id}>
                            <td>{risk.name}</td>
                            <td>Marketing Designer</td>
                            <td>London</td>
                            <td>66</td>
                            <td>2012-11-27</td>
                            <td>$198,500</td>
                            <td className="p-0">
                                <button type="button" className="btn btn-link p-0 m-1 text-decoration-none" data-bs-toggle="modal" data-bs-target="#riskModal" onClick={() => editLocalRisk(risk._id)}>
                                    <b>Edit</b>
                                </button>
                                <br></br>
                                <button type="button" className="btn btn-link p-0 m-1 text-decoration-none" onClick={() => deleteLocalRisk(risk._id)}>
                                    <b>Delete</b>
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <ModalRisk getLocalRisks={getLocalRisks} formDataRisk={formDataRisk} setFormDataRisk={setFormDataRisk} clearFormDataRisk={clearFormDataRisk} idRisk={idRisk} editingRisk={editingRisk}/>
        </>
    )
}