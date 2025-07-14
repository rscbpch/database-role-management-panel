import { useState, useEffect } from "react";
import { fetchRolesWithPrivileges, createUser, updateUser, fetchUserById } from "../services/api";
import { useParams, useNavigate, useResolvedPath } from 'react-router-dom';

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchRolesWithPrivileges()
            .then(setRoles)
            .catch(() => setError('Failed to load roles.'));

        if (id) {
            fetchUserById(id)
                .then((data) => {
                    setUsername(data.username);
                    setRoleId(data.role_id);
                })
                .catch(() => setError('failed to load user.'));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { username, password, role_id: roleId};
            if (id) {
                await updateUser(id, data);
            } else {
                await createUser(data);
            }
            navigate('/');
        } catch (err) {
            setError('Something went wrong.');
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit user': 'Create role'}</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input 
                    type="text" 
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>Password:</label>
                <input 
                    type="text" 
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label>Role:</label>
                <select value={roleId} onChange={(e) => setRoleId(e.target.value)} required>
                    <option value="">Select a role</option>
                    {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                            {role.name}
                        </option>
                    ))}
                </select>
                <button type="submit">{id ? 'Edit': 'Create'}</button>
            </form>
        </div>
    );
};

export default UserForm;