
const routerStudent =require('../routers/pre-register'); 
const login =require('../routers/login');
const verify  =require('../routers/verify');
const logOut = require('../routers/logout');
const User  = require('../routers/User');
const Profile = require('../routers/Profile');
const HomeSearch = require('../routers/HomeSearch');

module.exports = ( app )=> {

    app.use('/api/register', routerStudent);
    app.use('/api/login', login);
    app.use('/api/verify', verify);
    app.use('/api/logout', logOut)
    app.use('/api/user', User); 
    app.use('/api/profile', Profile); 
    app.use('/api/homeSearch', HomeSearch );
    
}
