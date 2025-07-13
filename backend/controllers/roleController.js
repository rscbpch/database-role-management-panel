const { sequelize, Role } = require('../modles');

const getAllRole = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.json(roles);
    } catch (err) {
        console.error('Error fetching roles.', err);
        res.status(500).json({ error: 'Failed to fetch all role.'});
    }
};

const getRoleById = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) return res.status(404).json({ error: 'Role not found.' });

        const [results] = await sequelize.query(
            'select privilege from role_privilege where role_id = ?',
            { replacements: [role.id] }
        );

        const privileges = results.map(row => row.privilege);
        res.json({ ...role.toJSON(), privileges})
    } catch (err) {
        console.error('Error fetching roles.', err);
        res.status(500).json({ error: 'Failed to fetch role by ID.'});
    }
};

const createRole = async (req, res) => {
    const { name, privileges = [] } = req.body;
    const t = await sequelize.transaction();

    try {
        const newRole = await Role.create({
            name
        }, { transaction: t });

        for (const priv of privileges) {
            await sequelize.query(
                'insert into role_privilege (role_id, privilege) values (?, ?)',
                { replacements: [newRole.id, priv], transaction: t }
            );
        }

        const privilegeList = privileges.join(', ');
    
        await sequelize.query(
            `create role '${name}'`,
            { transaction: t }
        );
    
        await sequelize.query(
            `grant ${privilegeList} on ${process.env.DB_NAME}.* to '${name}'`,
            { transaction: t }
        );
    
        await t.commit();
    
        res.status(201).json({ message: 'Role created successfully.', role: newRole, privileges });
    } catch (err) {
        console.error('Error creating roles.', err);
        res.status(500).json({ error: 'Failed to create role.'});
    }

};

const updateRole = async (req, res) => {
    const roleId = req.params.id;
    const { name, privileges = [] } = req.body;
    const t = await sequelize.transaction();

    try {
        const role = await Role.findByPk(roleId, { transaction: t });
        if (!role) return res.status(404).json({ error: 'Role not found.' });

        const oldRoleName = role.name;

        await sequelize.query(
            `revoke all privileges on ${process.env.DB_NAME}.* from '${oldRoleName}'`,
            { transaction: t }
        );

        role.name = name;
        await role.save({ transaction: t });


        const privilegeList = privileges.join(', ');

        await sequelize.query(
            `grant ${privilegeList} on ${process.env.DB_NAME}.* to '${role.name}'`,
            { transaction: t }
        );

        await sequelize.query(
            'delete from role_privilege where role_id = ?',
            { replacements: [role.id], transaction: t }
        );

        for (const priv of privileges) {
            await sequelize.query(
                'insert into role_privilege (role_id, privilege) values (?, ?)',
                { replacements: [role.id, priv], transaction: t }
            );
        }

        await t.commit();

        res.json({ message: 'Role updated successfully', role, privileges });
    } catch (err) {
        console.error('Error updating roles.', err);
        res.status(500).json({ error: 'Failed to update role.'});
    }
};

const deleteRole = async (req, res) => {
    const roleId = req.params.id;
    const t = await sequelize.transaction();
    
    try {
        const role = await Role.findByPk(roleId, { transaction: t });
        if (!role) {
            await t.rollback();
            return res.status(404).json({ error: 'Role not found.' });
        }

        await Role.destroy({
            where: { role_id: roleId},
            transaction: t
        });

        await t.commit();

        res.status(200).json({ message: 'Role deleted successfully.' });
    } catch (err) {
        console.error('Error deleting roles.', err);
        res.status(500).json({ error: 'Failed to delete role.'});
    }
};

module.exports = {
    getAllRole,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
};