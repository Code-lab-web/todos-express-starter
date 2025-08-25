import mongoose from 'mongoose';
const { Schema } = mongoose;

const Blog = mongoose.model('Blog', blogSchema);
// ready to go!
const schema = new Schema();

schema.path('_id'); // ObjectId { ... }
const Model = mongoose.model('Test', schema);

const doc = new Model();
doc._id instanceof mongoose.Types.ObjectId; // true
const schema = new Schema({
    _id: Number // <-- overwrite Mongoose's default `_id`
  });
  const Model = mongoose.model('Test', schema);
  
  const doc = new Model();
  await doc.save(); // Throws "document must have an _id before saving"
  
  doc._id = 1;
  await doc.save(); // works
  const nestedSchema = new Schema(
    { name: String },
    { _id: false } // <-- disable `_id`
  );
  const schema = new Schema({
    subdoc: nestedSchema,
    docArray: [nestedSchema]
  });
  const Test = mongoose.model('Test', schema);
  
  // Neither `subdoc` nor `docArray.0` will have an `_id`
  await Test.create({
    subdoc: { name: 'test 1' },
    docArray: [{ name: 'test 2' }]
  });
  // define a schema
const animalSchema = new Schema({ name: String, type: String },
    {
    // Assign a function to the "methods" object of our animalSchema through schema options.
    // By following this approach, there is no need to create a separate TS type to define the type of the instance functions.
      methods: {
        findSimilarTypes(cb) {
          return mongoose.model('Animal').find({ type: this.type }, cb);
        }
      }
    });
    const Animal = mongoose.model('Animal', animalSchema);
const dog = new Animal({ type: 'dog' });

dog.findSimilarTypes((err, dogs) => {
  console.log(dogs); // woof
});
// define a schema
const animalSchema = new Schema({ name: String, type: String },
    {
    // Assign a function to the "statics" object of our animalSchema through schema options.
    // By following this approach, there is no need to create a separate TS type to define the type of the statics functions.
      statics: {
        findByName(name) {
          return this.find({ name: new RegExp(name, 'i') });
        }
      }
    });
  
  // Or, Assign a function to the "statics" object of our animalSchema
  animalSchema.statics.findByName = function(name) {
    return this.find({ name: new RegExp(name, 'i') });
  };
  // Or, equivalently, you can call `animalSchema.static()`.
  animalSchema.static('findByBreed', function(breed) { return this.find({ breed }); });
  
  const Animal = mongoose.model('Animal', animalSchema);
  let animals = await Animal.findByName('fido');
  animals = animals.concat(await Animal.findByBreed('Poodle'));
  // define a schema
const animalSchema = new Schema({ name: String, type: String },
    {
    // Assign a function to the "query" object of our animalSchema through schema options.
    // By following this approach, there is no need to create a separate TS type to define the type of the query functions.
      query: {
        byName(name) {
          return this.where({ name: new RegExp(name, 'i') });
        }
      }
    });
  
  // Or, Assign a function to the "query" object of our animalSchema
  animalSchema.query.byName = function(name) {
    return this.where({ name: new RegExp(name, 'i') });
  };
  
  const Animal = mongoose.model('Animal', animalSchema);
  
  Animal.find().byName('fido').exec((err, animals) => {
    console.log(animals);
  });
  
  Animal.findOne().byName('fido').exec((err, animal) => {
    console.log(animal);
  });
  Indexes
  const animalSchema = new Schema({
    name: String,
    type: String,
    tags: { type: [String], index: true } // path level
  });
  
  animalSchema.index({ name: 1, type: -1 }); // schema level
  mongoose.connect('mongodb://user:pass@127.0.0.1:port/database', { autoIndex: false });
// or
mongoose.createConnection('mongodb://user:pass@127.0.0.1:port/database', { autoIndex: false });
// or
mongoose.set('autoIndex', false);
// or
animalSchema.set('autoIndex', false);
// or
new Schema({ /* ... */ }, { autoIndex: false });
// Will cause an error because mongodb has an _id index by default that
// is not sparse
animalSchema.index({ _id: 1 }, { sparse: true });
const Animal = mongoose.model('Animal', animalSchema);

Animal.on('index', error => {
  // "_id index cannot be sparse"
  console.log(error.message);
});
// define a schema
const personSchema = new Schema({
    name: {
      first: String,
      last: String
    }
  });
  
  // compile our model
  const Person = mongoose.model('Person', personSchema);
  
  // create a document
  const axl = new Person({
    name: { first: 'Axl', last: 'Rose' }
  });
  console.log(axl.name.first + ' ' + axl.name.last); // Axl Rose
  // That can be done either by adding it to schema options:
const personSchema = new Schema({
    name: {
      first: String,
      last: String
    }
  }, {
    virtuals: {
      fullName: {
        get() {
          return this.name.first + ' ' + this.name.last;
        }
      }
    }
  });
  
  // Or by using the virtual method as following:
  personSchema.virtual('fullName').get(function() {
    return this.name.first + ' ' + this.name.last;
  });
  console.log(axl.fullName); // Axl Rose
  // Convert `doc` to a POJO, with virtuals attached
doc.toObject({ virtuals: true });

// Equivalent:
doc.toJSON({ virtuals: true });
// Explicitly add virtuals to `JSON.stringify()` output
JSON.stringify(doc.toObject({ virtuals: true }));

// Or, to automatically attach virtuals to `JSON.stringify()` output:
const personSchema = new Schema({
  name: {
    first: String,
    last: String
  }
}, {
  toJSON: { virtuals: true } // <-- include virtuals in `JSON.stringify()`
});
// Again that can be done either by adding it to schema options:
const personSchema = new Schema({
    name: {
      first: String,
      last: String
    }
  }, {
    virtuals: {
      fullName: {
        get() {
          return this.name.first + ' ' + this.name.last;
        },
        set(v) {
          this.name.first = v.substr(0, v.indexOf(' '));
          this.name.last = v.substr(v.indexOf(' ') + 1);
        }
      }
    }
  });
  
  // Or by using the virtual method as following:
  personSchema.virtual('fullName').
    get(function() {
      return this.name.first + ' ' + this.name.last;
    }).
    set(function(v) {
      this.name.first = v.substr(0, v.indexOf(' '));
      this.name.last = v.substr(v.indexOf(' ') + 1);
    });
  
  axl.fullName = 'William Rose'; // Now `axl.name.first` is "William"
  const personSchema = new Schema({
    n: {
      type: String,
      // Now accessing `name` will get you the value of `n`, and setting `name` will set the value of `n`
      alias: 'name'
    }
  });
  
  // Setting `name` will propagate to `n`
  const person = new Person({ name: 'Val' });
  console.log(person); // { n: 'Val' }
  console.log(person.toObject({ virtuals: true })); // { n: 'Val', name: 'Val' }
  console.log(person.name); // "Val"
  
  person.name = 'Not Val';
  console.log(person); // { n: 'Not Val' }
  const childSchema = new Schema({
    n: {
      type: String,
      alias: 'name'
    }
  }, { _id: false });
  
  const parentSchema = new Schema({
    // If in a child schema, alias doesn't need to include the full nested path
    c: childSchema,
    name: {
      f: {
        type: String,
        // Alias needs to include the full nested path if declared inline
        alias: 'name.first'
      }
    }
  });
  new Schema({ /* ... */ }, options);

