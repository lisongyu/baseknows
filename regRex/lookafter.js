var str = 'dsd3443$45.45'
var reg = /(?<=\$)[0-9.]+/g;
var res1 = str.replace(reg, (res) => {
  return res + '我变了'
});
console.log(res1)