import React, {useState, useEffect, useMemo} from 'react';
import ModalUser from './Modal';
import {getUsers, getUser, deleteUser} from './Common';
import {MantineReactTable, useMantineReactTable} from "mantine-react-table";
import {ActionIcon, Box} from "@mantine/core";
import {IconEdit, IconTrash} from "@tabler/icons-react";
import { ToastContainer } from 'react-toastify';



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

    const columns = useMemo(
      () => [
        {
          header: 'Username',
          accessorKey: 'username',
        },
        {
          header: 'Password',
          accessorKey: 'password',
        },
      ],
      [],
    );

    const table = useMantineReactTable({
        columns,
        data: users,
        enableColumnOrdering: true,
        enableGlobalFilter: true,
        enableRowActions: true,
        renderRowActions: ({ row }) => (
          <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
            <ActionIcon
              color="gray"
              data-bs-toggle="modal"
              data-bs-target="#userModal"
              onClick={() => {
                editLocalUser(row.original._id);
              }}
            >
              <IconEdit />
            </ActionIcon>
            <ActionIcon
              color="red"
              onClick={() => {
                deleteLocalUser(row.original._id)
              }}
            >
              <IconTrash />
            </ActionIcon>
          </Box>
        ),
    });

    useEffect(() => {
        getLocalUsers();
    }, []);

    return (
        <>
            <button type="button" className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#userModal" onClick={resetEditUser}>
              Create User
            </button>
            <div className="mb-3">
               <MantineReactTable table={table}/>
            </div>
            <ModalUser getLocalUsers={getLocalUsers} formDataUser={formDataUser} setFormDataUser={setFormDataUser} clearFormDataUser={clearFormDataUser} idUser={idUser} editingUser={editingUser}/>
            <ToastContainer pauseOnHover theme="dark" position="bottom-right"/>
        </>
    )
}