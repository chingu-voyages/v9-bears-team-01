const express = require('express');
const mongoose = require('mongoose');
const Stock = mongoose.model('stocks');

module.exports = app => {
  const router = express.Router();
  router.post('/stocks', async (req, res) => {
    const stock = new Stock(req.body);

    try {
      await stock.save();
      res.status(201).send(stock);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  router.get('/stocks', async (req, res) => {
    try {
      const stocks = await Stock.find({});
      res.send(stocks);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  router.get('/stocks/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const stock = await Stock.findById(id);
      if (!stock) {
        return res.status(404).send();
      }

      res.send(stock);
    } catch (e) {
      res.status(404).send(e);
    }
  });

  router.patch('/stocks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['ticker', 'quantity', 'price', 'date'];

    const isValidOperation = updates.every(update =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
      const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!stock) {
        return res.status(404).send();
      }

      res.send(stock);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  router.delete('/stocks/:id', async (req, res) => {
    try {
      const stock = await Stock.findByIdAndDelete(req.params.id);
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
