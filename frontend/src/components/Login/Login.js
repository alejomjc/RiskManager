import React, {useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API = process.env.REACT_APP_API;

export const Login = () => {

    const [formDataLogin, setFormDataLogin] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormDataLogin({ ...formDataLogin, [name]: value });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataLogin)
        })

        const data = await res.json();

        if (res.status === 200) {
            localStorage.setItem('authenticated', 'true');
            window.location.href = '/';
        } else {
            toast.error(data.message);
        }

    }

    useEffect(() => {
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit} className="text-center">
                <div className="shadow-lg p-3 mb-5 bg-body-tertiary rounded mx-auto d-inline-block" style={{ width: "35%" }}>
                    <div className="form-group p-2">
                        <label className="form-label fw-bold text-start">Access</label>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                name="username"
                                placeholder="username"
                                required
                                value={formDataLogin.username || ''}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="floatingInput">Username</label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                name="password"
                                placeholder="Password"
                                autoComplete="off"
                                required
                                value={formDataLogin.password || ''}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
            <ToastContainer pauseOnHover theme="dark" position="bottom-right"/>
        </>
    )
}