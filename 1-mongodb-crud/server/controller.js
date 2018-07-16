var ToDoList = require('../database-mongodb/model');

module.exports = {
  /* Retrieve all documents. */
  read: function(req, res) {
    //res.send('Hello from get')
    //const ToDoList = req.query;
    ToDoList.find({}, (err, results) => {
      if (err) {
        res.status(400).send(err)
      }
      else {
        res.status(200).send(results)
      }
    })




  },

  /* Create one document. */
  create: function(req, res) {

    //res.send('hello from post')
    const {newThing} = req.body;
    new ToDoList({
      name: newThing
    }).save((err, newTodo) => {
      if (err) {res.status(400).send(err)}
      else {
        console.log(newTodo)
        res.status(201).send(newTodo)
      }
    })
    

  },

  /* Update one document by name. */
  update: function(req, res) {
    //console.log(Object.keys(req.body))
    ToDoList.findOneAndUpdate({
      name: req.body.name
    }, {
      name: req.body.newName
    }, (err, updated) => {
      if (err) { res.status(404).send(err)}
      else { res.status(202).send(updated)}
    })

    //res.send('hello from update')
  },

  /* Delete one document by name. */
  delete: function(req, res) {
    //res.send('hello from delete')
    const { removeThing } = req.query;
    ToDoList.remove({
      name: removeThing
    }, (err, removeThing) => {
      if (err) {res.status(404).send(err)}
      else { res.status(200).send("deleted")}
    })
  },
};
