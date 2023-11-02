const API = process.env.REACT_APP_API


export const getUsers = async () => {
    const res = await fetch(`${API}/users`)
    return await res.json();
}

export const getUser = async (e) => {
    const res = await fetch(`${API}/user/${e}`)
    return await res.json();
}

export const deleteUser = async (e) => {
    const userResponse = window.confirm('Are you sure to delete ?')
    if (userResponse) {
        const res = await fetch(`${API}/user/${e}`, {
            method: 'DELETE'
        })
        return await res.json();
    }
}
