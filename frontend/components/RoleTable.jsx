import { useState, useEffect } from "react";
import { fetchRolesWithPrivileges } from '../services/api';

const RoleTable = () => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetchRolesWithPrivileges()
            .then(data => setRoles(data))
            .catch(err => console.error('Error fetching roles.', err));
    }, []);

    return (
        <table>
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
                        <td>{role.privileges.join(', ')}</td>
                        <td>
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RoleTable;