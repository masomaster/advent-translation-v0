migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("01u1cpwoivkq0h7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jr90zyon",
    "name": "profile",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "zdymemy1xn36i8x",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("01u1cpwoivkq0h7")

  // remove
  collection.schema.removeField("jr90zyon")

  return dao.saveCollection(collection)
})
