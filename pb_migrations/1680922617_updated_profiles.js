migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zdymemy1xn36i8x")

  // remove
  collection.schema.removeField("st1lmxcu")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zdymemy1xn36i8x")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "st1lmxcu",
    "name": "field",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "01u1cpwoivkq0h7",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