// or

const schema = new Schema({ /* ... */ });
schema.set(option, value);
const schema = new Schema({ /* ... */ }, { autoIndex: false });
const Clock = mongoose.model('Clock', schema);
Clock.ensureIndexes(callback);
const schema = new Schema({ name: String }, {
    autoCreate: false,
    capped: { size: 1024 }
  });
  const Test = mongoose.model('Test', schema);
  
  // No-op if collection already exists, even if the collection is not capped.
  // This means that `capped` won't be applied if the 'tests' collection already exists.
  await Test.createCollection();
  const schema = new Schema({ /* ... */ }, { bufferCommands: false });
  mongoose.set('bufferCommands', true);
// Schema option below overrides the above, if the schema option is set.
const schema = new Schema({ /* ... */ }, { bufferCommands: false });
// If an operation is buffered for more than 1 second, throw an error.
const schema = new Schema({ /* ... */ }, { bufferTimeoutMS: 1000 });
new Schema({ /* ... */ }, { capped: 1024 });
new Schema({ /* ... */ }, { capped: { size: 1024, max: 1000, autoIndexId: true } });
const dataSchema = new Schema({ /* ... */ }, { collection: 'data' });
const baseSchema = new Schema({}, { discriminatorKey: 'type' });
const BaseModel = mongoose.model('Test', baseSchema);

const personSchema = new Schema({ name: String });
const PersonModel = BaseModel.discriminator('Person', personSchema);

const doc = new PersonModel({ name: 'James T. Kirk' });
// Without `discriminatorKey`, Mongoose would store the discriminator
// key in `__t` instead of `type`
doc.type; // 'Person'
const childSchema1 = Schema({
    name: { type: String, index: true }
  });
  
  const childSchema2 = Schema({
    name: { type: String, index: true }
  }, { excludeIndexes: true });
  
  // Mongoose will create an index on `child1.name`, but **not** `child2.name`, because `excludeIndexes`
  // is true on `childSchema2`
  const User = new Schema({
    name: { type: String, index: true },
    child1: childSchema1,
    child2: childSchema2
  });
  // default behavior
const schema = new Schema({ name: String });
const Page = mongoose.model('Page', schema);
const p = new Page({ name: 'mongodb.org' });
console.log(p.id); // '50341373e894ad16347efe01'

// disabled id
const schema = new Schema({ name: String }, { id: false });
const Page = mongoose.model('Page', schema);
const p = new Page({ name: 'mongodb.org' });
console.log(p.id); // undefined
// default behavior
const schema = new Schema({ name: String });
const Page = mongoose.model('Page', schema);
const p = new Page({ name: 'mongodb.org' });
console.log(p); // { _id: '50341373e894ad16347efe01', name: 'mongodb.org' }

// disabled _id
const childSchema = new Schema({ name: String }, { _id: false });
const parentSchema = new Schema({ children: [childSchema] });

const Model = mongoose.model('Model', parentSchema);

Model.create({ children: [{ name: 'Luke' }] }, (error, doc) => {
  // doc.children[0]._id will be undefined
});
const schema = new Schema({ name: String, inventory: {} });
const Character = mongoose.model('Character', schema);

// will store `inventory` field if it is not empty
const frodo = new Character({ name: 'Frodo', inventory: { ringOfPower: 1 } });
await frodo.save();
let doc = await Character.findOne({ name: 'Frodo' }).lean();
doc.inventory; // { ringOfPower: 1 }

// will not store `inventory` field if it is empty
const sam = new Character({ name: 'Sam', inventory: {} });
await sam.save();
doc = await Character.findOne({ name: 'Sam' }).lean();
doc.inventory; // undefined
const schema = new Schema({ name: String, inventory: {} }, { minimize: false });
const Character = mongoose.model('Character', schema);

// will store `inventory` if empty
const sam = new Character({ name: 'Sam', inventory: {} });
await sam.save();
doc = await Character.findOne({ name: 'Sam' }).lean();
doc.inventory; // {}
const sam = new Character({ name: 'Sam', inventory: {} });
sam.$isEmpty('inventory'); // true

sam.inventory.barrowBlade = 1;
sam.$isEmpty('inventory'); // false
const schema = new Schema({ /* ... */ }, { read: 'primary' });            // also aliased as 'p'
const schema = new Schema({ /* ... */ }, { read: 'primaryPreferred' });   // aliased as 'pp'
const schema = new Schema({ /* ... */ }, { read: 'secondary' });          // aliased as 's'
const schema = new Schema({ /* ... */ }, { read: 'secondaryPreferred' }); // aliased as 'sp'
const schema = new Schema({ /* ... */ }, { read: 'nearest' });            // aliased as 'n'
// pings the replset members periodically to track network latency
const options = { replset: { strategy: 'ping' } };
mongoose.connect(uri, options);

const schema = new Schema({ /* ... */ }, { read: ['nearest', { disk: 'ssd' }] });
mongoose.model('JellyBean', schema);
const schema = new Schema({ name: String }, {
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000
    }
  });
  new Schema({ /* ... */ }, { shardKey: { tag: 1, name: 1 } });
  const thingSchema = new Schema({ /* ... */ })
const Thing = mongoose.model('Thing', thingSchema);
const thing = new Thing({ iAmNotInTheSchema: true });
thing.save(); // iAmNotInTheSchema is not saved to the db

// set to false..
const thingSchema = new Schema({ /* ... */ }, { strict: false });
const thing = new Thing({ iAmNotInTheSchema: true });
thing.save(); // iAmNotInTheSchema is now saved to the db!!
const thingSchema = new Schema({ /* ... */ });
const Thing = mongoose.model('Thing', thingSchema);
const thing = new Thing;
thing.set('iAmNotInTheSchema', true);
thing.save(); // iAmNotInTheSchema is not saved to the db
const Thing = mongoose.model('Thing');
const thing = new Thing(doc, true);  // enables strict mode
const thing = new Thing(doc, false); // disables strict mode
const thingSchema = new Schema({ /* ... */ });
const Thing = mongoose.model('Thing', thingSchema);
const thing = new Thing;
thing.iAmNotInTheSchema = true;
thing.save(); // iAmNotInTheSchema is never saved to the db
const mySchema = new Schema({ field: Number }, { strict: true });
const MyModel = mongoose.model('Test', mySchema);
// Mongoose will filter out `notInSchema: 1` because `strict: true`, meaning this query will return
// _all_ documents in the 'tests' collection
MyModel.find({ notInSchema: 1 });
// Mongoose will strip out `notInSchema` from the update if `strict` is
// not `false`
MyModel.updateMany({}, { $set: { notInSchema: 1 } });
const mySchema = new Schema({ field: Number }, {
    strict: true,
    strictQuery: false // Turn off strict mode for query filters
  });
  const MyModel = mongoose.model('Test', mySchema);
  // Mongoose will not strip out `notInSchema: 1` because `strictQuery` is false
  MyModel.find({ notInSchema: 1 });
  // Do this instead:
