//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
    if(err){
        return console.log("Unable To connect to database");
    }
    console.log('Connected To MongoDB Server');

    /* db.collection('Users').find({
        name:'Mohamed'
    }).toArray().then((docs)=>{
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2))
    }, (err)=>{
        console.log('Unable to fetch Todos', err);
    }) */

    db.collection('Users').find({name:'Mohamed'}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs, undefined, 2))
    }, (err)=>{
        console.log('Unable to fetch Mohamed Users', err)
    })
});



