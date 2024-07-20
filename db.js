// 1. Installing and setting up Mongoose:
// Import mongoose
const mongoose = require('mongoose');
const Person = require('./persons');
const debug = require('debug')('mongoose');

debug.enabled = false;



// Load the environment variables from the .env file
require('dotenv').config();

// Function to connect to the database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected successfully');
  } catch (err) {
    console.log('Database connection error:', err);
  }
};
connectToDatabase()

// module.exports = connectToDatabase;


// 3. Create and Save a Record of a Model
let newPerson = async (name, age, favoriteFoods) => {
  try {
      // Create a new instance of the Person model
      const person = new Person({ name, age, favoriteFoods });
      
      // Save the person document to the database
      const savedPerson = await person.save();
      
      console.log('Person saved successfully:', savedPerson);
  } catch (error) {
      console.error('Error saving person:', error);
  }
};

// // Example usage
// newPerson('Joseph Ayantayo', 9, ['Rice','pizza']);


// 4. Create Many Records with model.create()
//   Function to create multiple people
  const arrayOfPeople = async () => {
  try {
    // Array of people to create
    const people = [
      { name: 'Rebecca', age: 34, favoriteFoods: ['Buritos', 'Beans']},
      { name: 'Naomi ', age: 4, favoriteFoods: ['Buritos', 'Tea']},
      { name: 'Fadeel', age: 45, favoriteFoods: ['Buritos', 'JollofRice']},
      { name: 'Kanyinsola ', age: 16, favoriteFoods: ['Buritos', 'Egg']},
      { name: 'Adegun', age: 16, favoriteFoods: ['Buritos', 'Egg']},
      { name: 'Tunde', age: 16, favoriteFoods: ['Buritos', 'Egg']}

  ];

    // Create people in the 'people' collection
    const options = { collection: 'people' }; // Specify collection name
    const result = await Person.create(people, options);

    console.log('People created successfully:', result);
  } catch (error) {
    console.error('Error creating people:', error);
  } finally {
    // Close connection after operations
    mongoose.disconnect();
  }
};

// Call function to create people
// arrayOfPeople();
  
//   5. Use model.find() to Search Your Database
const findPeopleByName = async (name) => {
  try {
    // Use Model.find() to find all people with the given name
    const people = await Person.find({ name });

   // Log the results
    console.log(`People with name '${name}':`, people);
    console.log(`Number of people found with name '${name}':`, people.length);
  } catch (error) {
    console.error('Error finding people:', error);
  } finally {
    // Close connection after operations
    mongoose.disconnect();
  }
};
// Call function to find people by name
// findPeopleByName('Tina Ayantayo'); 


// 6. Use model.findOne() to Return a Single Matching Document from Your Database
const findPersonByFavoriteFood = async (food) => {
 try{
  const person = await Person.findOne({favoriteFoods: food});
  // Log the result
  if( person ){ console.log(`Person with '${food}' as a favorite food found:`);
                  console.log(person)
 }else {
      console.log(`no person found '${food}' with favorite food`)
  }
      
}catch(err) {
  console.error('error finding the person :' , err)

}finally{
  // Close connection after operations
  mongoose.disconnect();
}

};
// Call the function to find the person with favorite food 
// findPersonByFavoriteFood('Tea')  // Replace 'Yam' with the food you want to search for

// 7. Use model.findById() to Search Your Database By _id
// Find the (only!!) person having a given _id, using Model.findById() -> Person. Use the function argument personId as the search key.

const findPersonById = async (personId) => {
  try{
        // Use Model.findById() to find the person with the given _id

  const person = Person.findById(personId);
// Log the result
  if (person){
    console.log(`Person found with id '${personId}':`, person);
  }else {
    console.log(`No person found with id '${personId}'.`);
  }

  }catch (error) {
    console.error('Error finding person:', error);
  
  }finally {
    // Close connection after operations
    mongoose.disconnect();
  }



};

// Call the function to find person by _id

