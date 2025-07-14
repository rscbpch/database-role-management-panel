import { useState, useEffect } from "react";
import { createRole, updateRole, fetchRoleById } from "../services/api";
import { useParams, useNavigate } from 'react-router-dom';

const allPrivileges = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'ALTER'];

const RoleForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [roleName, setRoleName] = useState('');
    const [privileges, setPrivileges] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetchRoleById(id)
                .then(data => {
                    setRoleName(data.name);
                    setPrivileges(data.privileges || []);
                })
                .catch(() => setError('Failed to load role.'));
        }
    }, [id]);

    const handleCheckboxChange = (priv) => {
        setPrivileges(prev =>
            prev.includes(priv) ? prev.filter(p => p !== priv) : [...prev, priv]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { name: roleName, privileges };
            if (id) {
                await updateRole(id, data);
            } else {
                await createRole(data);
            }
            navigate('/');
        } catch (err) {
            setError('Something went wrong.');
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit Role' : 'Create Role'}</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Role name:</label>
                <input 
                    type="text" 
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    required
                />
                <div>
                    <p>Privileges:</p>
                    {allPrivileges.map(priv => (
                        <label key={priv}>
                            <input 
                                type="checkbox" 
                                checked={privileges.includes(priv)}
                                onChange={() => handleCheckboxChange(priv)}
                            />
                            {priv}
                        </label>
                    ))}
                </div>
                <button type="submit">{id ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
};

export default RoleForm;