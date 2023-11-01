const API = process.env.REACT_APP_API;
// const TOKEN = process.env.TOKEN_AUTH_JWT
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW8ifQ.PuRbZekcfxsKPo92zbIXFQD04N8HHk6ZDoRGvTxjOEs'


export const getRisks = async () => {
    const res = await fetch(`${API}/risks`, {
        headers: {"Authorization": TOKEN}
    })
    return await res.json();
}

export const getRisk = async (e) => {
    const res = await fetch(`${API}/risk/${e}`, {
        headers: {"Authorization": TOKEN}
    })
    return await res.json();
}

export const deleteRisk = async (e) => {
    const userResponse = window.confirm('Are you sure to delete ?')
    if (userResponse) {
        const res = await fetch(`${API}/risk/${e}`, {
            method: 'DELETE',
            headers: {"Authorization": TOKEN}
        })
        return await res.json();
    }
}
