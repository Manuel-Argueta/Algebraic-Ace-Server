require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const superagent = require('superagent');

const Post = require('./Models/posts');
const Problem = require('./Models/problem');
const User = require('./Models/user');
const videoResource = require('./Models/videoResource');
const webResource = require('./Models/webResource');

const port = process.env.PORT || 8080;
const mongoUri = process.env.URI;
const factURL = process.env.factURL;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.set('useNewUrlParser', true);

//Connecting to mongoDB
mongoose.connect(mongoUri,{ useNewUrlParser: true, 
    useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error',console.error.bind(
    console, 'Could not connect to MongoDB...'));
db.once('open', () =>{
    console.log('Connection established with MongoDB');
});

// basic endpoint
app.get('/', (req,res)=> {
    res.status(200).send({
        status: 200,
        msg: "Server OK"
        });
});

app.post('/create-post', (req,res) => {
    const incomingData = req.body;
    const newPost = new Post(incomingData);
    newPost.save((err,doc) => {
    if (err) {
        res.status(500).send({
            err: err,
            message: "Server Error Occured"
        });
    } 
        res.status(200).send({
        message: 'Post Created',
        document: doc
        });
    });
});

app.post('/update-likes', (req,res) => {
    const incomingData = req.body;
    Post.findByIdAndUpdate({_id: incomingData._id},{likes: incomingData.likes},
        (err, doc) =>{
            if (!incomingData) {
                console.log("error occured")
                return res.status(500).send({
                    status: 500,
                    message: `Could not Update Post ${incomingData._id} Likes`
                });
            }
            res.status(200).send({
                status: 200,
                message: `Updated Post Like Count`,
                document: doc
            })
        })
});

app.get('/get-user-posts', (req,res) => {
    Post.find({},(err, doc) => {
        if (err) {
            res.status(500).send({
                err: err,
                status: 500,
                message: "No Math Posts Found"
            });
        }
        return res.status(200).send(doc);
    });
});

app.get('/get-random-fact', (req,res) => {
    const url = `${factURL}/random`;
    superagent.get(url).end((err,resp) => {
        if (err) {
            res.status(400).send({
                status: 400,
                message: "Unable to Get Math Fact"
            })
        }
        res.status(200).send(resp.text);
    });
});

app.post('/create-POD', (req,res) => {
    const incomingData = req.body;
    const newProblem = new Problem(incomingData);
    newProblem.save((err,doc) => {
    if (err) {
        res.status(500).send({
            err: err,
            message: "Server Error Occured"
        });
    } 
        res.status(200).send({
        message: 'Problem Created!',
        document: doc
        });
    });
});
app.post('/create-user', (req,res) => {
    const incomingData = req.body;
    const newUser= new User(incomingData);
    newUser.save((err,doc) => {
    if (err) {
        res.status(500).send({
            err: err,
            message: "Server Error Occured"
        });
    } 
        res.status(200).send({
        message: 'User Created!',
        document: doc
        });
    });
});

app.post('/update-streak', (req,res) => {
    const incomingData = req.body;
    User.findByIdAndUpdate({_id: incomingData._id}, {streak: incomingData.streak},
        (err, doc) =>{
            if (err) {
                console.log("error occured")
                return res.status(500).send({
                    status: 500,
                    message: `Could not Update User ${incomingData._id} Streak`
                });
            }
            res.status(200).send({
                status: 200,
                message: `Updated Streak Count of ${incomingData._id} with a count of ${incomingData.streak}`,
                document: doc
            })
        })
});
app.post('/update-xp', (req,res) => {
    const incomingData = req.body;
    User.findByIdAndUpdate({_id: incomingData._id}, {xp: incomingData.xp},
        (err, doc) =>{
            if (err) {
                console.log("error occured")
                return res.status(500).send({
                    status: 500,
                    message: `Could not Update User ${incomingData._id} XP`
                });
            }
            res.status(200).send({
                status: 200,
                message: `Updated XP Count of ${incomingData._id} with a count of ${incomingData.streak}`,
                document: doc
            })
        })
});
app.post('/get-current-user', (req,res) => {
    const incomingData = req.body;
    User.findById(incomingData._id, (err, doc) =>{
            if (err) {
                return res.status(500).send({
                    status: 500,
                    message: `Could not Find User ${incomingData._id}`
                });
            }
            return res.status(200).send(doc)
        })
});

app.get('/get-all-problems', (req,res) => {
    Problem.find({},(err, doc) => {
        if (err) {
            res.status(500).send({
                err: err,
                status: 500,
                message: "No Math Problems Found"
            });
        }
        return res.status(200).send(doc);
    });
});

app.post('/create-video-resource', (req,res) => {
    const incomingData = req.body;
    const newVideo = new videoResource(incomingData);
    newVideo.save((err,doc) => {
    if (err) {
        res.status(500).send({
            err: err,
            message: "Server Error Occured"
        });
    } 
        res.status(200).send({
        message: 'Video Resource Created!',
        document: doc
        });
    });
});
app.post('/get-filtered-videos', (req,res) => {
    const incomingData = req.body;
    videoResource.find({keyword: incomingData.keyword},(err, doc) => {
        if (err) {
            res.status(500).send({
                err: err,
                status: 500,
                message: "No Videos Found"
            });
        }
        return res.status(200).send(doc);
    });
});
app.post('/create-web-resource', (req,res) => {
    const incomingData = req.body;
    const newWeb = new webResource(incomingData);
    newWeb.save((err,doc) => {
    if (err) {
        res.status(500).send({
            err: err,
            message: "Server Error Occured"
        });
    } 
        res.status(200).send({
        message: 'Web Resource Created!',
        document: doc
        });
    });
});

app.post('/get-filtered-webpages', (req,res) => {
    const incomingData = req.body;
    webResource.find({keyword: incomingData.keyword},(err, doc) => {
        if (err) {
            res.status(500).send({
                err: err,
                status: 500,
                message: "No Webpages Found"
            });
        }
        return res.status(200).send(doc);
    });
});
app.listen(port, () => {
    console.log(`Listening on port ${port} ...`);
});