const docs = await MyModel.find({ name: req.query.name, age: req.query.age }).setOptions({ sanitizeFilter: true });
// Set `strictQuery` to `true` to omit unknown fields in queries.
mongoose.set('strictQuery', true);
const schema = new Schema({ name: String });
schema.path('name').get(function(v) {
  return v + ' is my name';
});
schema.set('toJSON', { getters: true, virtuals: false });
const M = mongoose.model('Person', schema);
const m = new M({ name: 'Max Headroom' });
console.log(m.toObject()); // { _id: 504e0cd7dd992d9be2f20b6f, name: 'Max Headroom' }
console.log(m.toJSON()); // { _id: 504e0cd7dd992d9be2f20b6f, name: 'Max Headroom is my name' }
// since we know toJSON is called whenever a js object is stringified:
console.log(JSON.stringify(m)); // { "_id": "504e0cd7dd992d9be2f20b6f", "name": "Max Headroom is my name" }
const schema = new Schema({ name: String });
schema.path('name').get(function(v) {
  return v + ' is my name';
});
schema.set('toObject', { getters: true });
const M = mongoose.model('Person', schema);
const m = new M({ name: 'Max Headroom' });
console.log(m); // { _id: 504e0cd7dd992d9be2f20b6f, name: 'Max Headroom is my name' }
// Mongoose interprets this as 'loc is a String'
const schema = new Schema({ loc: { type: String, coordinates: [Number] } });
const schema = new Schema({
    // Mongoose interprets this as 'loc is an object with 2 keys, type and coordinates'
    loc: { type: String, coordinates: [Number] },
    // Mongoose interprets this as 'name is a String'
    name: { $type: String }
  }, { typeKey: '$type' }); // A '$type' key means this object is a type declaration
  const schema = new Schema({ name: String });
schema.set('validateBeforeSave', false);
schema.path('name').validate(function(value) {
  return value != null;
});
const M = mongoose.model('Person', schema);
const m = new M({ name: null });
m.validate(function(err) {
  console.log(err); // Will tell you that null is not allowed.
});
m.save(); // Succeeds despite being invalid
const schema = new Schema({ name: 'string' });
const Thing = mongoose.model('Thing', schema);
const thing = new Thing({ name: 'mongoose v3' });
await thing.save(); // { __v: 0, name: 'mongoose v3' }

// customized versionKey
new Schema({ /* ... */ }, { versionKey: '_somethingElse' })
const Thing = mongoose.model('Thing', schema);
const thing = new Thing({ name: 'mongoose v3' });
thing.save(); // { _somethingElse: 0, name: 'mongoose v3' }
// 2 copies of the same document
const doc1 = await Model.findOne({ _id });
const doc2 = await Model.findOne({ _id });

// Delete first 3 comments from `doc1`
doc1.comments.splice(0, 3);
await doc1.save();

// The below `save()` will throw a VersionError, because you're trying to
// modify the comment at index 1, and the above `splice()` removed that
// comment.
doc2.set('comments.1.body', 'new comment');
await doc2.save();
new Schema({ /* ... */ }, { versionKey: false });
const Thing = mongoose.model('Thing', schema);
const thing = new Thing({ name: 'no versioning please' });
thing.save(); // { name: 'no versioning please' }
schema.pre('findOneAndUpdate', function() {
    const update = this.getUpdate();
    if (update.__v != null) {
      delete update.__v;
    }
    const keys = ['$set', '$setOnInsert'];
    for (const key of keys) {
      if (update[key] != null && update[key].__v != null) {
        delete update[key].__v;
        if (Object.keys(update[key]).length === 0) {
          delete update[key];
        }
      }
    }
    update.$inc = update.$inc || {};
    update.$inc.__v = 1;
  });
  async function markApproved(id) {
    const house = await House.findOne({ _id });
    if (house.photos.length < 2) {
      throw new Error('House must have at least two photos!');
    }
  
    house.status = 'APPROVED';
    await house.save();
  }
  const house = await House.findOne({ _id });
if (house.photos.length < 2) {
  throw new Error('House must have at least two photos!');
}

const house2 = await House.findOne({ _id });
house2.photos = [];
await house2.save();

// Marks the house as 'APPROVED' even though it has 0 photos!
house.status = 'APPROVED';
await house.save();
const House = mongoose.model('House', Schema({
    status: String,
    photos: [String]
  }, { optimisticConcurrency: true }));
  
  const house = await House.findOne({ _id });
  if (house.photos.length < 2) {
    throw new Error('House must have at least two photos!');
  }
  
  const house2 = await House.findOne({ _id });
  house2.photos = [];
  await house2.save();
  
  // Throws 'VersionError: No matching document found for id "..." version 0'
  house.status = 'APPROVED';
  await house.save();
  const schema = new Schema({
    name: String
  }, { collation: { locale: 'en_US', strength: 1 } });
  
  const MyModel = db.model('MyModel', schema);
  
  MyModel.create([{ name: 'val' }, { name: 'Val' }]).
    then(() => {
      return MyModel.find({ name: 'val' });
    }).
    then((docs) => {
      // `docs` will contain both docs, because `strength: 1` means
      // MongoDB will ignore case when matching.
    });
    const schema = Schema({ name: String, timestamp: Date, metadata: Object }, {
        timeseries: {
          timeField: 'timestamp',
          metaField: 'metadata',
          granularity: 'hours'
        },
        autoCreate: false,
        expireAfterSeconds: 86400
      });
      
      // `Test` collection will be a timeseries collection
      const Test = db.model('Test', schema);
      new Schema({ /* ... */ }, { skipVersioning: { dontVersionMe: true } });
thing.dontVersionMe.push('hey');
thing.save(); // version is not incremented
const thingSchema = new Schema({ /* ... */ }, { timestamps: { createdAt: 'created_at' } });
const Thing = mongoose.model('Thing', thingSchema);
const thing = new Thing();
await thing.save(); // `created_at` & `updatedAt` will be included

// With updates, Mongoose will add `updatedAt` to `$set`
await Thing.updateOne({}, { $set: { name: 'Test' } });

