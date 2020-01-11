var str = `
111111111
22222
33333
55555-
66666-3333
77777-45
`

var reg = /\d{5}(-\d{4})?/g;
str.replace(reg, res => {
    console.log(res)
  })