const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const Data = require('./data.js')
const Create = require('./creatcode.js')
var app = express();
app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据

app.use(cors({
  origin: ['http://localhost:8080'],
  methods: ['GET', 'POST'],
  alloweHeaders: ['Conten-Type', 'Authorization']
}));
var phone = '';
var code = '';
var userdata = {
  code: 0,
  data: {
    phone: '',
    name: '',
    id: ''
  }

}
//设置跨域访问
// app.all('https://www.baidu.com', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", 'https://www.baidu.com');
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     //res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

app.get('/position', function (req, res) {
  var addressData = {
    code: 0,
    data: {
      address: '地址：我真的不知道在哪'
    }
  }
  res.send(addressData);
});
app.get('/shops', function (req, res) {

  // console.log(req.query);
  res.send(Data.data);
});
app.get('/auth', function (req, res) {
  console.log(code);
  code = Create.creatCode();
  phone = req.query.phoneNum;
  res.send(code);
});

app.post('/authlog', function (req, res) {
  console.log(req.body);
  console.log(code)
  if (req.body.name) {
    userdata.data.name = req.body.name;
    userdata.data.id = 1;
  }

  if (phone == req.body.phoneNum && code == req.body.code) {
    userdata.data.phone = req.body.phoneNum;
    userdata.data.id = 1;
    res.send('right')
    phone = ""
  } else {
    res.send('err')
  }
});

app.get('/userinfo', function (req, res) {
  res.send(userdata)
});

app.get('/logout', function (req, res) {
  res.send(userdata)
  userdata.data.id= userdata.data.phone= userdata.data.name='';
})
app.listen(4000);