const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app'

// Connection to the database "recipe-app"
mongoose.set('strictQuery', false);
mongoose.connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    Recipe.create({title: "thai", level: "Easy Peasy",ingredients: ["noodle"], cuisine: "thai", dishType: 'main_course'}    )
  })
  .then(() => Recipe.insertMany(data)
  )
  .then(newRecipes => {
    for(let i=0; i< newRecipes.length; i++){
      console.log(`Title: ${newRecipes[i].title}`)
    }
  })
  .then( () => {
    return Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, {duration:100}, {new:true})
    // return Recipe.findByIdAndUpdate('646fa271025e6aea02ae078a', {avatarUrl: ''}, {new: true})
  })
  .then(() => {
     return Recipe.deleteOne({title: 'Carrot Cake'})
  })
  .then((deletedRecipe) => {
    console.log(`deleted succesfully`)
  })
  .then(()=>  {
    return mongoose.connection.close()
  })
  .then(()=> console.log('Mongoose connection has closed'))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });