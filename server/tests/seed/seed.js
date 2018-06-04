const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/User');
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');


const userOneId = new ObjectID();
const userTwoId = new ObjectID();
var users = [{
    _id:userOneId,
    email:'mohamed@gmail.com',
    password:'password123',
    tokens:[{
        access:'auth',
        token: jwt.sign({_id:userOneId.toHexString(), access:'auth'}, 'abc123').toString()
        }]  

    },{
    _id:userTwoId,
    email:'mohamed2@gmail.com',
    password:'password456'
    }];


const todos = [{
    _id:new ObjectID(),
    text:"First Test todo"
},{
    _id:new ObjectID(),
    text:"Second Test todo",
    completed:true,
    completedAt:333
}];

const populateTodos = (done)=>{
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>done())
};

const populateUsers = (done)=>{
    User.remove({}).then(()=>{
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();
        return Promise.all([userOne, userTwo])
        
        /* return User.insertMany(users); */
    }).then(()=>done());
}

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
}