const db = require('../models/candidateModels');

const candidateController = {};

candidateController.getCandidates = (req, res, next) => {
  const text = 'SELECT * FROM candidates ORDER BY _id';
  db.query(text).then(data => {
    res.locals.candidates = data.rows;
    return next();
  });
};

candidateController.addCandidate = async (req, res, next) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    position,
    location,
    over18,
    legallyauthtoworkinus,
    status,
    notes
  } = req.body;
  const text = `
    INSERT INTO candidates(first_name, last_name, email, phone, position, location, over18, legallyauthtoworkinus, status, notes)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *
  `;
  const values = [
    first_name,
    last_name,
    email,
    phone,
    position,
    location,
    over18,
    legallyauthtoworkinus,
    status,
    notes
  ];
  try {
    if (first_name && last_name && email && phone && position) {
      const result = await db.query(text, values);
      res.locals.newCandidate = result.rows[0];
      return next();
    } else
      return next({
        log: `candidateController.addCandidate: ERROR: some data fields cannot be empty`,
        message: {
          err: 'candidateController.addCandidate: ERROR: check server logs for more detail'
        }
      });
  } catch (err) {
    return next({
      log: `candidateController.addCandidate: ERROR: data query error, ${err}`,
      message: {
        err: 'candidateController.addCandidate: ERROR: check server logs for more detail'
      }
    });
  }
};

candidateController.deleteCandidate = (req, res, next) => {
  const text = 'DELETE FROM candidates WHERE _id = $1 RETURNING *';
  const param = [req.params.id];
  db.query(text, param)
    .then(data => {
      res.locals.deletedCandidate = data.rows[0];
      return next();
    })
    .catch(err =>
      next({
        log: `candidateController.deleteCandidate: ERROR: data query error, ${err}`,
        message: {
          err: 'candidateController.deleteCandidate: ERROR: check server logs for more detail'
        }
      })
    );
};

candidateController.updateCandidate = (req, res, next) => {
  const text = `
    UPDATE candidates
    SET first_name = $1,
        last_name = $2,
        email = $3,
        phone = $4,
        position = $5,
        location = $6,
        over18 = $7,
        legallyauthtoworkinus = $8,
        status = $9,
        notes = $10
    WHERE _id = $11
    RETURNING *
  `;
  const param = req.params.id;
  const {
    first_name,
    last_name,
    email,
    phone,
    position,
    location,
    over18,
    legallyauthtoworkinus,
    status,
    notes
  } = req.body;
  const values = [
    first_name,
    last_name,
    email,
    phone,
    position,
    location,
    over18,
    legallyauthtoworkinus,
    status,
    notes,
    param
  ];

  db.query(text, values)
    .then(data => {
      res.locals.updatedCandidate = data.rows[0];
      return next();
    })
    .catch(err =>
      next({
        log: `candidateController.updateCandidate: ERROR: data query error, ${err}`,
        message: {
          err: 'candidateController.updateCandidate: ERROR: check server logs for more detail'
        }
      })
    );
};

module.exports = candidateController;
