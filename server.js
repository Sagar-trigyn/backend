const express = require('express')
const app = express();
const cors = require('cors');

app.use(cors())



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./models/config/config')
require("dotenv").config();

app.get('/', (req, res) => {
    return res.status(200).json({
        message: "server responding "
    })
})

// 

app.use('/api', require('./routes/userRoutes'))
app.use('/api', require('./routes/messageRoutes'))
// schemaName.index({ request: 'text' });  
const PORT = process.env.PORT || 6000
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})