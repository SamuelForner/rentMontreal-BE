import { NextFunction, Response } from 'express';

import { IGetUserAuthInfoRequest } from '../interfaces/ownerInterface';

const jwt = require('jsonwebtoken');

const auth = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
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
      req.owner = verifiedToken.ownerId;
      next();
    }
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
  }
};

module.exports = auth;
