import * as jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User'

const jwtMiddleware = async (req, res, next) =>{
  console.log("jwtMiddleware")
  // const token : string | null = window.sessionStorage.getItem('jwt');
  const token = req.cookies['access_token']
  console.log("token",token)

  // 토큰 없을때
  if(!token) {
    req.decoded = {user:null}
    return next()
  }

  try {
    const decoded = jwt.verify(token, config.auth.key)
    req.decoded = {user:{id:decoded['id'], email:decoded['email']}}
    console.log('token success')
    const key = decoded['id']
    
    //토큰 유효기간 3.5일 미만이면 재발급
    const now = Math.floor(Date.now() /1000);

    if(decoded['exp'] - now < 60*60*24*3.5 ){
      const user = await User.findByPk(key)
      if(user){
        console.log("user",user)
        user.generateToken()
        res.cookie('access_token', token, {
          maxAge : 1000*60*60*24*7,
          httpOnly:true,
        })
      }
    }

    return next();
  } catch (e) {
    console.log('token failed')
    // 토큰 검증 실패
    return next()
  }
} 

export default jwtMiddleware;