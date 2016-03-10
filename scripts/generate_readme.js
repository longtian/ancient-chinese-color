console.log('|名字|HEX|RGB|HSV|HSL|CMYK|');
console.log('|--|--|--|--|--|--|');
require('../').forEach(item=>{
  console.log(`|${item.name}|${item.HEX}|${item.RGB}|${item.HSV}|${item.HSL}|${item.CMYK}|`);
})