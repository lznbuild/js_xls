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
        persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
        // break; // 如果只取第一张表，就取消注释这行
      }
    }
    //拿到的数据
    console.log(persons, '123');

  };

  // 以二进制方式打开文件
  fileReader.readAsBinaryString(files[0]);
}



