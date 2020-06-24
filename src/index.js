import pinyin from "tiny-pinyin";


const PRESTR = 'ds'

var input = document.querySelector('#input');
input.onchange = function (e) {
  var files = e.target.files;

  var fileReader = new FileReader();
  fileReader.onload = function (ev) {
    try {
      var data = ev.target.result,
        workbook = XLSX.read(data, {
          type: 'binary'
        }), // 以二进制流方式读取得到整份excel表格对象
        persons = []; // 存储获取到的数据
    } catch (e) {
      console.log('文件类型不正确');
      return;
    }

    // 表格的表格范围，可用于判断表头是否数量是否正确
    var fromTo = '';
    console.log(workbook.Sheets, 'workbook.Sheets');
    // 遍历每张表读取
    for (var sheet in workbook.Sheets) {
      if (workbook.Sheets.hasOwnProperty(sheet)) {
        fromTo = workbook.Sheets[sheet]['!ref'];
        console.log(fromTo);
        persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
        // break; // 如果只取第一张表，就取消注释这行
      }
    }

    console.log(persons, '123');
    const fanObj = {};
    const enObj = {};
    persons.forEach((item, index) => {
      const pinyinStr = pinyin.convertToPinyin(item["繁體"], "-",true)


      const key = `${PRESTR}.${pinyinStr[0]}${pinyinStr.match(/(?<=-)./g) ? pinyinStr.match(/(?<=-)./g).join(""):''}`
        

      fanObj[key] = item["繁體"]
      enObj[key] = item["英文"]
    })


    console.log(JSON.stringify(fanObj, null, 4), 'fanobj');

    console.log(JSON.stringify(enObj, null, 4), 'fanobj');



  };

  // 以二进制方式打开文件
  fileReader.readAsBinaryString(files[0]);
}

console.log(); 

