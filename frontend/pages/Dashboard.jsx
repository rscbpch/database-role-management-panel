import { useState } from 'react';
import RoleTable from '../components/RoleTable';    
import UserTable from '../components/UserTable';     

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('users'); 

    return (
        <div>
            <h1>Dashboard</h1>
            <div style={{ marginBottom: '1rem' }}>
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
