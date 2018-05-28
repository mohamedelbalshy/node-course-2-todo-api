const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if(err)
        return console.log('Unable to connect to MongoDB', err)
    
    console.log('Connected to MongoDB!');
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5afa1acc2a5b2d0b70f96120')
    },{
        $set:{
            completed: true
        }
    },{
        returnOriginal: false
    }).then((result)=>{
        console.log(result)
    })
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5afa1d02d058901330a0975f')
    },{
        $set:{
            name:'Mustafa'
        },
        $inc:{
            age:1
        }
    }, {
        returnOriginal:false
    }).then(result=>console.log(result))
    


    //db.close();
})
