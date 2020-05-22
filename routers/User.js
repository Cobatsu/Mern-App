const express = require('express');
const router  = express.Router();
const {auth,unique} = require('../controllers/verify')
const User = require('../controllers/User');
 //we can add callback function to call for specific middle ware
router.get('/permission',User.getPermission);
router.post('/person_search',auth,User.personSearch);
router.post('/',[auth,unique],User.addUser);
router.get('/relatedAgency/:id',auth,User.getRelatedAgency);

router
.route('/:id')
.get(User.getSpecificUser)
.patch([auth,unique],User.updateSpecificUser)
.delete(auth,User.removeUser);



module.exports=router;
