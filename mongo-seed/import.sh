#!/bin/bash

mongoimport --host mongo -u $MONGO_USERNAME -p $MONGO_PASSWORD --db vtb --collection atms --type json --file /mongo-seed/atms.json --authenticationDatabase=admin --jsonArray
mongo vtb --host mongo -u $MONGO_USERNAME -p $MONGO_PASSWORD --authenticationDatabase=admin --eval "db.atms.createIndex({longitude: 1, latitude: 1})"

mongoimport --host mongo -u $MONGO_USERNAME -p $MONGO_PASSWORD --db vtb --collection offices --type json --file /mongo-seed/offices.json --authenticationDatabase=admin --jsonArray
mongo vtb --host mongo -u $MONGO_USERNAME -p $MONGO_PASSWORD --authenticationDatabase=admin --eval "db.offices.createIndex({longitude: 1, latitude: 1})"