// If you set upsert: true, Mongoose will add `created_at` to `$setOnInsert` as well
await Thing.findOneAndUpdate({}, { $set: { name: 'Test2' } });

// Mongoose also adds timestamps to bulkWrite() operations
// See https://mongoosejs.com/docs/api/model.html#model_Model-bulkWrite
await Thing.bulkWrite([
  {
    insertOne: {
      document: {
        name: 'Jean-Luc Picard',
        ship: 'USS Stargazer'
      // Mongoose will add `created_at` and `updatedAt`
      }
    }
  },
  {
    updateOne: {
      filter: { name: 'Jean-Luc Picard' },
      update: {
        $set: {
          ship: 'USS Enterprise'
        // Mongoose will add `updatedAt`
        }
      }
    }
  }
]);
const schema = Schema({
    createdAt: Number,
    updatedAt: Number,
    name: String
  }, {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
  });
  // Add a `meta` property to all schemas
mongoose.plugin(function myPlugin(schema) {
    schema.add({ meta: {} });
  });
  const schema1 = new Schema({
    name: String
  }, { pluginTags: ['useMetaPlugin'] });
  
  const schema2 = new Schema({
    name: String
  });
  / Add a `meta` property to all schemas
mongoose.plugin(function myPlugin(schema) {
  schema.add({ meta: {} });
}, { tags: ['useMetaPlugin'] });
const bookSchema = new Schema({
    title: 'String',
    author: { type: 'ObjectId', ref: 'Person' }
  });
  const Book = mongoose.model('Book', bookSchema);
  
  // By default, Mongoose will add `author` to the below `select()`.
  await Book.find().select('title').populate('author');
  
  // In other words, the below query is equivalent to the above
  await Book.find().select('title author').populate('author');
  const bookSchema = new Schema({
    title: 'String',
    author: { type: 'ObjectId', ref: 'Person' }
  }, { selectPopulatedPaths: false });
  const Book = mongoose.model('Book', bookSchema);
  
  // Because `selectPopulatedPaths` is false, the below doc will **not**
  // contain an `author` property.
  const doc = await Book.findOne().select('title').populate('author');
  const childSchema = new Schema({ name: { type: String, required: true } });
const parentSchema = new Schema({ child: childSchema });

const Parent = mongoose.model('Parent', parentSchema);

// Will contain an error for both 'child.name' _and_ 'child'
new Parent({ child: {} }).validateSync().errors;
const childSchema = new Schema({
    name: { type: String, required: true }
  }, { storeSubdocValidationError: false }); // <-- set on the child schema
  const parentSchema = new Schema({ child: childSchema });
  
  const Parent = mongoose.model('Parent', parentSchema);
  
  // Will only contain an error for 'child.name'
  new Parent({ child: {} }).validateSync().errors;
  const schema = new Schema({ name: String }, {
    autoCreate: false,
    collectionOptions: {
      capped: true,
      max: 1000
    }
  });
  const Test = mongoose.model('Test', schema);
  
  // Equivalent to `createCollection({ capped: true, max: 1000 })`
  await Test.createCollection();
  const schema = new Schema({ name: String }, { autoSearchIndex: true });
schema.searchIndex({
  name: 'my-index',
  definition: { mappings: { dynamic: true } }
});
// Will automatically attempt to create the `my-index` search index.
const Test = mongoose.model('Test', schema);
const eventSchema = new mongoose.Schema(
    { name: String },
    {
      readConcern: { level: 'available' } // <-- set default readConcern for all queries
    }
  );
  class MyClass {
    myMethod() { return 42; }
    static myStatic() { return 42; }
    get myVirtual() { return 42; }
  }
  
  const schema = new mongoose.Schema();
  schema.loadClass(MyClass);
  
  console.log(schema.methods); // { myMethod: [Function: myMethod] }
  console.log(schema.statics); // { myStatic: [Function: myStatic] }
  console.log(schema.virtuals); // { myVirtual: VirtualType { ... } }
  const schema = new Schema({ name: String });
schema.path('name') instanceof mongoose.SchemaType; // true
schema.path('name') instanceof mongoose.Schema.Types.String; // true
schema.path('name').instance; // 'String'
const schema = new Schema({
    name: String,
    binary: Buffer,
    living: Boolean,
    updated: { type: Date, default: Date.now },
    age: { type: Number, min: 18, max: 65 },
    mixed: Schema.Types.Mixed,
    _someId: Schema.Types.ObjectId,
    decimal: Schema.Types.Decimal128,
    double: Schema.Types.Double,
    int32bit: Schema.Types.Int32,
    array: [],
    ofString: [String],
    ofNumber: [Number],
    ofDates: [Date],
    ofBuffer: [Buffer],
    ofBoolean: [Boolean],
    ofMixed: [Schema.Types.Mixed],
    ofObjectId: [Schema.Types.ObjectId],
    ofArrays: [[]],
    ofArrayOfNumbers: [[Number]],
    nested: {
      stuff: { type: String, lowercase: true, trim: true }
    },
    map: Map,
    mapOfString: {
      type: Map,
      of: String
    }
  });
  
  // example use
  
  const Thing = mongoose.model('Thing', schema);
  
  const m = new Thing;
  m.name = 'Statue of Liberty';
  m.age = 125;
  m.updated = new Date;
  m.binary = Buffer.alloc(0);
  m.living = false;
  m.mixed = { any: { thing: 'i want' } };
  m.markModified('mixed');
  m._someId = new mongoose.Types.ObjectId;
  m.array.push(1);
  m.ofString.push('strings!');
  m.ofNumber.unshift(1, 2, 3, 4);
  m.ofDates.addToSet(new Date);
  m.ofBuffer.pop();
  m.ofMixed = [1, [], 'three', { four: 5 }];
  m.nested.stuff = 'good';
  m.map = new Map([['key', 'value']]);
  m.save(callback);
  // 3 string SchemaTypes: 'name', 'nested.firstName', 'nested.lastName'
const schema = new Schema({
    name: { type: String },
    nested: {
      firstName: { type: String },
      lastName: { type: String }
    }
  });
  const holdingSchema = new Schema({
    // You might expect `asset` to be an object that has 2 properties,
    // but unfortunately `type` is special in Mongoose so mongoose
    // interprets this schema to mean that `asset` is a string
    asset: {
      type: String,
      ticker: String
    }
  });
  const holdingSchema = new Schema({
    asset: {
      // Workaround to make sure Mongoose knows `asset` is an object
      // and `asset.type` is a string, rather than thinking `asset`
      // is a string.
      type: { type: String },
      ticker: String
    }
  });
  const schema1 = new Schema({
    test: String // `test` is a path of type String
  });
  
  const schema2 = new Schema({
    // The `test` object contains the "SchemaType options"
    test: { type: String } // `test` is a path of type string
  });
  const schema2 = new Schema({
    test: {
      type: String,
      lowercase: true // Always convert `test` to lowercase
    }
  });
  const numberSchema = new Schema({
    integerOnly: {
      type: Number,
      get: v => Math.round(v),
      set: v => Math.round(v),
      alias: 'i'
    }
  });
  
  const Number = mongoose.model('Number', numberSchema);
  
  const doc = new Number();
  doc.integerOnly = 2.001;
  doc.integerOnly; // 2
  doc.i; // 2
  doc.i = 3.001;
  doc.integerOnly; // 3
  doc.i; // 3
  const schema2 = new Schema({
    test: {
      type: String,
      index: true,
      unique: true // Unique index. If you specify `unique: true`
      // specifying `index: true` is optional if you do `unique: true`
    }
  });
  const schema1 = new Schema({ name: String }); // name will be cast to string
