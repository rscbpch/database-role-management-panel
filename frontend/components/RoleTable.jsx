import { useState, useEffect } from "react";
import { fetchRolesWithPrivileges } from '../services/api';
import { useNavigate } from "react-router-dom";

const RoleTable = () => {
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRolesWithPrivileges()
            .then(data => setRoles(data))
            .catch(err => console.error('Error fetching roles.', err));
    }, []);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this role?')) {
            deleteRole(id)
                .then(() => {
                    alert('Role deleted successfully!');
                    fetchRoles().then(setRoles); 
                })
                .catch(() => alert('Failed to delete role'));
        }
    };


    return (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%' }}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Role name</th>
                    <th>Privileges</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {roles.map(role => (
                    <tr key={role.id}>
                        <td>{role.id}</td>
                        <td>{role.name}</td>
                        <td>{(role.privileges || []).join(', ')}</td>
                        <td>
                            <button onClick={() => navigate(`/roles/edit/${role.id}`)}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RoleTable;