import { Request, Response } from 'express';

const jwt = require('jsonwebtoken');

const auth = async (req: Request, res: Response) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.json({ message: 'no token, access denied' });
    }
    const verifiedToken = jwt.verify(token, 'secretKey');
    if (!verifiedToken) {
      return res.json({ message: 'false token, access denied' });
    }
    if (verifiedToken) {
      // req.owner = verifiedToken.id;
      // need to add the verifiedtoken id to the req
      console.log(req);
    }
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
};

module.exports = auth;
