const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../model/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter youre email").isEmail(),
    check("password", "Please enter a password with 8 or more").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    try {
      //*유저가 존재하는지 체크
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: "User is already exits",
            },
          ],
        });
      }
      //*유저가 아바타 (프로필 사진)
      const avaatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      user = new User({
        name,
        email,
        avaatar,
        password,
      });
      //*비밀번호 encrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      //*jsonwebtoken return

      res.send("user router");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server err ");
    }
  }
);
module.exports = router;

///https://youtu.be/Z09xbCo2eU4?list=PLRtgL54fRxE1ngSuElZIzsuX8Lntihgfo&t=655
