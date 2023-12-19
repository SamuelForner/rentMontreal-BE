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
    floor,
    price,
    isChargesIncluded,
    accommodation,
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
    floor: floor,
    price: price,
    isChargesIncluded: isChargesIncluded,
    accommodation: accommodation,
    description: description,
    picture: picture,
  });
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
  const {
    type,
    rooms,
    surfaceAreaMin,
    surfaceAreaMax,
    isFurnished,
    floorMin,
    floorMax,
    priceMin,
    priceMax,
    isChargesIncluded,
    accommodation,
  } = req.query;
  //check if surfaceArea is in an interval for ex surfaceArea = x [10 < x < 100] = surfaceArea between 10 m2 & 100 m2
  const isSurfaceAreaInterval =
    surfaceAreaMax !== undefined && surfaceAreaMin !== undefined;
  const isFloorInterval = floorMin !== undefined && floorMax !== undefined;
  const isPriceInterval = priceMin !== undefined && priceMax !== undefined;

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
  if (
    isFloorInterval ||
    (!isFloorInterval && floorMin) ||
    (!isFloorInterval && floorMax)
  ) {
    query.floor =
      (isFloorInterval && {
        $gte: floorMin,
        $lte: floorMax,
      }) ||
      (!isFloorInterval &&
        floorMin !== undefined && {
          $gte: floorMin,
        }) ||
      (!isFloorInterval &&
        floorMax !== undefined && {
          $lte: floorMax,
        });
    //if the query is a specific floor (for example floor 2, just put floorMin = 2 & floorMax = 2)
  }
  if (
    isPriceInterval ||
    (!isPriceInterval && priceMin) ||
    (!isPriceInterval && priceMax)
  ) {
    query.price =
      (isPriceInterval && {
        $gte: priceMin,
        $lte: priceMax,
      }) ||
      (!isPriceInterval &&
        priceMin !== undefined && {
          $gte: priceMin,
        }) ||
      (!isPriceInterval &&
        priceMax !== undefined && {
          $lte: priceMax,
        });
  }
  if (isChargesIncluded) {
    query.isChargesIncluded = isChargesIncluded;
  }
  if (accommodation) {
    query.accommodation = accommodation;
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
