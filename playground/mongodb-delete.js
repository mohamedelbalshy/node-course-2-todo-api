const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if(err){
        return console.log('Unablt to connect to MongoDB', err)
    }
    console.log('Connected to MongoDB');


    //delete Many
/*     db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result)=>{
        console.log(result);
    }); */
    //delete One
    db.collection('Todos').deleteOne({text:'Eat lunch'}).then(result=>console.log(result, undefined, 2));
    //find one and delete
    



    //db.close();
})