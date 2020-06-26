
const routerStudent =require('../routers/pre-register'); 
const login =require('../routers/login');
const verify  =require('../routers/verify');
const logOut = require('../routers/logout');
const User  = require('../routers/User');
const Profile = require('../routers/Profile');
const express = require('express');
const HomeSearch = require('../routers/HomeSearch');
const CheckRefferenceNumber = require('../routers/CheckRefferenceNumber')

module.exports = ( app )=> {

    app.use('/api',express.static('public/documents'));
    app.use('/api/register', routerStudent);
    app.use('/api/login', login);
    app.use('/api/verify', verify);
    app.use('/api/logout', logOut)
    app.use('/api/user', User); 
    app.use('/api/profile', Profile); 
    app.use('/api/homeSearch', HomeSearch );
    app.use('/api/checkRefferenceNumber' , CheckRefferenceNumber );
    
}
