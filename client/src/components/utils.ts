import 'moment/locale/ko';
import sanitizeHtml from 'sanitize-html'
import moment from 'moment';

export const getDateFormat = (time:number)=>{
  const date = moment(time)
  // const date = new Date(time);
  // const year = date.getFullYear()
  // const month = date.getMonth()+1
  // const day = date.getDate()
  // const ampm = date.getHours() <12 ? "오전":"오후"
  // const hours = date.getHours() % 12
  // const minutes = date.getMinutes()<10? "0"+date.getMinutes(): date.getMinutes();
  return date.locale('kr').format('lll')
  // return year+"년 "+month+"월 "+ day+"일 " +ampm +" "+ hours+":"+minutes; 
}


export const shortenLine = (text:string) =>{
  if (text===undefined){
    text=''
  }
  return text.slice(0,15)
}

export const removeHtml = (html:string) =>{
  const filtered = sanitizeHtml(html, {
      allowedTags: [],
    })
    return filtered.slice(0,10)
  }

export const removeHtmlAndShorten = (body:string) =>{
  const filtered = sanitizeHtml(body, {
    allowedTags:[],
  })
  return filtered.length < 200? filtered : `${filtered.slice(0,200)}...`;
}

export const ISOStringToJsDate = (t:string) =>{
  const time = new Date(t)
  return time.getTime()
}
export const jsDateToISOString = (t:number) =>{
  return moment(t).toISOString()
}