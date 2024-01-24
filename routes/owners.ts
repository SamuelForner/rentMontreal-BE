import { Request, Response } from 'express';

import { Iowner } from '../interfaces/ownerInterface';
import Owner from '../models/owners';

const auth = require('../middleware/ownerauth.ts');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, password, lastName, firstName, phoneNumber } =
      req.body as Iowner;
    //check if owner has already registered
    const existingOwner = await Owner.findOne({ email });
    //if already registered
    if (existingOwner) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    //if not registered, create owner
    // hash and encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newOwner = new Owner({
      email: email,
      password: hashedPassword,
      lastName: lastName,
      firstName: firstName,
      phoneNumber: phoneNumber,
    });
    await newOwner.save().then((newOwner: Iowner) => {
      res.json({ newOwner, message: 'Owner registered successfully' });
    });
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
});

router.post('/signin', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    //check if owner exist
    const owner = await Owner.findOne({ email: email });
    if (!owner) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    //check if password is valid
    //sending req.body.password to comparePassword method and comparing it with this.password that is const owner : owner property in database
    const isPasswordValid = await owner.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    //generate JWT Token
    //this token will be usefull client side to allows for example not to sign in each time
    const token = jwt.sign({ ownerId: owner.id }, 'secretKey');
    res
      .status(200)
      .json({ token, owner: { id: owner.id, username: owner.firstName } });
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
});

//Check if token from signin is valid
router.post('/isTokenValid', async (req: Request, res: Response) => {
  try {
    // after signin serverside send token to clientside, clientside set token to the localStorage
    // we retrieve this token and verified it
    const token = req.header('x-auth-token');
    if (!token) {
      return res.json(false);
    }
    //the token is link with the owner id cf signin
    const verifiedToken = jwt.verify(token, 'secretKey');
    if (!verifiedToken) {
      return res.json(false);
    }
    const owner = await Owner.findById(verifiedToken.ownerId);
    if (!owner) {
      return res.json(false);
    }
    if (owner) {
      return res.json(true);
    }
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
});

//get owner data
router.get('/', auth, async (req: Request, res: Response) => {
  console.log(req);
  //working on get owner info
});

module.exports = router;
