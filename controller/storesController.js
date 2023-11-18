const express = require('express');
const router = express.Router();
const Store = require('../model/Store');

module.exports = {
  getStore: (req, res) => {
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
