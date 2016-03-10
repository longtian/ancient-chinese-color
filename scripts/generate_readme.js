console.log('|name|HEX|RGB|HSV|HSL|CMYK|description|');
console.log('|---|---|---|---|---|---|-------------|');
require('../').forEach(item=>{
  console.log(`|${item.name}|${item.HEX}|${item.RGB}|${item.HSV}|${item.HSL}|${item.CMYK}|${item.description.replace(/\s/g,'')}|`);
})