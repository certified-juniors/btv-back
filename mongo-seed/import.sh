#! /bin/bash
mongoimport --host mongo -u $MONGO_USERNAME -p $MONGO_PASSWORD --db vtb --collection atms --type json --file /mongo-seed/atms.json --authenticationDatabase=admin --jsonArray
mongoimport --host mongo -u $MONGO_USERNAME -p $MONGO_PASSWORD --db vtb --collection offices --type json --file /mongo-seed/offices.json --authenticationDatabase=admin --jsonArray