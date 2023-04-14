migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zdymemy1xn36i8x")

  // remove
  collection.schema.removeField("gbnacqnw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fsfduga8",
    "name": "latestDay",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zdymemy1xn36i8x")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gbnacqnw",
    "name": "latestDay",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("fsfduga8")

  return dao.saveCollection(collection)
})
