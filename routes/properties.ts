import { Request, Response } from 'express';

import Property, { Iproperty } from '../models/properties';

var express = require('express');

var router = express.Router();

//thunder client test please see readme.txt

router.post('/add', (req: Request, res: Response) => {
  const {
    title,
    type,
    rooms,
    surfaceArea,
    isFurnished,
    address,
    description,
    picture,
  } = req.body as unknown as Iproperty;

  const newProperty = new Property({
    title: title,
    type: type,
    rooms: rooms,
    surfaceArea: surfaceArea,
    isFurnished: isFurnished,
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
  const { type, rooms, surfaceAreaMin, surfaceAreaMax, isFurnished } =
    req.query;
  //check if surfaceArea is in an interval for ex surfaceArea = x [10 < x < 100] = surfaceArea between 10 m2 & 100 m2
  const isSurfaceAreaInterval =
    surfaceAreaMax !== undefined && surfaceAreaMin !== undefined;

  if (type) {
    query.type = type;
  }

  if (rooms) {
    query.rooms = rooms;
  }

  if (
    isSurfaceAreaInterval ||
    (surfaceAreaMin && !isSurfaceAreaInterval) ||
    (surfaceAreaMax && !isSurfaceAreaInterval)
  ) {
    //if surfaceArea is in an interval
    query.surfaceArea =
      (isSurfaceAreaInterval && {
        $gte: surfaceAreaMin,
        $lte: surfaceAreaMax,
      }) ||
      //if it is not in an interval but user required a min surfaceArea
      (!isSurfaceAreaInterval &&
        surfaceAreaMin !== undefined && {
          $gte: surfaceAreaMin,
        }) ||
      //if it is not in an interval but user required a max surfaceArea
      (!isSurfaceAreaInterval &&
        surfaceAreaMax !== undefined && {
          $lte: surfaceAreaMax,
        });
    //I don't actually think that the user will specified a specific value to the surfaceArea like surfaceArea === 148m2
  }

  if (isFurnished) {
    query.isFurnished = isFurnished;
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
