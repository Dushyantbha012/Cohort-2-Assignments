const request = require('supertest');
const assert = require('assert');
const express = require('express');

const app = express();
let errorCount = 0;

// You have been given an express server which has a few endpoints.
// Your task is to
// 1. Ensure that if there is ever an exception, the end user sees a status code of 404
// 2. Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint

app.get('/user', function(req, res) {
  try{
    throw new Error("User not found");
    res.status(200).json({ name: 'john' });
  }
  catch{
    errorCount++;
    res.sendStatus(404);
  }
});

app.post('/user', function(req, res) {
  try{
    res.status(200).json({ msg: 'created dummy user' });
  }
  catch{
    errorCount++;
    res.sendStatus(404);
  }
});

app.get('/errorCount', function(req, res) {
  try{
    res.status(200).json({ errorCount });
  }
  catch{
    
    errorCount++;
    res.sendStatus(404);
  }
});

module.exports = app;