// findPersonById('669ae629f4ad3eb9f82784b4');

// 8. Perform Classic Updates by Running Find, Edit, then Save

 // Function to find a person by _id, add "hamburger" to favoriteFoods, and save
 let addFavoriteFood = async (personId) => {
  try {
    // Find the person by _id
    const person = await Person.findById(personId);

    if (!person) {
      console.log(`Person with id '${personId}' not found.`);
      return;
    }

    // Modify the document
    person.favoriteFoods.push('shawarma');

    // Save the updated document
    await person.save();
    console.log(`Added 'shawarma' to favoriteFoods of person with id '${personId}'.`);

  } catch (error) {
    console.error('Error adding favorite food:', error);
  } finally {
    // Close connection after operations
    mongoose.disconnect();
  }
};

// Call function to add favorite food for a person by _id
// addFavoriteFood('669ae41c1c2f86666444cb70'); // Replace with the _id of the person you want to update

// 9.Perform New Updates on a Document Using model.findOneAndUpdate()
// Find a person by Name and set the person's age to 20. Use the function parameter personName as a search key.

  // Function to find a person by Name and update their age to 20
  let updatePersonAge = async (personName) => {
  try{
    // Find and update the person by Name
    const updatedPerson = await Person.findOneAndUpdate(
      {name: personName }, //Serch criteria
      { age: 20 }, //Update age to 20
      {new: true }, //Return the updated document
    );
    
    if (!updatedPerson) {
      console.log(`Person with name '${personName}' not found`);
      return;
    }else { console.log(`Updated age to 20 for person name '${personName}' done successfully :`, updatedPerson)};

  }catch(err) {
    console.error('Error updating person age', err)
  }finally {
    mongoose.disconnect();
  }
  };
  // updatePersonAge('Kanyinsola Adegun')

// 10.Delete One Document Using model.findByIdAndRemove
// Delete one person by the person's _id.

  // Function to delete a person by _id
let deletePersonById = async (personId)=> {
  try{
    const removedPerson = await Person.findByIdAndDelete(personId);

    if(!removedPerson) {
      console.log(`Person with id '${personId}' not found`);
      return;
    }else {
      console.log(`Person with id '${personId}' successfully removed : `+ removedPerson)
    }

    } catch (error){
      console.error('Error! deleting person failed: '+  error)
    }finally {
      mongoose.disconnect();
    }
  };
  
  // deletePersonById('669ae629f4ad3eb9f82784b7')
   
  // 11.MongoDB and Mongoose - Delete Many Documents with model.remove()
  // Delete all the people whose name is “Mary”, using Model.remove(). Pass it to a query document with the name field set, and of course, do a callback.

    // Function to delete all people with name "Mary"
    let deletePeopleByName = async () => {
      try {
        // Use Model.remove() to delete all matching documents
        const result = await Person.deleteMany({ name: 'Mary' });
  
        console.log(`Deleted ${result.deletedCount} people with name 'Mary'.`);
  
      } catch (error) {
        console.error('Error deleting people:', error);
      } finally {
        // Close connection after operations
        mongoose.disconnect();
      }
    };
  
    // Call function to delete people by name "Mary"
    // deletePeopleByName();

  //  12. Chain Search Query Helpers to Narrow Search Results
  //   Find people who like burritos. Sort them by name, limit the results to two documents, and hide their age. Chain .find(), .sort(), .limit(), .select(), and then .exec(). Pass the done(err, data) callback to exec().

Person.find({ favoriteFoods: 'Buritos' }) // Find people who like burritos
  .sort({ name: 1 }) // Sort them by name in ascending order (1 for ascending, -1 for descending)
  .limit(3) // Limit the results to two documents
  .select('-age') // Hide their age (exclude the 'age' field)
  .exec() // Execute the query (returns a promise)
  .then(data => {
    console.log(data); // Process the data as needed
  })
  .catch(err => {
    console.error(err); // Handle any errors
  })
   
