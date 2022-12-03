const express = require("express");
const app = express();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authorize = require('../middlewares/auth')
const { check, validationResult } = require('express-validator')

const incidentRoute = express.Router();
let Incident = require("../model/Incident");
let userSchema = require('../model/User');
let logOfIncident = require('../model/Incident');
//const LogOfIncident = require('../model/LogOfIncident');
// Add Incident
incidentRoute.route("/add-incident").post((req, res, next) => {
  Incident.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get all Incident
incidentRoute.route("/").get((req, res) => {
  Incident.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Incident
incidentRoute.route("/read-incident/:id").get((req, res) => {
  Incident.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});



//Get log
// incidentRoute.route("/read-incident/:id").get((req, res) => {
//   LogOfIncident.findById(req.params.id, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.json(data);
//     }
//   });
// });

// Update Incident
incidentRoute.route("/update-incident/:id").put((req, res, next) => {
  Incident.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Incident updated successfully!");
      }
    }
  );
});

// Delete Incident
incidentRoute.route("/delete-incident/:id").delete((req, res, next) => {
  Incident.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

// Sign-up
incidentRoute.post('/register-user',
  [
    check('name')
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage('Name must be atleast 3 characters long'),
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password should be between 5 to 8 characters long')
      .not()
      .isEmpty()
      .isLength({ min: 5, max: 8 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req)
    console.log(req.body)

    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array())
    } else {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new userSchema({
          name: req.body.name,
          email: req.body.email,
          userId: req.body.userId,
          userType: req.body.userType,
          password: hash,
         
        })
        user
          .save()
          .then((response) => {
            res.status(201).json({
              message: 'User successfully created!',
              result: response,
            })
          })
          .catch((error) => {
            res.status(500).json({
              error: error,
            })
          })
      })
    }
  },
)

// Sign-in
incidentRoute.post('/signin', (req, res, next) => {
  let getUser
  userSchema
    .findOne({
      email: req.body.email,
    })
    .then((user) => {
      if (!user) {
        incidentRoute.post('/signin');       
      }
      else{ getUser = user
        return bcrypt.compare(req.body.password, user.password)}
    })
    .then((response) => {
      if (!response) {
        incidentRoute.post('/signin');
        
      }else{let jwtToken = jwt.sign(
        {
          email: getUser.email,
          userId: getUser._id,
        },
        'longer-secret-is-better',
        {
          expiresIn: '1h',
        },
      )
      res.status(200).json({
        token: jwtToken,
        expiresIn: 3600,
        _id: getUser._id,
      })}      
    })
})

// Get Users
incidentRoute.route('/').get((req, res, next) => {
  userSchema.find((error, response)=> {
    if (error) {
      return next(error)
    } else {
      return res.status(200).json(response)
    }
  })
})

// Get User
incidentRoute.route("/read-user/:id").get(authorize, (req, res, next) => {
 
  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  });
});
// Get Single User
incidentRoute.route('/user-profile/:id').get(authorize, (req, res, next) => {
  userSchema.findById(req.params.id,  req.params.id,
    {
      $set: req.body,
    },(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update User
incidentRoute.route('/update-user/:id').put((req, res, next) => {
  userSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
        console.log('User successfully updated!')
      }
    },
  )
})

// Delete User
incidentRoute.route('/delete-user/:id').delete((req, res, next) => {
  userSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

//

module.exports = incidentRoute;
