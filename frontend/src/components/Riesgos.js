import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { getRiesgos, editRiesgo, deleteRiesgo } from './CRUD';



export const Riesgos = () => {

    const [riesgos, setRiesgos] = useState([])

    const [formData, setFormData] = useState({});

    const [idRiesgo, setIdRiesgo] = useState(false);

    const [editing, setEditing] = useState(false);

    const getRiesgosLocal = async (e) => {
        const data = await getRiesgos();
        setRiesgos(data);
    }

    const editRiesgoLocal = async (e) => {
        const data = await editRiesgo(e)
        setEditing(true)
        setIdRiesgo(e)
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                setFormData(prevFormData => {
                    return { ...prevFormData, [key]: data[key] };
                });
            }
        }
    }

    const deleteRiesgoLocal = async (e) => {
        await deleteRiesgo(e)
        await getRiesgosLocal();
    }

    const clearFormData = () => {
          const emptyFormData = {};
          for (const key in formData) {
              if (formData.hasOwnProperty(key)) {
                  emptyFormData[key] = '';
              }
          }
          setFormData(emptyFormData);
      }

    const resetEdit = () => {
        setEditing(false);
        setIdRiesgo('');
    };

    useEffect(() => {
        getRiesgosLocal();
    }, []);

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#riesgoModal" onClick={resetEdit}>
              Crear Riesgo
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
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                    {riesgos.map(riesgo =>(
                        <tr key={riesgo._id}>
                            <td>{riesgo.name}</td>
                            <td>Marketing Designer</td>
                            <td>London</td>
                            <td>66</td>
                            <td>2012-11-27</td>
                            <td>$198,500</td>
                            <td className="p-0">
                                <button type="button" className="btn btn-link p-0 m-1 text-decoration-none" data-bs-toggle="modal" data-bs-target="#riesgoModal" onClick={() => editRiesgoLocal(riesgo._id)}>
                                    <b>Editar</b>
                                </button>
                                <br></br>
                                <button type="button" className="btn btn-link p-0 m-1 text-decoration-none" onClick={() => deleteRiesgoLocal(riesgo._id)}>
                                    <b>Eliminar</b>
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <Modal getRiesgosLocal={getRiesgosLocal} formData={formData} setFormData={setFormData} clearFormData={clearFormData} idRiesgo={idRiesgo} editing={editing}/>
        </>
    )
}