const express = require("express");
const { z } = require("zod");

const router = express.Router();
const validate = require("../middleware/validateSchema");

const signupSchema = z.object({
  display_name: z.string().min(8).max(50),
  email: z.string().email(),
  password: z.string().min(6),
});

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const { Signup, Signin, Verify } = require("../controllers/auth");

router.post("/signup", validate(signupSchema), Signup);

router.post("/signin", validate(signinSchema), Signin);

router.get("/verify/:tokenHash", Verify);

module.exports = router;
