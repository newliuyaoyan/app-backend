exports.creatCode=function(){
 
  var num='';
  for(let i =0 ;i<6;i++){
    let k=parseInt(Math.random()*10);
    num=num+k
  }
  return num;
}