const schema2 = new Schema({ name: 'String' }); // Equivalent

const Person = mongoose.model('Person', schema2);
new Person({ name: 42 }).name; // "42" as a string
new Person({ name: { toString: () => 42 } }).name; // "42" as a string

// "undefined", will get a cast error if you `save()` this document
new Person({ name: { foo: 42 } }).name;
const schema1 = new Schema({ age: Number }); // age will be cast to a Number
const schema2 = new Schema({ age: 'Number' }); // Equivalent

const Car = mongoose.model('Car', schema2);
new Car({ age: '15' }).age; // 15 as a Number
new Car({ age: true }).age; // 1 as a Number
new Car({ age: false }).age; // 0 as a Number
new Car({ age: { valueOf: () => 83 } }).age; // 83 as a Number
const Assignment = mongoose.model('Assignment', { dueDate: Date });
const doc = await Assignment.findOne();
doc.dueDate.setMonth(3);
await doc.save(); // THIS DOES NOT SAVE YOUR CHANGE

doc.markModified('dueDate');
await doc.save(); // works
const schema1 = new Schema({ binData: Buffer }); // binData will be cast to a Buffer
const schema2 = new Schema({ binData: 'Buffer' }); // Equivalent

const Data = mongoose.model('Data', schema2);
const file1 = new Data({ binData: 'test'}); // {"type":"Buffer","data":[116,101,115,116]}
const file2 = new Data({ binData: 72987 }); // {"type":"Buffer","data":[27]}
const file4 = new Data({ binData: { type: 'Buffer', data: [1, 2, 3]}}); // {"type":"Buffer","data":[1,2,3]}
const Any = new Schema({ any: {} });
const Any = new Schema({ any: Object });
const Any = new Schema({ any: Schema.Types.Mixed });
const Any = new Schema({ any: mongoose.Mixed });
person.anything = { x: [3, 4, { y: 'changed' }] };
person.markModified('anything');
person.save(); // Mongoose will save changes to `anything`.
const mongoose = require('mongoose');
const carSchema = new mongoose.Schema({ driver: mongoose.ObjectId });
const Car = mongoose.model('Car', carSchema);

const car = new Car();
car.driver = new mongoose.Types.ObjectId();

typeof car.driver; // 'object'
car.driver instanceof mongoose.Types.ObjectId; // true

car.driver.toString(); // Something like "5e1a0651741b255ddda996c4"
const M = mongoose.model('Test', new Schema({ b: Boolean }));
console.log(new M({ b: 'nay' }).b); // undefined

// Set { false, 'false', 0, '0', 'no' }
console.log(mongoose.Schema.Types.Boolean.convertToFalse);

mongoose.Schema.Types.Boolean.convertToFalse.add('nay');
console.log(new M({ b: 'nay' }).b); // false
const ToySchema = new Schema({ name: String });
const ToyBoxSchema = new Schema({
  toys: [ToySchema],
  buffers: [Buffer],
  strings: [String],
  numbers: [Number]
  // ... etc
});
const ToyBox = mongoose.model('ToyBox', ToyBoxSchema);
console.log((new ToyBox()).toys); // []
const ToyBoxSchema = new Schema({
    toys: {
      type: [ToySchema],
      default: undefined
    }
  });
  const Empty1 = new Schema({ any: [] });
const Empty2 = new Schema({ any: Array });
const Empty3 = new Schema({ any: [Schema.Types.Mixed] });
const Empty4 = new Schema({ any: [{}] });
const userSchema = new Schema({
    // `socialMediaHandles` is a map whose values are strings. A map's
    // keys are always strings. You specify the type of values using `of`.
    socialMediaHandles: {
      type: Map,
      of: String
    }
  });
  
  const User = mongoose.model('User', userSchema);
  // Map { 'github' => 'vkarpov15', 'twitter' => '@code_barbarian' }
  console.log(new User({
    socialMediaHandles: {
      github: 'vkarpov15',
      twitter: '@code_barbarian'
    }
  }).socialMediaHandles);
  const user = new User({
    socialMediaHandles: {}
  });
  
  // Good
  user.socialMediaHandles.set('github', 'vkarpov15');
  // Works too
  user.set('socialMediaHandles.twitter', '@code_barbarian');
  // Bad, the `myspace` property will **not** get saved
  user.socialMediaHandles.myspace = 'fail';
  
  // 'vkarpov15'
  console.log(user.socialMediaHandles.get('github'));
  // '@code_barbarian'
  console.log(user.get('socialMediaHandles.twitter'));
  // undefined
  user.socialMediaHandles.github;
  
  // Will only save the 'github' and 'twitter' properties
  user.save();
  const userSchema = new Schema({
    socialMediaHandles: {
      type: Map,
      of: new Schema({
        handle: String,
        oauth: {
          type: ObjectId,
          ref: 'OAuth'
        }
      })
    }
  });
  const User = mongoose.model('User', userSchema);
  const user = await User.findOne().populate('socialMediaHandles.$*.oauth');
  const authorSchema = new Schema({
    _id: Schema.Types.UUID, // Can also do `_id: 'UUID'`
    name: String
  });
  
  const Author = mongoose.model('Author', authorSchema);
  
  const bookSchema = new Schema({
    authorId: { type: Schema.Types.UUID, ref: 'Author' }
  });
  const Book = mongoose.model('Book', bookSchema);
  
  const author = new Author({ name: 'Martin Fowler' });
  console.log(typeof author._id); // 'string'
  console.log(author.toObject()._id instanceof mongoose.mongo.BSON.Binary); // true
  
  const book = new Book({ authorId: '09190f70-3d30-11e5-8814-0f4df9a59c41' });
  const { randomUUID } = require('crypto');

