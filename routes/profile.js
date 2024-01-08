'use strict';

var mongoCrud = require('../crud')
const express = require('express');
const router = express.Router();

const profiles = [
  {
    "id": 1,
    "name": "A Martinez",
    "description": "Adolph Larrue Martinez III.",
    "mbti": "ISFJ",
    "enneagram": "9w3",
    "variant": "sp/so",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL",
    "image": "https://soulverse.boo.world/images/1.png",
  }
];

module.exports = function () {

  router.get('/', function (req, res, next) {
    res.render('profile_template', {
      profile: profiles[0],
    });
  });

  router.get('/view/:id', async function (req, res, next) {
    const crudObj = new mongoCrud("users");
    const userId = req.params.id;

    const user = await crudObj.getById(userId);
    user.id = user._id
    res.render('profile_template', {
      profile: user,
    });
  });

  router.get('/users', async function (req, res, next) {
    const crudObj = new mongoCrud("users");
    try {
      const users = await crudObj.getAll();
      if (users) {
        res.status(200).send({
          message: 'success',
          description: 'Users List',
          data: {
            records: users
          }
        });
      } else {
        res.status(404).send({
          message: 'error',
          description: 'No users Found.'
        });
      }
    } catch {
      res.status(500).send({
        message: 'error',
        description: error.message
      });
    }
  });

  router.get('/profile/:id', async function (req, res, next) {
    const crudObj = new mongoCrud("users");
    const userId = req.params.id;
    try {
      const user = await crudObj.getById(userId);
      if (user) {
        res.status(200).send({
          message: 'success',
          description: 'Profile Found.',
          data: {
            profile: user
          }
        });
      } else {
        res.status(404).send({
          message: 'error',
          description: 'Profile not Found.'
        });
      }
    } catch {
      res.status(500).send({
        message: 'error',
        description: error.message
      });
    }
  });

  router.post('/profile', async function (req, res) {
    const crudObj = new mongoCrud("users");
    const requestData = req.body;

    const user = await crudObj.create(requestData)
    try {
      res.status(200).send({
        message: 'success',
        description: 'User Created Successfully.',
        body: {
          user: user
        }
      });
    } catch (error) {
      res.status(500).send({
        message: 'error',
        description: error.message
      });
    }
  });

  return router;
}

