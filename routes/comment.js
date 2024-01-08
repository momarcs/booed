'use strict';

var mongoCrud = require('../crud');
const express = require('express');
const router = express.Router();

module.exports = function () {

  router.get('/comments', async function (req, res, next) {
    const crudObj = new mongoCrud("comments");
    try {
      let { profile_id, type, sort_by, sort_order } = req.body
      const filterObject = {
        profile_id: profile_id,
      }
      const sortObject = {
        sortBy: sort_by ? sort_by : 'likes',
        sortOrder: sort_order ? sort_order : 1
      }

      if (type)
        filterObject['personality_types.type'] = type

      const records = await crudObj.getAll(filterObject, sortObject);
      if (records) {
        res.status(200).send({
          message: 'success',
          description: 'Comments List',
          data: records
        });
      } else {
        res.status(404).send({
          message: 'error',
          description: 'No comments Found.'
        });
      }
    } catch {
      res.status(500).send({
        message: 'error',
        description: error.message
      });
    }
  });

  router.get('/comment/:id', async function (req, res, next) {
    const crudObj = new mongoCrud("comments");
    const userId = req.params.id;
    try {
      const record = await crudObj.getById(userId);
      if (record) {
        res.status(200).send({
          message: 'success',
          description: 'Comment Found.',
          data: {
            profile: record
          }
        });
      } else {
        res.status(404).send({
          message: 'error',
          description: 'Comment not Found.'
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
    const crudObj = new mongoCrud("comments");
    const userId = req.params.id;
    try {
      const record = await crudObj.getById(userId);
      if (record) {
        res.status(200).send({
          message: 'success',
          description: 'Comment Found.',
          data: {
            profile: record
          }
        });
      } else {
        res.status(404).send({
          message: 'error',
          description: 'Comment not Found.'
        });
      }
    } catch {
      res.status(500).send({
        message: 'error',
        description: error.message
      });
    }
  });

  router.post('/comment', async function (req, res) {
    const crudObj = new mongoCrud("comments");
    const requestData = req.body;

    requestData.created_at = new Date();
    const record = await crudObj.create(requestData)
    try {
      res.status(200).send({
        message: 'success',
        description: 'Commented Successfully.',
        data: record
      });
    } catch (error) {
      res.status(500).send({
        message: 'error',
        description: error.message
      });
    }
  });

  router.get('/like', async function (req, res) {
    const crudObj = new mongoCrud("comments");
    const requestData = req.body;

    try {
      const commentId = requestData.comment_id;
      const commentData = await crudObj.getById(commentId);

      const updateData = {
        'likes': commentData.likes + 1
      }
      const record = await crudObj.updateById(commentId, updateData)
      res.status(200).send({
        message: 'success',
        description: 'Comment Liked.'
      });
    } catch (error) {
      res.status(500).send({
        message: 'error',
        description: error.message
      });
    }
  });

  router.get('/unlike', async function (req, res) {
    const crudObj = new mongoCrud("comments");
    const requestData = req.body;

    try {
      const commentId = requestData.comment_id;
      const commentData = await crudObj.getById(commentId);

      const updateData = {
        'likes': commentData.likes - 1
      }
      const record = await crudObj.updateById(commentId, updateData)
      res.status(200).send({
        message: 'success',
        description: 'Comment Unlike.'
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

