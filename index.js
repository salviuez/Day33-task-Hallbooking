// To connect with your mongoDB database
const express = require("express");
const app = express();
const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://salviuez:Jesusatas19@cluster0.iy7r0xj.mongodb.net',
    {
        dbName: 'mdb',
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("connected successfully");
        }
    });
app.use(express.json());

app.get('/', (req, resp) => {
    resp.send('Book Your Room');
});

//Schema for creating a room:
const roomSchema = new mongoose.Schema({
    numberOfSeats: {
        type: String,
    },

    amentiesInRoom: {
        type: String,
    },
    priceForHour: {
        type: String,
    },


});
const RoomCreated = mongoose.model('createroom', roomSchema);
RoomCreated.createIndexes();

//ANSWER:
//1.Create a room
app.post('/createroom', async (req, resp) => {
    try {
        const user = new RoomCreated(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log('ROOM CREATED SUCCESSFULLY');
        }
    } catch (e) {
        resp.send('Something Went Wrong');
    }
});

// Schema for Room Booking
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    sartTime: {
        type: String,
    },
    EndTime: {
        type: String,
    },

    roomID: {
        type: String,
        required: true,
    },
    BookedStatus: {
        type: String,
        required: true,
    },

});
const RoomBooked = mongoose.model('users', UserSchema);
RoomBooked.createIndexes();

//ANSWER:
//2.Booking a room:
app.post('/register', async (req, resp) => {
    try {
        const user = new RoomBooked(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log('User already register');
        }
    } catch (e) {
        resp.send('Something Went Wrong');
    }
});

//ANSWER:
//3.Listing all rooms with booked datas:
app.get('/get-room-data', async (req, resp) => {
    try {
        const details = await RoomBooked.find({});
        resp.send(details);
    } catch (error) {
        console.log(error);
    }
});

//4.
//schema for customer details:
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    sartTime: {
        type: String,
    },
    endTime: {
        type: String,
    },

    roomID: {
        type: String,
        required: true,
    },
    bookedStatus: {
        type: String,
        required: true,
    },

});
const customerData = mongoose.model('cdata', customerSchema);
customerData.createIndexes();

//ANSWER
//4.List all customers with booked data:
app.post('/customerdetails', async (req, resp) => {
    try {
        const user = new customerData(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log('customer booked details');
        }
    } catch (e) {
        resp.send('Something Went Wrong');
    }
});

//ANSWER:
//5. CUSTMER DETAILS AND ROOMS DETAILS:
app.get('/get-customer-data', async (req, resp) => {
    try {
        const details = await customerData.find({});
        resp.send(details);
    } catch (error) {
        console.log(error);
    }
});



// Server setup
app.listen(6000, () => {
    console.log('App listen at port 6000');
});

