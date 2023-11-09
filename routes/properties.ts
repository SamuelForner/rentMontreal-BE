import { Request, Response } from 'express';

import { Iproperty } from '../models/properties';

var Property = require('../models/properties.ts');

var express = require('express');

var router = express.Router();

router.post('/add', (req: Request, res: Response) => {
  const { title, type, rooms, surfaceArea, address, description, picture } =
    req.body as unknown as Iproperty;

  const newProperty = new Property({
    title: title,
    type: type,
    rooms: rooms,
    surfaceArea: surfaceArea,
    address: address,
    description: description,
    picture: picture,
  });
  newProperty.save().then((newProperty: Iproperty) => {
    res.json({ newProperty });
  });
});

router.get('/all', (req: Request, res: Response) => {
  Property.find().then((data: Iproperty) => {
    res.json({ propertiesList: data });
  });
});

module.exports = router;
