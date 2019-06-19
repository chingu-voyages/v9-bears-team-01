const express = require('express');
const mongoose = require('mongoose');

const Stock = mongoose.model('stocks');
const auth = require('../middleware/auth');

module.exports = app => {
  const router = express.Router();

  router.post('/stocks', auth, async (req, res) => {
    //const stock = new Stock(req.body);

    const stock = new Stock({
      ...req.body,
      user: req.user._id
    });
    try {
      await stock.save();
      res.status(201).send(stock);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  router.get('/stocks', auth, async (req, res) => {
    try {
      //const stocks = await Stock.find({ user: req.user._id });
      await req.user.populate('stocks').execPopulate();
      res.send(req.user.stocks);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  router.get('/stocks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
      //const stock = await Stock.findById(id);

      const stock = await Stock.findOne({ _id, user: req.user._id });
      if (!stock) {
        return res.status(404).send();
      }

      res.send(stock);
    } catch (e) {
      res.status(404).send(e);
    }
  });

  router.patch('/stocks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['ticker', 'quantity', 'price', 'date'];

    const isValidOperation = updates.every(update =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
      // const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, {
      //   new: true,
      //   runValidators: true
      // });
      const stock = await Stock.findOne({
        _id: req.params.id,
        user: req.user._id
      });

      if (!stock) {
        return res.status(404).send();
      }

      updates.forEach(update => (stock[update] = req.body[update]));
      await stock.save();
      res.send(stock);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  router.delete('/stocks/:id', auth, async (req, res) => {
    try {
      const stock = await Stock.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id
      });
      if (!stock) {
        return res.status(404).send();
      }
      res.send(stock);
    } catch (e) {
      res.status(500).send();
    }
  });

  app.use('/api', router);
};
