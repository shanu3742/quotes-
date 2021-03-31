const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const Regiister = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        min:4,
        max:10,
 
     },
    email:{
        type:String,
        require:true,
        unique:[true,"email is already exist"],
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error("invalid emai")
            }
        }

    },
    password:{
        type:String,
        require:true,
        validate(value){
            if(!validator.isStrongPassword(value))
            {
                throw new Error("create a strong password")
            }
        }
        
    },
    CPassword:{
                type:String,
                require:true
    },

    gender:{
        type:String
    }

})

Regiister.pre("save", async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
        this.CPassword= undefined;
    }
   // const passwordHash =  await bcrypt.hash(password,10);
    next();
})


const Reg = new mongoose.model("Reg",Regiister);

module.exports = Reg;