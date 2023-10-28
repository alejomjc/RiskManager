const API = process.env.REACT_APP_API



export const getRiesgos = async () => {
    const res = await fetch(`${API}/riesgos`)
    return await res.json();
}

export const editRiesgo = async (e) => {
    const res = await fetch(`${API}/riesgo/${e}`)
    const data = await res.json();
    return data
}

export const deleteRiesgo = async (e) => {
    const userResponse = window.confirm('Estas seguro de eliminar ?')
    if (userResponse) {
        const res = await fetch(`${API}/riesgo/${e}`, {
            method: 'DELETE'
        })
        return await res.json();
    }
}
