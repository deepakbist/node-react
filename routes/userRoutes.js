const mongoose = require('mongoose');
const User = mongoose.model('User');
const multer = require('multer');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

const upload = multer({ storage: storage }).single('file');

module.exports = app => {

    app.post('/api/user/register',(req,res)=>{
        const user = new User(req.body);
        user.save().then(s=>{
            console.log('user saved successfully',s);
            res.status(200).send({status:1,msg:'success'})

        }).catch(err=>{
            console.log('err in saving user',err);
            res.status(404).send({status:0,msg:'something went wrong'})
        })
        
    });


    app.post('/uploadImage',function(req, res) {
     
        upload(req, res, function (err) {

               if (err) {
                   console.log('err ',err);
                   return res.status(500).json(err)
               }
          return res.status(200).send(req.file);
    
        })
    
    });



    

  

  


};