var h1Str = '<h1>welcome to my home</h1>'
var reg = /(<[Hh]([0-6])>)(.*?)(<\/[Hh]\2>)/

var res = h1Str.replace(reg, ($1, $2, $3, $4,$5) => {
  return $2 + $4.toUpperCase() + $5
})
console.log(res)