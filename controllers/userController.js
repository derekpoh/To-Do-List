const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET=process.env.JWT_SECRET;
const bcrypt= require("bcrypt");

const create = async (req,res) => {
    const {username, password} = req.body;
    if(password.length < 3) {
        return res.status(400).json({error: "Password too short"})
    }
    if(password.length > 50) {
        return res.status(400).json({error: "Password too long"})
    }
    if(username.length > 30) {
        return res.status(400).json({error: "Username too long"})
    }
    try {
        const user = await User.create(req.body);
        const userObject = {...user.toJSON()};
        delete userObject.password;
        const payload = {userObject};
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn:60*60});
        res.status(201).json(token);
    }
    catch(error) {
        res.status(500).json(error)
    }
}

const login = async(req,res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if (!user) {
            return res.status(401).json({message: "User or password is invalid"})
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const userObject = {...user.toJSON()};
            delete userObject.password;
            const payload = {userObject};
            const token = jwt.sign(payload, JWT_SECRET, {expiresIn:60*60});
            res.status(201).json(token);
        } else {
            return res.status(401).json({message: "User or password is invalid"})
        }
    }
    catch(error) {
        res.status(500).json(error)
    }
}

module.exports = {
    create,
    login
}