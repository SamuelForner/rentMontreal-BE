import { Request, Response } from 'express';

import { Iowner } from '../interfaces/ownerInterface';
import Owner from '../models/owners';

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
    console.error('Error registering owner:', error);
    res.status(500).json({ message: "erreur d'enregistrement", error });
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
    res.status(200).json({ token });
  } catch (error) {
    console.error('error loggin in ', error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});

module.exports = router;
