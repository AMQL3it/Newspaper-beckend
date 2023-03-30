const jwt = require('jsonwebtoken');

exports.checkLogin = (req, res, next) => {
    let cookies = Object.keys(res.signedCookies).length > 0 ? req.signedCookies : null;

    if(cookies){
        try {
            token = cookies[process.env.COOKIE_NAME];
            const decoded = jwt.verify(token.process.env.JWT_SECRET);
            req.member = decoded;

            // pass member info to response locals
            if(res.locals.html){
                res.locals.loggedInMember = decoded;
            }
            next();
        } catch (err) {
            if(res.locals.html){
                res.redirect("/");
            }else{
                res.status(500).json({
                    errors: {
                        common: {
                            message: "Authentication failed!!!",
                        }
                    }
                });
            }
        }
    }else{
        if(res.locals.html){
            res.redirect("/");
        }else{
            res.status(401).json({
                error: "Authentication failed!!!", 
            });
        }
    }
};

exports.redirectLoggedIn = (req, res, next) => {
    let cookies = Object.keys(res.signedCookies).length > 0 ? req.signedCookies : null;

    if(cookies){
        next();
    }else{
        res.redirect('/inbox');
    }
};