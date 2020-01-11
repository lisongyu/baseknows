var httpStr = `
http://www.forta.com
https://mail.forta.com
ftp://ftp.forta.com
`
var reg = /.+(?=:)/g
httpStr.replace(reg, (res) => {
  console.log(res)
})

//\b边界
var sds = '10000000000'.replace(/(\d)(?=(\d{3})+\b)/g, '$1,')
console.log(sds)


var res2 = '10000000000.000'.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

console.log(res2)


const num = 2333333.11111;
var res3 = num.toLocaleString('zh', { maximumFractionDigits: 5}); 
console.log(res3)