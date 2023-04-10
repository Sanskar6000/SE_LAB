const jwt = require('jsonwebtoken')

const authAdmin = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Invalid Authorization"})
        
        const TOKEN_SECRET = "secret";
        jwt.verify(token, TOKEN_SECRET, (err, admin) => {
            if (err) return res.status(400).json({ msg: err.message});
      
            req.admin = admin;
            //   perform next function
            next();
          });
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

module.exports = authAdmin