import { Request, Response } from 'express';

import Property, { Iproperty } from '../models/properties';

var express = require('express');

var router = express.Router();

//explication readMe
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
  console.log(newProperty);
  newProperty
    .save()
    .then((newProperty: Iproperty) => {
      res.json({ newProperty });
    })
    .catch((err: Error) => {
      console.error(err);
      res.status(500).json({
        error: "Erreur lors de l'enregistrement de la propriété.",
        err,
      });
    });
});

//Listing all properties
//must add catch error to prevent closing server
// => localhost:3000/properties/all
router.get('/all', (req: Request, res: Response) => {
  Property.find().then((data: Iproperty[]) => {
    res.json(data);
  });
});

//Get property(ies) with  optional filter
//must add catch error to prevent closing server
// => localhost:3000/properties/filter?surfaceArea=1500m2
// => localhost:3000/properties/filter?surfaceArea=1500m2&type=appartement
// => localhost:3000/properties/filter
router.get('/filter', (req: Request, res: Response) => {
  let query: { [key: string]: any } = {};
  if (req.query.type) {
    query.type = req.query.type;
  }
  if (req.query.rooms) {
    query.rooms = req.query.rooms;
  }
  if (req.query.surfaceArea) {
    query.surfaceArea = req.query.surfaceArea;
  }
  Property.find(query).then((data) => {
    res.json(data);
  });
});

//Get a property by id
//must add catch error to prevent closing server
// => localhost:3000/properties/654ad563f1a6e6066702d051
router.get('/:id', (req: Request, res: Response) => {
  Property.findById(req.params.id).then((data) => {
    res.json(data);
  });
});
module.exports = router;
