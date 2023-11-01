import React, {useState, useEffect, useMemo} from 'react';
import {getRisks, getRisk, deleteRisk} from './CRUD';
import ModalRisk from "./Modal";

import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { ActionIcon, Box } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const API = process.env.REACT_APP_API;
// const TOKEN = process.env.TOKEN_AUTH_JWT
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW8ifQ.PuRbZekcfxsKPo92zbIXFQD04N8HHk6ZDoRGvTxjOEs'




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

    const columns = useMemo(
      () => [
        {
          header: 'ID',
          accessorKey: 'short_id',
        },
        {
          header: 'Name',
          accessorKey: 'name',
        },
        {
          header: 'Provider',
          accessorKey: 'provider',
        },
        {
          header: 'User',
          accessorKey: 'user',
        },
        {
          header: 'Country',
          accessorKey: 'country_info',
        },
        {
          header: 'Impact',
          accessorKey: 'impact',
        },
        {
          header: 'Probability',
          accessorKey: 'probability',
        },
        {
          header: 'Level',
          accessorKey: 'level',
        },
      ],
      [],
    );

    const table = useMantineReactTable({
        columns,
        data: risks,
        enableColumnOrdering: true,
        enableGlobalFilter: true,
        enableRowActions: true,
        renderRowActions: ({ row }) => (
          <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
            <ActionIcon
              color="gray"
              data-bs-toggle="modal"
              data-bs-target="#riskModal"
              onClick={() => {
                editLocalRisk(row.original._id);
              }}
            >
              <IconEdit />
            </ActionIcon>
            <ActionIcon
              color="red"
              onClick={() => {
                deleteLocalRisk(row.original._id)
              }}
            >
              <IconTrash />
            </ActionIcon>
          </Box>
        ),
    });

    useEffect(() => {
        getLocalRisks();
    }, []);

    return (
        <>
            <button type="button" className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#riskModal" onClick={resetEditRisk}>
              Create Risk
            </button>
            <div className="mb-3">
               <MantineReactTable table={table}/>
            </div>
            <ModalRisk getLocalRisks={getLocalRisks} formDataRisk={formDataRisk} setFormDataRisk={setFormDataRisk} clearFormDataRisk={clearFormDataRisk} idRisk={idRisk} editingRisk={editingRisk}/>
        </>
    )
}