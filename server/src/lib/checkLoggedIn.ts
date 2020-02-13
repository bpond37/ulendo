/*
로긴되어있는지 확인하는 미들웨어
*/

const checkLoggedIn = (res,req,next)=>{
  const {user} = req.decoded
  console.log('controller check')
  console.log(user)

  //not logged in
  if(!user){
    console.log('로그인중 아님')
    return res.status(401).json({msg:'로그인중 아님'})
  }
  return next();
}

export default checkLoggedIn