var request = require('request');
var fs = require('fs');
var path = require('path');
var cheerios = require('cheerio');
var begin = Date.now();
var url='http://ylbook.com/cms/web/chuantongsecai/chuantongsecai.htm';

console.log('正在请求 %s',url);

request.get(url, function (err, res, responseBody) {
  if (err) {
    throw new Error(err);
  }

  var result= [];
  var $ = cheerios.load(responseBody);

  $("DL").map((i, item) => {

    var colorName = $(item).find('.colorName').text();
    var colorValue = $(item).find('.colorValue').text();
    var colorDesc = $(item).find('.colorDesc').text();

    var matched = colorValue.split(/[:\s]+/);

    if(matched.length==6){
      result.push({
        name:colorName,
        description:colorDesc,
        RGB:matched[1],
        CMYK:matched[3],
        HEX:matched[5]
      });
    }else{
      console.warn('忽略节点:',$(item).html())
    }

  });

  result=result.sort(function(a,b){
    return a.hex>b.hex?1:(a.hex<b.hex?-1:0);
  });


  fs.writeFileSync(path.join(__dirname,'..','data.json'),JSON.stringify(result,null,2));

  console.log('共抓取 %d 种颜色,耗时 %d ms',result.length, Date.now()-begin);
})