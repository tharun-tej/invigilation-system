const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    console.log(user);
    if (!user)
      return res.json({ message: "Incorrect Email or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ message: "Incorrect Email or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};


// module.exports.logOut = (req, res, next) => {
//   try {
//     if (!req.params.id) return res.json({ message: "User id is required " });
//     onlineUsers.delete(req.params.id);
//     return res.status(200).send();
//   } catch (ex) {
//     next(ex);
//   }
// };


// module.exports.clearNotification = async (req,res,next) => {
//   try
//   {
//         const { user } = req.body;
//         const { notification_id } = req.body;
//         console.log(req.body)
//         const auth_user = await User.findOne({_id:{$eq:user._id}});
//         if(!auth_user)
//         return res.json({status:false,message:"Failed to authenticate.Try again"});
        
//         const { modifiedCount } = await User.updateOne(
//           {_id: { $eq : auth_user._id}},
//           { $pull: { notifications: {_id:{ $eq: notification_id}} } } 
//         )
//         const updated_user = await User.findOne({_id:{$eq:user._id}});

//         if(modifiedCount === 1)
//         return res.json({status:true,user:updated_user,message:"Cleared the notification successfully"});

//         return res.json({status:false,message:"Can't find the notification"});
//   }
//   catch(ex)
//   {
//     next(ex);
//   }
// }