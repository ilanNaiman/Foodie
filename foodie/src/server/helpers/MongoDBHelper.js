let server = require('../app');
let mongoose = require("mongoose");
const config = require("config");
const logger = require("../common/logger").winstonLogger;

class MongoDBHelper {
    static async emptyCollection(model) {
        let promise = new Promise(function (resolve, reject) {
            logger.info('Emptying collection: ' + model.collection.collectionName + ' from DB: ' + config.get("DB.DB_NAME"));

            model.deleteMany({}, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve("success")
                }
            });
        });
    }

    static async asyncEmptyCollections(collections) {
        await collections.map((collection => {MongoDBHelper.emptyCollection(collection).then(res => {
            return res;
        }).catch(err => {
            logger.error('Error emptying collection: ' + collection.collection.collectionName +
                ' from DB: ' + config.get("DB.DB_NAME"));
            return err;
            });
        }))
    }
}

// Export the class
module.exports = MongoDBHelper;