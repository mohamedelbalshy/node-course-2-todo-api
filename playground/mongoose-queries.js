const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/User');

//TODO
/* var id = '5b0bb72248b1bbfc2cd9eedb';

if(!ObjectID.isValid(id)){
    console.log('Invalid Id');
}


Todo.find({
    _id:id
}).then(todos=>console.log('Todos', todos));

Todo.findOne({
    _id:id
}).then(todo =>console.log('Todo',todo));

Todo.findById(id).then(todo=>console.log('Todo By Id', todo)); */



//USER

var id = '5b0bbafee4af8cb42e11548a';

User.findById(id).then(user=>{
    
    console.log('User is: ', user.email);
}).catch(e=>console.log('User Not Found'))
