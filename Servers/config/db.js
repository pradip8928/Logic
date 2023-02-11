// Database Connectivity
const mongoose = require('mongoose');





mongoose.connect('mongodb+srv://logic:logic@cluster0.5xykn0r.mongodb.net/logic?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`database connection established`);
}).catch((err) => {
    console.log(`Connection is not established due to error: ${err}`);
})