
require('./config/config');


const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const cors = require('cors');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/User');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.use(cors());

app.post('/todos', authenticate, (req, res)=>{
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });
    todo.save().then((doc)=>{
        console.log(req.body.text)
        res.send(doc);
    },(e)=>{
        res.status(400).send(e)
    })
});

app.get('/todos', authenticate,(req, res)=>{
    Todo.find({
         _creator:req.user._id 
    }).then((todos)=>{
        res.send(todos);
    },(e)=>{
        res.status(400).send(e);
    })
});

app.get('/todos/:id', authenticate, (req, res)=>{
    var id = req.params.id;
    if(ObjectID.isValid(id)){
        Todo.findOne({
            _id: id,
            _creator:req.user._id
        }).then(todo=>{
            if(!todo)
                return res.status(404).send();
            res.send({todo})
        }, (e)=>{
            res.status(400).send(e)
        })
    }
    else{
        res.status(404).send("Empty body");
    }
    
});

app.delete('/todos/:id',authenticate,  (req, res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }
    Todo.findOneAndRemove({
        _id:id,
        _creator:req.user._id
    }).then(todo=>{
        if(!todo){
            return res.status(404).send()
        }
        res.status(200).send(todo)
    }, (e)=>{
        res.status(400).send();
    })
});

app.patch('/todos/:id', authenticate, (req, res)=>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else
    {
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findOneAndUpdate({_id:id, _creator: req.user._id},{$set:body}, {new: true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }

        res.send({todo});
    }).catch(e=>{
        res.status(400).send();
    })
});

app.post('/users', (req, res)=>{
    var body = _.pick(req.body,['email','password','name'])
    var user = new User(body);
    
    
    
    user.generateAuthToken();
    user.save().then(()=>{
        
        res.send(user);
        })
        .catch(e=>{
            res.status(400).send(e);
            
        }); 
});



app.post('/users/me',authenticate, (req, res)=>{
    res.send(req.user);
});

app.post('/users/login',(req, res)=>{
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user)=>{
            user.generateAuthToken();
            res.send(user);
        })
        .catch(err=>{
        res.status(400).send(err);
    })
});

app.delete('/users/me/token',authenticate, (req, res)=>{
    console.log(req.token)
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    }).catch(()=>{
        res.status(401).send();
    })
})


app.listen(port, ()=>{
    console.log(`Started at port ${port}`);
})

module.exports = {app};

