import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import RoleTable from '../components/RoleTable';    
import UserTable from '../components/UserTable';     

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('users'); 
    const navigate = useNavigate();

    return (
        <>
            <div className="sidebar">

            </div>
            <div className="display-content">
                <h1>Dashboard</h1>
                <div style={{ marginBottom: '1rem' }}>
                    <button
                        onClick={() => setActiveTab('users')}
                        style={{
                            marginRight: '1rem',
                            fontWeight: activeTab === 'users' ? 'bold' : 'normal'
                        }}
                    >
                        Users
                    </button>
                    <button
                        onClick={() => setActiveTab('roles')}
                        style={{
                            fontWeight: activeTab === 'roles' ? 'bold' : 'normal'
                        }}
                    >
                        Roles
                    </button>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    {activeTab === 'users' && (
                        <button onClick={() => navigate('/users/new')}>Create new user</button>
                    )}
                    {activeTab === 'roles' && (
                        <button onClick={() => navigate('/roles/new')}>Create new role</button>
                    )}
                </div>

                {activeTab === 'users' && <UserTable />}
                {activeTab === 'roles' && <RoleTable />}
            </div>
        </>
    );
};

export default Dashboard;
