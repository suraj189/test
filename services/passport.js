const passport=require('passport')
const GoogleStrategy=require('passport-google-oauth20').Strategy
const mongoose=require('mongoose')
const keys=require('../config/keys')
const { use } = require('passport')


const User=mongoose.model('users')

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id)
    .then(user=>{
        done(null,user)
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID:keys.googleClientID,
            clientSecret:keys.gooleClientSecret,
            callbackURL:'/auth/google/callback'
        },(accesToken,refreshToken,profile,done)=>{
            console.log('access token',accesToken)
            console.log('refresh token',refreshToken)
            console.log('profile',profile)
            User.findOne({googleId:profile.id})
            .then((existingUserr)=>{
                if(existingUserr){
                    //we don't need to save a reacord
                    done(null,existingUserr)
                }else{
                    new User({googleId:profile.id}).save()
                    .then(user=>done(null,user))
                }
            })
           
        }
    )
);


