import { useState, useEffect } from "react";
import { fetchUsers } from '../services/api'
import { useNavigate } from "react-router-dom";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers()
            .then(data => setUsers(data))
            .catch(err => console.error('Error fetching users', err));
    }, []);

    return (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%' }}> 
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.length === 0 ? (
                    <tr><td colSpan="4">No users found.</td></tr>
                ) : (users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => navigate(`/users/edit/${user.id}`)}>Edit</button>
                                <button onClick={() => navigate('')}>Delete</button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default UserTable;