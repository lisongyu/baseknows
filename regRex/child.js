// let str = 'abcabcdsddsabc;sdsd';
// //分组使用
// let reg = /(abc){2,}/;
// str.replace(reg, content => {
//   console.log(content)
// })
// let str = "sadadasda12.159.54.200sadadasdsadad";
// let reg = /(\d{1,3}\.){3}\d{1,3}/;
// str.replace(reg, function (content) {
//   console.log(content)
// })

// var str1 = '1967-8-12';
// let reg1 = /(19|20)\d{2}/;
// str1.replace(reg1, (c) => {
//   console.log(c)
// })

var str = '313-555-1234  248-555-9999 810-555-9000';
var reg = /(\d{3})(-)(\d{3})(-)(\d{4})/g
var res=str.replace(reg, ($1, $2, $3, $4, $5,$6) => {
  console.log($1, $2, $3, $4, $5,$6)
  return "("+$2+") " +$4+"-"+$6
})
console.log(res)