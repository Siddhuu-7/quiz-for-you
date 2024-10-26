const express = require("express");
const mongoose = require("mongoose");
const sendEmail = require('./nodemailer'); // Adjust this path as needed
const cors = require("cors");
const path = require('path'); // Ensure 'path' is required
require('dotenv').config();

const app = express();

// Set the static files location to the frontend folder
app.use(express.static(path.resolve(__dirname, '../../frontend')));

// Route for serving the main frontend file
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../frontend', 'index.html'));  // Ensure this path is correct
});

app.use(express.json());
app.use(cors({
  origin: '*',
}));


mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://quiz:quiz123%21%40%23@cluster0.5cy34.mongodb.net/questions")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });

const schema = new mongoose.Schema({
    roomName: { type: String, required:true},
    roomId: { type: Number,required:true },
    question: { type: String, required: true },
    options: [
        {
            type: String,
            required: true
        }
    ],
    Answer: { type: String, required: true },
    startTime: { type: String },
    endingTime: { type: String },
    createdAt: { type: String, default: Date.now }
});

const Question = mongoose.model('Question', schema);


app.post('/api/post', (req, res) => {
    console.log("Received request body:", req.body);

    const { roomName, roomId, question, options, Answer } = req.body;

    if (!roomName || !roomId || !question || !options || !Answer) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const data = new Question({
        roomName,
        roomId,
        question,
        options,
        Answer
    });

    data.save()
        .then((val) => {
            res.status(201).json(val); 
        })
        .catch((err) => {
            console.error("Error saving question:", err);
            res.status(500).json({ error: "Failed to save question" });
        });
});

app.post('/api/saveTime', (req, res) => {
    const { startTime, endingTime, roomId } = req.body;

    if (!startTime || !endingTime || !roomId) {
        return res.status(400).json({ error: "Missing required fields" });
    }


    Question.updateMany({ roomId: roomId }, { startTime, endingTime })
        .then(() => {
            res.status(200).json({ message: "Time saved successfully" });
        })
        .catch(error => {
            res.status(500).json({ message: "Failed to save time", error });
        });
});


app.get('/api/get/:roomId', async (req, res) => {
    try {
        const data = await Question.find({ roomId: req.params.roomId });
        if (!data) return res.json({ message: "There Is NO Data Found" });
        res.json(data);
    } catch (err) {
        res.status(505).json({ message: err });
    }
});

const PORT = process.env.PORT || 3000;


const roomSch = new mongoose.Schema({
    roomId: { type: Number, required: true, unique: true },
    roomName: { type: String, required: true },
    startTime: { type: String, required: true },
    endingTime: { type: String },
    roomPassword: { type: String },
    userEmail:{type:String}
});
const rooms = mongoose.model('rooms', roomSch);

app.post('/api/rooms', async (req, res) => {
    try {
        const { roomId, roomName, startTime, endingTime, roomPassword, userEmail } = req.body;
        if (!startTime || !endingTime || !roomId || !roomName || !userEmail) { 
            return res.status(400).json({ error: "Missing required fields" });
        }

        
        const existingRoom = await rooms.findOne({ roomId });
        if (existingRoom) {
            return res.status(409).json({ error: "Room ID already exists" });
        }

        
        const data = new rooms({
            roomId,
            roomName,
            startTime,
            endingTime,
            roomPassword,
            userEmail 
        });

        const savedRoom = await data.save();

        
        await sendEmail(userEmail, roomId, roomPassword); 

        
        res.status(201).json(savedRoom);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
});



app.get('/api/roomsDetails/:roomId', async (req, res) => {
    try {
        const data = await rooms.find({roomId:req.params.roomId});
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});

app.get('/api/roomsDetails', async (req, res) => {
    try {
        const data = await rooms.find();
        res.json(data);
    } catch (err) {
        console.log(err);
    }
});

const participantsSch = new mongoose.Schema({
    userName: { type: String, required: true },
    score: { type: Number },
    roomId: { type: Number, required: true }
});

const participants = mongoose.model('participants', participantsSch);

app.post('/api/users', async (req, res) => {
    const { userName, score, roomId } = req.body;
    try {
        if (!userName) {
            res.status(400).json({ message: "Missing inputs" });
            return;
        }

        const data = new participants({
            userName,
            score,
            roomId
        });

        const val = await data.save();
        res.status(201).json(val);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/participants/:roomId', async (req, res) => {
    try {
        const participantsData = await participants.find({ roomId: req.params.roomId }).sort({ score: -1 });
        res.status(200).json(participantsData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/score', async (req, res) => {
    const { score, userName, roomId } = req.body;
    try {
        const data = await participants.updateOne({ userName, roomId }, { $set: { score: score } });
        res.status(200).json({ message: "Score updated successfully" });
    } catch (err) {
        res.json({ message: err });
    }
});
















app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    
});
