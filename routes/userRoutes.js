const mongoose = require('mongoose');
const User = mongoose.model('User');
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
        
    })
  

  


};