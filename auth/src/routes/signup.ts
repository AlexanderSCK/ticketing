import express, { Request, Response } from "express";
import { body, check } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@ap99tickets/common";


import { User } from "../models/user";


const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),

      check('password', 'The password must be 5+ chars long and contain a number')
      .not()
      .isIn(['123', 'password', 'god'])
      .withMessage('Do not use a common word as the password')
      .isLength({ min: 5 })
      .matches(/\d/), 

  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
