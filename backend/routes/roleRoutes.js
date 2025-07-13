const express = require('express');
const router = express.Router();
const { getAllRole, getRoleById, getAllRolesWithPrivileges,createRole, updateRole, deleteRole } = require('../controllers/roleController');

router.get('/', getAllRole);
router.get('/:id', getRoleById);
router.get('/', getAllRolesWithPrivileges);
router.post('/', createRole);
router.put('/:id', updateRole);
router.delete('/:id', deleteRole);

module.exports = router;