'use strict';

const express = require('express');
const auth = require('../middleware');
const router = express.Router();
const Role = require('../roles-model');

router.post('/roles', (req, res, next) => {
 let role = new Role(req.body);
 console.log(req.body);
 role.save();
 res.status(200).send('New roles added to the database');
});

router.get('/public-stuff', (req, res, next) => {
  res.status(200).send('Anyone can read this');
});

router.get('/hidden-stuff', auth(), (req, res, next) => {
  res.status(200).send('Valid login required');
});

router.get('/something-to-read', auth('read'), (req, res, next) => {
  res.status(200).send('Read only');
});

router.post('/create-a-thing', auth('create'), (req, res, next) => {
  res.status(200).send('Able to create');
});

router.put('/update', auth('udpate'), (req, res, next) => {
  res.status(200).send('Able to update');
});

router.patch('/jp', auth('udpate'), (req, res, next) => {
  res.status(200).send('Able to update');
});

router.delete('/bye-bye', auth('delete'), (req, res, next) => {
  res.status(200).send('Buh-bye now. Buh-bye! Bye!');
});

router.get('/everything', auth('superuser'), (req, res, next) => {
  res.status(200).send('CRUD it up!');
});

module.exports = router;