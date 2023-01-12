const express = require('express');
const candidateController = require('../controllers/candidateController');

const router = express.Router();

router.get('/candidates', candidateController.getCandidates, (req, res) =>
  res.status(200).json(res.locals.candidates)
);

router.post('/candidate', candidateController.addCandidate, (req, res) =>
  res.status(200).json(res.locals.newCandidate)
);

router.delete('/candidate/:id', candidateController.deleteCandidate, (req, res) =>
  res.status(200).json(res.locals.deletedCandidate)
);

router.put('/candidate/:id', candidateController.updateCandidate, (req, res) =>
  res.status(200).json(res.locals.updatedCandidate)
);

module.exports = router;
