import { Request, Response } from 'express';

import Property, { Iproperty } from '../models/properties';

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

//Listing all properties
router.get('/all', (req: Request, res: Response) => {
  Property.find().then((data: Iproperty[]) => {
    res.json(data);
  });
});

//Get a property by id
router.get('/:id', (req: Request, res: Response) => {
  Property.findById(req.params.id).then((data) => {
    res.json(data);
  });
});

module.exports = router;
