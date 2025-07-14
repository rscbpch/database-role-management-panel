import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import RoleTable from '../components/RoleTable';    
import UserTable from '../components/UserTable';     

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('users'); 
    const navigate = useNavigate();

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <button onClick={() => navigate('/roles/new')}>Create new role</button>
                <button onClick={() => navigate('/users/new')}>Create new user</button>
            </div>
            <div>
                <button
                    onClick={() => setActiveTab('users')}
                    style={{ marginRight: '1rem', fontWeight: activeTab === 'users' ? 'bold' : 'normal' }}
                >
                    Users
                </button>
                <button
                    onClick={() => setActiveTab('roles')}
                    style={{ fontWeight: activeTab === 'roles' ? 'bold' : 'normal' }}
                >
                    Roles
                </button>
            </div>

            {activeTab === 'users' && <UserTable />}
            {activeTab === 'roles' && <RoleTable />}
        </div>
    );
};

export default Dashboard;
