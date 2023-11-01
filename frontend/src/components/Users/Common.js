const API = process.env.REACT_APP_API
// const TOKEN = process.env.TOKEN_AUTH_JWT
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW8ifQ.PuRbZekcfxsKPo92zbIXFQD04N8HHk6ZDoRGvTxjOEs'


export const getUsers = async () => {
    const res = await fetch(`${API}/users`, {
        headers: {"Authorization": TOKEN}
    })
    return await res.json();
}

export const getUser = async (e) => {
    const res = await fetch(`${API}/user/${e}`, {
        headers: {"Authorization": TOKEN}
    })
    return await res.json();
}

export const deleteUser = async (e) => {
    const userResponse = window.confirm('Are you sure to delete ?')
    if (userResponse) {
        const res = await fetch(`${API}/user/${e}`, {
            method: 'DELETE',
            headers: {"Authorization": TOKEN}
        })
        return await res.json();
    }
}
