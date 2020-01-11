var str = '343434@con.com'
reg = /(\w+\.)*\w+@(\w+\.)+[A-Za-z]+/
console.log(reg.test(str))