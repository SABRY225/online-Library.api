const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const userService = require('./user');

class authService {
   
    static async comparePassword(inputPassword,userPassword)
    {
      return bcrypt.compare(inputPassword,userPassword);
    }

    static async generateToken(tokenData)
    {
      return jwt.sign(tokenData, '.njjfjfhjslslshfjiaoaosfkpjfjfj' ,{expiresIn:'1d'});
    }
    
    //   static async generateRefreshToken(refreshTokenData) {
    //   const rtoken=  jwt.sign(refreshTokenData, process.env.REFRESH_SECRET_KEY, { expiresIn: '1y' });
    //   await userService.findByIdAndUpdate(refreshTokenData.userId,'refreshToken',rtoken);
    //   return rtoken;
    // }
  

    
}
  
  
  module.exports = authService;