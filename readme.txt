POST Add 
localhost:3000/properties/add
Body/JSON
{
    "title": "test",
    "type": "Apartment",
    "rooms": 1,
    "surfaceArea": 40,
    "isFurnished": true,
    "address": {
      "street": "Davidson",
      "city": "Montreal",
      "postCode": "92300",
      "country": "Canada"
    },
    "floor": 1,
    "price": 1500,
    "isChargesIncluded": true,
    "accommodation": FlatShare,
    "description": "Jolie une pièce de 40m2",
    "picture": "https://img.freepik.com/photos-gratuite/salon-luxe-loft-etagere-pres-table-manger_105762-1796.jpg?w=826&t=st=1701385287~exp=1701385887~hmac=61f5ca868c9f7d0620ce878eed3b3ee44f90889fc418bd8824c8a03bc4a99f98"
  }

////////////////////////////////////////////////

router.get(/all)
Listing all properties
=>localhost:3000/properties/all

////////////////////////////////////////////////

router.get(/filter)
Get property(ies) with  optional filter
=> localhost:3000/properties/filter?surfaceArea=1500m2
=> localhost:3000/properties/filter?type=Apartment&surfaceArea=1900m2
=> localhost:3000/properties/filter
=> localhost:3000/properties/filter?type=House&isFurnished=true&surfaceAreaMin=20&surfaceAreaMax=300

////////////////////////////////////////////////
router.get('/:id)
Get a property by id
=>localhost:3000/properties/654ad563f1a6e6066702d051