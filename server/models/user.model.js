const mongoose = require('mongoose');
const crypto = require('crypto');

// User Schema 
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    require: true,
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    trim: true,
    require: true,
  },
  hashed_password: {
    type: String,
    require: true,
  },
  salt:String,
  role: {
    type: String,
    default: 'Normal'
  }
}, {timestamps: true});


// Virtual Password 
userSchema.virtual('password')   // 콜렉션에 저장 되지 않은 fiels 이지만 정의된 field 처럼 사용할 수 있게 하는 기능 
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  })


// Method 정의 
userSchema.methods = {
  // 들어온 비밀번호와 암호화된 비밀번호가 일치하는지 확인 
  authenticate: function(plainPassword) {
    return this.encryptPassword(plainPassword) === this.hashed_password;
  },

  // 비밀번호 암호화 
  encryptPassword: function(password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch(err) {
      return "error in hashed password";
    }
  },

  // 임의의 문자열인 salt 생성 
  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  }
};

module.exports = mongoose.model('User', userSchema);
