const express = require('express');
const router = express.Router();
const Usertender = require('../models/usertender');

// Create
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const { isAuthenticated } = require('../middleware/Auth');


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    // region: 'YOUR_AWS_REGION'
    apiVersion: '2006-03-01' // Add this line
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'dcpr',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString()); // Use a unique key for each file
        }
    })
});

router.post('/tenderapply', async (req, res) => {
    upload.single('file')(req, res, async function (err) {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to upload file');
        }
        // const { name, amd, description, Value, role, user, startDate, endDate, seller, admin } = req.body;

        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }
        // Try to find an existing Usertender with the same details
        let usertender = await Usertender.findOne(req.body);

        // If an existing Usertender is found, return it
        if (usertender) {
            return res.status(201).json({ message: "already applied", usertender });
        }

        const newUsertender = new Usertender({
            name: req.body.name,
            usertender:req.body.usertender,
            file: req.file.location,
        })
        await newUsertender.save();
        res.status(200).json(newUsertender);
    });
});

// Read
router.post('/tender/user/post',isAuthenticated, async (req, res) => {
   const userId = req.body.usertender
   console.log(userId,'userId')
    const usertenders = await Usertender.find({usertender:userId}).populate('usertender').populate('name');
    
    res.status(200).json({data:usertenders});
});

router.post('/getdetails/tender', isAuthenticated, async (req, res) => {
    try {
        const tenderId = req.body.name;
        console.log(req.user, req.params.id,'userId');
    
        const usertender = await Usertender.findOne({usertender:req.user._id}).populate('usertender').populate('name');
        console.log(usertender,'76')
        res.status(200).json({data:usertender});
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
    // // console.l
    // const usertender = await Usertender.find({name:req.user._id}).populate('usertender').populate('name');
    // res.send(usertender);
});
// 

// Read for particlura user in use
router.post('/myaccount',isAuthenticated, async (req, res) => {
    
    try {
        console.log(req.user._id,'userId');
    
        const usertenders = await Usertender.find({usertender:req.user._id}).populate('usertender').populate('name');
          console.log(usertenders,'usertenders')
        // .populate('User') // assuming 'user' is the field that references the User model
            // .populate('Tender'); // assuming 'tender' is the field that references the Tender model
         
        res.status(200).json({data:usertenders});
    } catch (error) {
       console.log(error)
       res.status(400).json({message:error.message}) 
    }
    // const userId = req.body.usertender;
   
 });

// Update
router.put('/update/:id', async (req, res) => {
    const usertender = await Usertender.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(usertender);
});

// Delete
router.delete('/:id', async (req, res) => {
    await Usertender.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;