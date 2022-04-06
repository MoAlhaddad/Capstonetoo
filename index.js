const express = require('express');
const path = require('path');
const { app } = require('./backend/server');

app.use(express.static(path.join(__dirname, '../frontend/build')));
//Server frontend
if(process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html')))
}