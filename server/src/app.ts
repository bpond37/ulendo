import express = require('express');
import path = require('path')
import memosRouter from './routes/memo'
import authRouter from './routes/auth'
import Memo from './models/Memo';
import User from './models/User';
import jwtMiddleware from './lib/jwtMiddleware'
import * as cookieParser from 'cookie-parser'
import * as DB from './models/index';
import * as cors from 'cors';



async function runServer(){
  const sequelize = DB.init()
  const app = express();
  
  app.use(express.json()) //req body에 json형태로 보내면 이를 파싱
  app.use(cookieParser())
  app.use(cors())
  // app.use(express.static(path.join(__dirname, '../../client/build/')))
  app.use(express.static(path.join(__dirname, '../app/build')))
  // app.use(jwtMiddleware)
  
  //router posts
  app.use('/api/auth', authRouter);
  app.use('/api/memos', memosRouter)
       
  app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, '../app/build', 'index.html'));
  })

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log('listening to port %d',PORT);
  });

  await sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  await sequelize.sync({
    force: true
  });
  
  const user = await User.create({
    email: 'kim@test.com',
    password: '1234'
  });

  const user2 = await User.create({
    email: 'lee@test.com',
    password: '1234'
  });

  // Memo.create(
  //   {
  //     // id:1,
  //     userId:user.id,
  //     title:'test1-1',
  //     contents:'test1-1',
  //   }
  // )
  
  // Memo.create(
  //   {
  //     // id:2,
  //     userId:user.id,
  //     title:'user1-2',
  //     contents:'user1-2',
  //   }
  // )

  // Memo.create(
  //   {
  //     // id:3,
  //     userId:user2.id,
  //     title:'user2',
  //     contents:'user2',
  //   }
  // )

}

runServer()