const { Router } = require('express');

const LogEntry = require('../models/LogEntry');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  // eslint-disable-next-line no-empty
  } catch (error) {
    next(error);
  }
});
router.post('/', async (req, res) => {
  // eslint-disable-next-line no-empty
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    console.log(error.name);
    if (error.name === 'ValidationError') {
      res.status(422);
    }
  }
});

module.exports = router;
