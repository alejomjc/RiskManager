import React, {useState} from 'react';
import {Link} from "react-router-dom";
import { toast } from 'react-toastify';
const API = process.env.REACT_APP_API;

export const Navbar = () => {
    let isAuthenticated = localStorage.getItem('authenticated') === 'true';
    const handleLogout = async () => {
        try {
            const res = await fetch(`${API}/logout`, {
                method: 'POST',
            });

            if (res.status === 200) {
                localStorage.removeItem('authenticated');
                isAuthenticated = false
                window.location.href = '/login';
            }
        } catch (error) {
            toast.error('Error:', error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Home
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"/>
                </button>
                {isAuthenticated ? (
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="navbar-brand" to="/risks">
                                Risks
                            </Link>
                            <Link className="navbar-brand" to="/users">
                                Users
                            </Link>
                        </li>
                    </ul>
                </div>
                ) : (<></>)}
                {isAuthenticated ? (
                     <Link className="navbar-brand" onClick={handleLogout} to="#">
                         <span style={{ fontSize: "0.6em" }}>Getout</span>
                     </Link>
                ) : (
                     <Link className="navbar-brand" to="/login">
                        <span style={{ fontSize: "0.6em" }}>Login</span>
                     </Link>
                )}
            </div>
        </nav>
    );
};