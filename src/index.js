if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config();
}

const express = require('express');

const config = require('./server/config');

//database
require('./database');

const app = config(express());

// starting server
app.listen(app.get('port') , () => {
    console.log('Server on port' , app.get('port'));
});