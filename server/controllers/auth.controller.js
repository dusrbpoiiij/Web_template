const User = require('../models/user.model');
const expressJwt = require('express-jwt');
const _ = require('lodash');
const fetch = require('node-fetch');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const {errorHandler} = require('../helpers/dbErrorHandling');
const {json} = require('body-parser');
const { hasBrowserCrypto } = require('google-auth-library/build/src/crypto/crypto');

exports.registerController = (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  // Validation to req.body we will create custom validation in seconds 
  if(!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    console.log(errors)
    return res.status(422).json({
      error: firstError
    })
  } else {
    User.findOne({
      email
    }).exec((err, user) => {
      // If user exists 
      if (user) {
        return res.status(400).json({
          error: "Email is already taken."
        })
      } else {
        // Create User object 
        const user = new User({
          name, email, password
        })

        user.save((err, user) => {
          if(err) {
            console.log('Save Error', errorHandler(err));
            return res.status(401).json({
              errors: errorHandler(err)
            });
          } else {
            return res.json({
              success:true,
              message: '회원가입이 완료되었습니다.'
            })
          }
        });
      }
    })
  }
};

exports.loginController = (req, res) => {
  const {email, password} = req.body;
  const errors = validationResult(req);

  // Validation to req.body we will create custom validation in seconds 
  if(!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    console.log(errors)
    return res.status(422).json({
      error: firstError
    })
  } else {
    
    User.findOne({
      email
    }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "계정이 없습니다."
        })
      }

      if(!user.authenticate(password)) {
        return res.status(400).json({
          error: '비밀번호가 틀렸습니다.'
        })
      }
  
      // 토큰 생성 
      const token = jwt.sign(
        {
          _id: user._id
        }, process.env.JWT_SECRET,
        {
          expiresIn: '7d'
        }
      )
  
      const {
        _id,
        name,
        email,
        role
      } = user
      return res.json({
        token,
        user: {
          _id,
          name,
          email,
          role
        }
      })
    })
  }
}