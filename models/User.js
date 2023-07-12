const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")
const SALT_ROUNDS = 10;

const userSchema = new Schema ({
    username: {
        type:String,
        maxLength: 30,
        required: true,
        unique:true
    },
    email: {
        type:String,
        maxLength: 150,
        required: true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password: {
        type:String,
        minLength: 3,
        maxLength: 50,
        required: true,
        unique:true,
        trim: true
    }
} , {
    timestamps:true
})

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
})

module.exports = mongoose.model("User", userSchema)