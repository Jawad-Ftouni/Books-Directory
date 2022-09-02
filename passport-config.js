const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');




function initialize(passport,getUserByUserName){

const authenticateUser =  (userName, pwd ,done)=>{
    const user = getUserByUserName(userName);
    if(!user){
        return done(null,false,{message:'No user with that USerName'})
    }
    try{
        if(bcrypt.compare(pwd, user.pwd)){
            return done(null, user)
        }else{
            return done(null,false, {message: 'password incorrect'})
        }
    }catch(e){
        return done(e);
    }

}  
  passport.use(new LocalStrategy({userName:'userName'}),
  authenticateUser)
  passport.serializeUser((user, done) => {  })
  passport.deserializeUser((id, done)=>{  })
}
module.exports = initialize;