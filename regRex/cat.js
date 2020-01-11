let str='The cat scattered his food all over the room'
var reg = /\bcat\b/; 
console.log(str.replace(reg,'dog'))


let str1 = `
// Mssffsfdds
sdfsfsdfds
dfsdfsdf
//abc
sdsds
`
var reg1 = /^\s*\/\/.*$/;
str1.replace(reg1, function (content) {
  console.log(22)
  console.log(content)
})