const express = require('express');
const router = express.Router();
const Store = require('../model/Store');

module.exports = {
  getStoreById: (req, res) => {
    const { id } = req.params;

    Store.findOne(id, { include: ['UserId'] }).then((store, err) => {
      if (store) {
        res.status(200).json(store);
      } else if (err) {
        res.json({ err, msg: 'server error' });
      }
    });
  },

  getStores: (req, res) => {
    return res.send('get store');
  },

  createStore: (req, res) => {
    return res.send('create store');
  },

  updateStore: (req, res) => {
    return res.send('update store');
  },

  deleteStore: (req, res) => {
    return res.send('delete store');
  },
};
