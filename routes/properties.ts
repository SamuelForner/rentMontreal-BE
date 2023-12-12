import { Request, Response } from 'express';

import Property, { Iproperty } from '../models/properties';

var express = require('express');

var router = express.Router();

//thunder client test please see readme.txt

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
router.get('/all', (req: Request, res: Response) => {
  Property.find().then((data: Iproperty[]) => {
    res.json(data);
  });
});

//Get property(ies) with  optional filter
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
  Property.find(query)
    .then((data) => {
      res.json(data);
    })
    .catch((err: Error) => {
      console.error(err);
      res.status(500).json({
        error: 'Erreur dans le filtrage',
        err,
      });
    });
});

//Get a property by id
router.get('/:id', (req: Request, res: Response) => {
  Property.findById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err: Error) => {
      console.error(err);
      res.status(500).json({
        error: "La propriété n'a pas été trouvé'.",
        err,
      });
    });
});
module.exports = router;