const schema = new mongoose.Schema({
  docId: {
    type: 'UUID',
    default: () => randomUUID()
  }
});
const questionSchema = new Schema({
    answer: BigInt
  });
  const Question = mongoose.model('Question', questionSchema);
  
  const question = new Question({ answer: 42n });
  typeof question.answer; // 'bigint'
  const temperatureSchema = new Schema({
    celsius: Double
  });
  const Temperature = mongoose.model('Temperature', temperatureSchema);
  
  const temperature = new Temperature({ celsius: 1339 });
  temperature.celsius instanceof bson.Double; // true
  new Temperature({ celsius: '1.2e12' }).celsius; // 15 as a Double
new Temperature({ celsius: true }).celsius; // 1 as a Double
new Temperature({ celsius: false }).celsius; // 0 as a Double
new Temperature({ celsius: { valueOf: () => 83.0033 } }).celsius; // 83 as a Double
new Temperature({ celsius: '' }).celsius; // null
const studentSchema = new Schema({
    id: Int32
  });
  const Student = mongoose.model('Student', studentSchema);
  
  const student = new Student({ id: 1339 });
  typeof student.id; // 'number'
  new Student({ id: '15' }).id; // 15 as a Int32
new Student({ id: true }).id; // 1 as a Int32
new Student({ id: false }).id; // 0 as a Int32
new Student({ id: { valueOf: () => 83 } }).id; // 83 as a Int32
new Student({ id: '' }).id; // null as a Int32
const root = 'https://s3.amazonaws.com/mybucket';

const userSchema = new Schema({
  name: String,
  picture: {
    type: String,
    get: v => `${root}${v}`
  }
});

const User = mongoose.model('User', userSchema);

const doc = new User({ name: 'Val', picture: '/123.png' });
doc.picture; // 'https://s3.amazonaws.com/mybucket/123.png'
doc.toObject({ getters: false }).picture; // '/123.png'
const schema = new Schema({
    arr: [{ url: String }]
  });
  
  const root = 'https://s3.amazonaws.com/mybucket';
  
  // Bad, don't do this!
  schema.path('arr').get(v => {
    return v.map(el => Object.assign(el, { url: root + el.url }));
  });
  
  // Later
  doc.arr.push({ key: String });
  doc.arr[0]; // 'undefined' because every `doc.arr` creates a new array!
  const schema = new Schema({
    arr: [{ url: String }]
  });
  
  const root = 'https://s3.amazonaws.com/mybucket';
  
  // Good, do this instead of declaring a getter on `arr`
  schema.path('arr.0.url').get(v => `${root}${v}`);
  const subSchema = new mongoose.Schema({
    // some schema definition here
  });
  
  const schema = new mongoose.Schema({
    data: {
      type: subSchema,
      default: {}
    }
  });
  const sampleSchema = new Schema({ name: { type: String, required: true } });
console.log(sampleSchema.path('name'));
// Output looks like:
/**
 * SchemaString {
 *   enumValues: [],
  *   regExp: null,
  *   path: 'name',
  *   instance: 'String',
  *   validators: ...
  */
mongoose.connect('mongodb://127.0.0.1:27017/myapp');
const MyModel = mongoose.model('Test', new Schema({ name: String }));
// Works
await MyModel.findOne();
const MyModel = mongoose.model('Test', new Schema({ name: String }));
const promise = MyModel.findOne();

setTimeout(function() {
  mongoose.connect('mongodb://127.0.0.1:27017/myapp');
}, 60000);

// Will just hang until mongoose successfully connects
await promise;
mongoose.set('bufferCommands', false);
const schema = new Schema({
    name: String
  }, {
    capped: { size: 1024 },
    bufferCommands: false,
    autoCreate: false // disable `autoCreate` since `bufferCommands` is false
  });
  
  const Model = mongoose.model('Test', schema);
  // Explicitly create the collection before using it
  // so the collection is capped.
  await Model.createCollection();
  mongoose.connect('mongodb://127.0.0.1:27017/test').
  catch(error => handleError(error));

// Or:
try {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
} catch (error) {
  handleError(error);
}
mongoose.connection.on('error', err => {
    logError(err);
  });
  mongoose.connect(uri, options);
  // Throws an error "getaddrinfo ENOTFOUND doesnt.exist" after 30 seconds
await mongoose.connect('mongodb://doesnt.exist:27017/test');
mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000
  });

// Prints "Failed 0", "Failed 1", "Failed 2" and then throws an
// error. Exits after approximately 15 seconds.
for (let i = 0; i < 3; ++i) {
    try {
      await mongoose.connect('mongodb://doesnt.exist:27017/test', {
        serverSelectionTimeoutMS
      });
      break;
    } catch (err) {
      console.log('Failed', i);
      if (i >= 2) {
        throw err;
      }
    }
  }
  mongoose.connect(uri, options, function(error) {
    // Check error in initial connection. There is no 2nd param to the callback.
  });
  
  // Or using promises
  mongoose.connect(uri, options).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */ },
    err => { /** handle initial connection error */ }
  );
  mongoose.connect('mongodb://127.0.0.1:27017/test?socketTimeoutMS=1000&bufferCommands=false&authSource=otherdb');
// The above is equivalent to:
mongoose.connect('mongodb://127.0.0.1:27017/test', {
  socketTimeoutMS: 1000
  // Note that mongoose will **not** pull `bufferCommands` from the query string
});
mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));

mongoose.connect('mongodb://127.0.0.1:27017/mongoose_test');
const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/mongoose_test');

conn.on('connected', () => console.log('connected'));
conn.on('open', () => console.log('open'));
conn.on('disconnected', () => console.log('disconnected'));
conn.on('reconnected', () => console.log('reconnected'));
conn.on('disconnecting', () => console.log('disconnecting'));
conn.on('close', () => console.log('close'));
mongoose.connect('mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]' [, options]);
mongoose.connect('mongodb://user:pw@host1.com:27017,host2.com:27017,host3.com:27017/testdb');
mongoose.connect('mongodb://host1:port1/?replicaSet=rsName');
mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
  });
  const mongoose = require('mongoose');

const uri = 'mongodb+srv://username:badpw@cluster0-OMITTED.mongodb.net/' +
  'test?retryWrites=true&w=majority';
