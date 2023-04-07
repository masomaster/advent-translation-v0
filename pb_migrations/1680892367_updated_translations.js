migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("01u1cpwoivkq0h7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ngmtsgtd",
    "name": "day",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0cw3fps0",
    "name": "hebrew",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7iscj91d",
    "name": "greek",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("01u1cpwoivkq0h7")

  // remove
  collection.schema.removeField("ngmtsgtd")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
