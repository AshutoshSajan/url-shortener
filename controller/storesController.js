const express = require("express");
const router = express.Router();
const Store = require("../model/Store");

module.exports = {
  getStore: (req, res) => {
    res.send("get store");
  },

  createStore: (req, res) => {
    res.send("create store");
  },

  updateStore: (req, res) => {
    res.send("update store");
  },

  deleteStore: (req, res) => {
    res.send("delete store");
  },
};
