migrate((db) => {
  const collection = new Collection({
    "id": "01u1cpwoivkq0h7",
    "created": "2023-04-07 17:40:25.146Z",
    "updated": "2023-04-07 17:40:25.146Z",
    "name": "translations",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0cw3fps0",
        "name": "day_1_hebrew",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "7iscj91d",
        "name": "day_1_greek",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("01u1cpwoivkq0h7");

  return dao.deleteCollection(collection);
})
