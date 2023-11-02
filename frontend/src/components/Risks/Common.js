import {toast} from "react-toastify";

const API = process.env.REACT_APP_API;


export const getRisks = async () => {
    const res = await fetch(`${API}/risks`)
    return await res.json();
}

export const getRisk = async (e) => {
    const res = await fetch(`${API}/risk/${e}`)
    return await res.json();
}

export const deleteRisk = async (e) => {
    const userResponse = window.confirm('Are you sure to delete ?')
    if (userResponse) {
        const res = await fetch(`${API}/risk/${e}`, {
            method: 'DELETE'
        })
        const data = await res.json();
        if (res.status === 200) {
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
        return data;
    }
}
