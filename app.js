const express = require("express");

//* express 할당
const app = express();

//* / 경로에 get 요청에 대해 작동
app.get("/",(req,res)=>{
    return res.send("/ 에 대한 get 요청")
})
// url 로 이동하면 기본적으로 get 요청

//* app listen (서버 실행)
app.listen(3002,()=>{
    console.log("✅ 서버가 연결되었습니다. http://localhost:3002")
})