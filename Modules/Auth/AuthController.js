const UserModel = require("../../DBContext/Models/UserModel.js");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const signUp = async (req , res) => 
{
    let {username, email, password , confirmPassword } = req.body;
    if(password == confirmPassword)   // hna la dh tmam
    {
        const user = await UserModel.findOne({email}) // get user email
        if(user){   // i will search in database on this email if is exist 
            return res.status(200).json({ Message: "This User Already Register" });
        }
        else{      //  if is not exist i will create new account and save it in database
            const hashpassword = await bcrypt.hashSync(password , 5);
            const SavedUser = await UserModel({username, email, password : hashpassword});
            await SavedUser.save();
            return res.status(200).json({ Message: "Saved" , SavedUser});
        }
    }
    else     
    {
        res.json({Message: "Password not Match With confirmed Password  " , })
    }
}


const signIn = async (req , res) => {
    const {email , password} = req.body;
  
    try{     
    if(!email || !password)
    {
       return res.status(400).json({ Message: "Both email and password are required" });
    }

    const user = await UserModel.findOne({email}).select('+password')
    if(!user)
    {
        return res.status(404).json({ Message: "Email not found. Please register first" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch)
    {
        return res.status(401).json({ Message: "Invalid credentials" });
    }
            
    const token = jwt.sign({ id: user._id }, process.env.tokenKey , { expiresIn: "1h" });

    return res.status(200).json({       // Successful login
        Message: "Login successful",
        user: { id: user._id, username: user.username, email: user.email },
        token
        });
    
    }catch (error){
        console.error("Sign in error:", error);
        return res.status(500).json({ Message: "Internal server error"  });
    }
}

module.exports = {signUp , signIn}