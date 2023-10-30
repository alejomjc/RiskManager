import React, { useState, useEffect } from 'react';
import ModalUser from './Modal';
import {getUsers, getUser, deleteUser} from './CRUD';



export const Users = () => {

    const [users, setUsers] = useState([])

    const [formDataUser, setFormDataUser] = useState({});

    const [idUser, setIdUser] = useState(false);

    const [editingUser, setEditingUser] = useState(false);

    const getLocalUsers = async (e) => {
        const data = await getUsers();
        setUsers(data);
    }

    const editLocalUser = async (e) => {
        const data = await getUser(e)
        setEditingUser(true)
        setIdUser(e)
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                setFormDataUser(prevFormData => {
                    return { ...prevFormData, [key]: data[key] };
                });
            }
        }
    }

    const deleteLocalUser = async (e) => {
        await deleteUser(e)
        await getLocalUsers();
    }

    const clearFormDataUser = () => {
          const emptyFormData = {};
          for (const key in formDataUser) {
              if (formDataUser.hasOwnProperty(key)) {
                  emptyFormData[key] = '';
              }
          }
          setFormDataUser(emptyFormData);
      }

    const resetEditUser = () => {
        clearFormDataUser();
        setEditingUser(false);
        setIdUser('');
    };

    useEffect(() => {
        getLocalUsers();
    }, []);

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#userModal" onClick={resetEditUser}>
              Create User
            </button>
            <table className="table table-striped" style={{width: "100%"}}>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                    {users.map(user =>(
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td className="p-0">
                                <button type="button" className="btn btn-link p-0 m-1 text-decoration-none" data-bs-toggle="modal" data-bs-target="#userModal" onClick={() => editLocalUser(user._id)}>
                                    <b>Edit</b>
                                </button>
                                <br></br>
                                <button type="button" className="btn btn-link p-0 m-1 text-decoration-none" onClick={() => deleteLocalUser(user._id)}>
                                    <b>Delete</b>
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <ModalUser getLocalUsers={getLocalUsers} formDataUser={formDataUser} setFormDataUser={setFormDataUser} clearFormDataUser={clearFormDataUser} idUser={idUser} editingUser={editingUser}/>
        </>
    )
}