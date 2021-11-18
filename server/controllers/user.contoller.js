const User = require('../models/user.model');
const errorHandler = require('../helpers/dbErrorHandler');
const extend = require('lodash/extend');

const create = async (req,res)=>{
    const user = new User(req.body)
    console.log(user)
    try{
        await user.save();
        return res.status(200).json({
            message:"Successfully signed up!"
        })
    }catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const list = async (req,res) =>{
    try{
        let users = await User.find().select('name email updated successfully');
        res.json(users);
    }catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    };
};

const userByID = async (req,res,next,id)=>{
    try{
        let user = await User.findById(id)
        if(!user)
            return res.status('400').json({
                error:"user not found"
            });
            req.profile = user
            next()
    }catch(err){
        return res.status('400').json({
            error: "Could not retrieve user"
        })
    }
};

const read = (req,res) =>{
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

const update = async (req,res) =>{
    try{
        let user = req.profile
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    }catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
};

const remove = async (req, res) => {
    try {
      let user = req.profile
      let deletedUser = await user.remove()
      deletedUser.hashed_password = undefined
      deletedUser.salt = undefined
      res.json(deletedUser)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  };

module.exports = {create, userByID, read, list, remove, update};




