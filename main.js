const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
 useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Todo app"});
});

// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});
require('./app/routes/student.routes.js')(app);     


app.post('/students', async (req, res) => {
    try {
      // Extract student data from the request body
      const { name, age, major } = req.body;
  
      // Create a new student using the Student model
      const newStudent = new Student({ name, age, major });
  
      // Save the student to the database
      const createdStudent = await newStudent.save();
  
      // Return the created student as the response
      res.status(201).json(createdStudent);
    } catch (error) {
      // Handle any errors that occur during the process
      res.status(500).json({ error: 'Failed to create student' });
    }
  });
  