// Validation Helpers

const {
  check
} = require('express-validator');

// Register 
exports.validRegister = [
  check('name', '이름을 입력해주세요').notEmpty()
    .isLength({
      min: 4,
      max: 32,
    }).withMessage('최소 3글자 이상 최대 32글자 이하의 이름을 입력해주세요'),
  check('email').isEmail().withMessage('올바른 이메일을 입력해주세요'),
  check('password', '암호를 입력해주세요').notEmpty()
    .isLength({
      min: 6,
    }).withMessage('비밀번호는 최소 6글자여야 합니다.').matches(/\d/).withMessage('숫자를 포함하여 입력해주세요')
];

// login 
exports.validLogin = [
  check('email').isEmail().withMessage('올바른 이메일을 입력해주세요'),
  check('password', '암호를 입력해주세요').notEmpty()
    .isLength({
      min: 6,
    }).withMessage('비밀번호는 최소 6글자여야 합니다.').matches(/\d/).withMessage('숫자를 포함하여 입력해주세요')
]
