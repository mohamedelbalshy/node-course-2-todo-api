const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/User');

/* Todo.remove({}).then((result)=>{
    console.log(result)
}); */

//Todo.findOneAndRemove({})
Todo.findByIdAndRemove('5b0ccbd48fe92d1480861f93').then((todo)=>{
    console.log(todo)
})