// Prints "MongoServerError: bad auth Authentication failed."
mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000
}).catch(err => console.log(err.reason));
// Can get this error even if your connection string doesn't include
// `localhost` if `rs.conf()` reports that one replica set member has
// `localhost` as its host name.
MongooseServerSelectionError: connect ECONNREFUSED localhost:27017
if (err.name === 'MongooseServerSelectionError') {
    // Contains a Map describing the state of your replica set. For example:
    // Map(1) {
    //   'localhost:27017' => ServerDescription {
    //     address: 'localhost:27017',
    //     type: 'Unknown',
    //     ...
    //   }
    // }
    console.log(err.r
        // Connect to 2 mongos servers
mongoose.connect('mongodb://mongosA:27501,mongosB:27501', cb);
const conn = mongoose.createConnection('mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]', options);
const UserModel = conn.model('User', userSchema);
// `asPromise()` returns a promise that resolves to the connection
// once the connection succeeds, or rejects if connection failed.
const conn = await mongoose.createConnection(connectionString).asPromise();
const userSchema = new Schema({ name: String, email: String });

// The alternative to the export model pattern is the export schema pattern.
module.exports = userSchema;

// Because if you export a model as shown below, the model will be scoped
// to Mongoose's default connection.
// module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

module.exports = function connectionFactory() {
  const conn = mongoose.createConnection(process.env.MONGODB_URI);

  conn.model('User', require('../schemas/user'));
  conn.model('PageView', require('../schemas/pageView'));

  return conn;
};
// connections/index.js
const mongoose = require('mongoose');

const conn = mongoose.createConnection(process.env.MONGODB_URI);
conn.model('User', require('../schemas/user'));

module.exports = conn;
// With object options
mongoose.createConnection(uri, { maxPoolSize: 10 });

// With connection string options
const uri = 'mongodb://127.0.0.1:27017/test?maxPoolSize=10';
mongoose.createConnection(uri);
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/main');
mongoose.set('debug', true);

mongoose.model('User', mongoose.Schema({ name: String }));

const app = express();

app.get('/users/:tenantId', function(req, res) {
  const db = mongoose.connection.useDb(`tenant_${req.params.tenantId}`, {
    // `useCache` tells Mongoose to cache connections by database name, so
    // `mongoose.connection.useDb('foo', { useCache: true })` returns the
    // same reference each time.
    useCache: true
  });
  // Need to register models every time a new connection is created
  if (!db.models['User']) {
    db.model('User', mongoose.Schema({ name: String }));
  }
  console.log('Find users from', db.name);
  db.model('User').find().
    then(users => res.json({ users })).
    catch(err => res.status(500).json({ message: err.message }));
});

app.listen(3000);
const express = require('express');
const mongoose = require('mongoose');

const tenantIdToConnection = {};

const app = express();

app.get('/users/:tenantId', function(req, res) {
  let initialConnection = Promise.resolve();
  const { tenantId } = req.params;
  if (!tenantIdToConnection[tenantId]) {
    tenantIdToConnection[tenantId] = mongoose.createConnection(`mongodb://127.0.0.1:27017/tenant_${tenantId}`);
    tenantIdToConnection[tenantId].model('User', mongoose.Schema({ name: String }));
    initialConnection = tenantIdToConnection[tenantId].asPromise();
  }
  const db = tenantIdToConnection[tenantId];
  initialConnection.
    then(() => db.model('User').find()).
    then(users => res.json({ users })).
    catch(err => res.status(500).json({ message: err.message }));
});

app.listen(3000);
const schema = new mongoose.Schema({ name: String, size: String });
const Tank = mongoose.model('Tank', schema);
const Tank = mongoose.model('Tank', yourSchema);

const small = new Tank({ size: 'small' });
await small.save();

// or

await Tank.create({ size: 'small' });

// or, for inserting large batches of documents
await Tank.insertMany([{ size: 'small' }]);
await mongoose.connect('mongodb://127.0.0.1/gettingstarted');
const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/test');
const Tank = connection.model('Tank', yourSchema);
await Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec();
await Tank.deleteOne({ size: 'large' });
// Updated at most one doc, `res.nModified` contains the number
// of docs that MongoDB updated
await Tank.updateOne({ size: 'large' }, { name: 'T-90' });
async function run() {
    // Create a new mongoose model
    const personSchema = new mongoose.Schema({
      name: String
    });
    const Person = mongoose.model('Person', personSchema);
  
    // Create a change stream. The 'change' event gets emitted when there's a
    // change in the database
    Person.watch().
      on('change', data => console.log(new Date(), data));
  
    // Insert a doc, will trigger the change stream handler above
    console.log(new Date(), 'Inserting doc');
    await Person.create({ name: 'Axl Rose' });
  }
  // Make sure to disable `autoCreate` and `autoIndex` for Views,
// because you want to create the collection manually.
const userSchema = new Schema({
    name: String,
    email: String,
    roles: [String]
  }, { autoCreate: false, autoIndex: false });
  const User = mongoose.model('User', userSchema);
  
  const RedactedUser = mongoose.model('RedactedUser', userSchema);
  
  // First, create the User model's underlying collection...
  await User.createCollection();
  // Then create the `RedactedUser` model's underlying collection
  // as a View.
  await RedactedUser.createCollection({
    viewOn: 'users', // Set `viewOn` to the collection name, **not** model name.
    pipeline: [
      {
        $set: {
          name: { $concat: [{ $substr: ['$name', 0, 3] }, '...'] },
          email: { $concat: [{ $substr: ['$email', 0, 3] }, '...'] }
        }
      }
    ]
  });
  
  await User.create([
    { name: 'John Smith', email: 'john.smith@gmail.com', roles: ['user'] },
    { name: 'Bill James', email: 'bill@acme.co', roles: ['user', 'admin'] }
  ]);
  
  // [{ _id: ..., name: 'Bil...', email: 'bil...', roles: ['user', 'admin'] }]
  console.log(await RedactedUser.find({ roles: 'admin' }));
  const MyModel = mongoose.model('Test', new Schema({ name: String }));
const doc = new MyModel();

doc instanceof MyModel; // true
doc instanceof mongoose.Model; // true
doc instanceof mongoose.Document; // true
const doc = await MyModel.findOne();

doc instanceof MyModel; // true
doc instanceof mongoose.Model; // true
doc instanceof mongoose.Document; // true
doc.name = 'foo';

// Mongoose sends an `updateOne({ _id: doc._id }, { $set: { name: 'foo' } })`
// to MongoDB.
await doc.save();
doc.save().then(savedDoc => {
    savedDoc === doc; // true
  });
  const doc = await MyModel.findOne();

// Delete the document so Mongoose won't be able to save changes
await MyModel.deleteOne({ _id: doc._id });

doc.name = 'foo';
await doc.save(); // Throws DocumentNotFoundError
const schema = new Schema({
    nested: {
      subdoc: new Schema({
        name: String
      })
    }
  });
  const TestModel = mongoose.model('Test', schema);
  
  const doc = new TestModel();
  doc.set('nested.subdoc.name', 'John Smith');
  doc.nested.subdoc.name; // 'John Smith'
  const doc2 = new TestModel();

doc2.get('nested.subdoc.name'); // undefined
doc2.nested?.subdoc?.name; // undefined

doc2.set('nested.subdoc.name', 'Will Smith');
doc2.get('nested.subdoc.name'); // 'Will Smith'
// The following works fine
const doc3 = new TestModel();
doc3.nested.subdoc ??= {};
doc3.nested.subdoc.name = 'John Smythe';

// The following does **NOT** work.
// Do not use the following pattern with Mongoose documents.
const doc4 = new TestModel();
(doc4.nested.subdoc ??= {}).name = 'Charlie Smith';
doc.nested.subdoc; // Empty object
doc.nested.subdoc.name; // undefined.
// Update all documents in the `mymodels` collection
await MyModel.updateMany({}, { $set: { name: 'foo' } });
const schema = new Schema({ name: String, age: { type: Number, min: 0 } });
const Person = mongoose.model('Person', schema);

const p = new Person({ name: 'foo', age: 'bar' });
// Cast to Number failed for value "bar" at path "age"
await p.validate();

const p2 = new Person({ name: 'foo', age: -1 });
// Path `age` (-1) is less than minimum allowed value (0).
await p2.validate();
// Cast to number failed for value "bar" at path "age"
await Person.updateOne({}, { age: 'bar' });

// Path `age` (-1) is less than minimum allowed value (0).
await Person.updateOne({}, { age: -1 }, { runValidators: true });
const doc = await Person.findOne({ _id });

// Sets `name` and unsets all other properties
doc.overwrite({ name: 'Jean-Luc Picard' });
await doc.save();
// Sets `name` and unsets all other properties
await Person.replaceOne({ _id }, { name: 'Jean-Luc Picard' });
const childSchema = new Schema({ name: 'string' });

const parentSchema = new Schema({
  // Array of subdocuments
  children: [childSchema],
  // Single nested subdocuments
  child: childSchema
});
const childSchema = new Schema({ name: 'string' });
const Child = mongoose.model('Child', childSchema);

const parentSchema = new Schema({
  child: {
    type: mongoose.ObjectId,
    ref: 'Child'
  }
});
const Parent = mongoose.model('Parent', parentSchema);

const doc = await Parent.findOne().populate('child');
// NOT a subdocument. `doc.child` is a separate top-level document.
doc.child;
const Parent = mongoose.model('Parent', parentSchema);
const parent = new Parent({ children: [{ name: 'Matt' }, { name: 'Sarah' }] });
parent.children[0].name = 'Matthew';

// `parent.children[0].save()` is a no-op, it triggers middleware but
// does **not** actually save the subdocument. You need to save the parent
// doc.
await parent.save();
childSchema.pre('save', function(next) {
    if ('invalid' == this.name) {
      return next(new Error('#sadpanda'));
    }
    next();
  });
  
  const parent = new Parent({ children: [{ name: 'invalid' }] });
  try {
    await parent.save();
  } catch (err) {
    err.message; // '#sadpanda'
  }
  // Below code will print out 1-4 in order
const childSchema = new mongoose.Schema({ name: 'string' });

childSchema.pre('validate', function(next) {
  console.log('2');
  next();
});

childSchema.pre('save', function(next) {
  console.log('3');
  next();
});

const parentSchema = new mongoose.Schema({
  child: childSchema
});

parentSchema.pre('validate', function(next) {
  console.log('1');
  next();
});

parentSchema.pre('save', function(next) {
  console.log('4');
  next();
});
// Subdocument
const subdocumentSchema = new mongoose.Schema({
    child: new mongoose.Schema({ name: String, age: Number })
  });
  const Subdoc = mongoose.model('Subdoc', subdocumentSchema);
  
  // Nested path
  const nestedSchema = new mongoose.Schema({
    child: { name: String, age: Number }
  });
  const Nested = mongoose.model('Nested', nestedSchema);
  const doc1 = new Subdoc({});
doc1.child === undefined; // true
doc1.child.name = 'test'; // Throws TypeError: cannot read property...

const doc2 = new Nested({});
doc2.child === undefined; // false
console.log(doc2.child); // Prints 'MongooseDocument { undefined }'
doc2.child.name = 'test'; // Works
const subdocumentSchema = new mongoose.Schema({
    child: new mongoose.Schema({
      name: String,
      age: {
        type: Number,
        default: 0
      }
    })
  });
  const Subdoc = mongoose.model('Subdoc', subdocumentSchema);
  
  // Note that the `age` default has no effect, because `child`
  // is `undefined`.
  const doc = new Subdoc();
  doc.child; // undefined
  doc.child = {};
// Mongoose applies the `age` default:
doc.child.age; // 0
const childSchema = new mongoose.Schema({
    name: String,
    age: {
      type: Number,
      default: 0
    }
  });
  const subdocumentSchema = new mongoose.Schema({
    child: {
      type: childSchema,
      default: () => ({})
    }
  });
  const Subdoc = mongoose.model('Subdoc', subdocumentSchema);
  
  // Note that Mongoose sets `age` to its default value 0, because
  // `child` defaults to an empty object and Mongoose applies
  // defaults to that empty object.
  const doc = new Subdoc();
  doc.child; // { age: 0 }
  const doc = parent.children.id(_id);
  const Parent = mongoose.model('Parent');
const parent = new Parent();

// create a comment
parent.children.push({ name: 'Liesl' });
const subdoc = parent.children[0];
console.log(subdoc); // { _id: '501d86090d371bab2c0341c5', name: 'Liesl' }
subdoc.isNew; // true

await parent.save();
console.log('Success!');
const newdoc = parent.children.create({ name: 'Aaron' });
// Equivalent to `parent.children.pull(_id)`
parent.children.id(_id).deleteOne();
// Equivalent to `parent.child = null`
parent.child.deleteOne();

await parent.save();
console.log('the subdocs were removed');
const schema = new Schema({
    docArr: [{ name: String }],
    singleNested: new Schema({ name: String })
  });
  const Model = mongoose.model('Test', schema);
  
  const doc = new Model({
    docArr: [{ name: 'foo' }],
    singleNested: { name: 'bar' }
  });
  
  doc.singleNested.parent() === doc; // true
  doc.docArr[0].parent() === doc; // true
  const schema = new Schema({
    level1: new Schema({
      level2: new Schema({
        test: String
      })
    })
  });
  const Model = mongoose.model('Test', schema);
  
  const doc = new Model({ level1: { level2: 'test' } });
  
  doc.level1.level2.parent() === doc; // false
  doc.level1.level2.parent() === doc.level1; // true
  doc.level1.level2.ownerDocument() === doc; // true
  const parentSchema = new Schema({
    children: [{ name: 'string' }]
  });
  // Equivalent
  const parentSchema = new Schema({
    children: [new Schema({ name: 'string' })]
  });

const blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const kittySchema = new mongoose.Schema({
    name: String
  });
  const Kitten = mongoose.model('Kitten', kittySchema);
  const silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'
// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? 'Meow name is ' + this.name
      : 'I don\'t have a name';
    console.log(greeting);
  };
  
  const Kitten = mongoose.model('Kitten', kittySchema);
  const fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"
await fluffy.save();
fluffy.speak();
const kittens = await Kitten.find();
console.log(kittens);
await Kitten.find({ name: /^fluff/ });