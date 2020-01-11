var str = 'I paid $30 for 100 apples,50 oranges,and 60 pears. I saved $5 on this order.'

var reg = /\b(?<!\$) \d+\b/g;

str.replace(reg, (res) => {
  console.log(res)
})