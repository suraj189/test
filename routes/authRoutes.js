const passport=require('passport')

module.exports=(app)=>{
    app.get('/auth/google',
        passport.authenticate('google',{ //string like "google","profile",'email' actually code in the googlestrategy which help the googel to specify what user need
            scope:['profile','email']
        })
    );

    app.get('/auth/google/callback',
        passport.authenticate('google', { 
            successRedirect: '/auth/google/success',
            failureRedirect: '/auth/google/failure'
        })
    )
    app.get('/api/logout',(req,res)=>{
        req.logout()
        res.send(req.user)
    })

    app.get('/api/current_user',(req,res)=>{
        res.send(req.user);
    })

   
};
