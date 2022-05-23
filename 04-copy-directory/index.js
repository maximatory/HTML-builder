const fs = require('fs');
const path = require('path');

// создаем дирректорию
fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, error => {
   if (error) {
     throw error;
   }
});

// перебираем дирректорию и удаляем все файлы, если они есть
fs.readdir(path.join(__dirname, 'files-copy'), (err, data) => {
   if (data !== undefined) {
      data.forEach(el => {
         fs.unlink(path.join(__dirname, 'files-copy', el), (err) => {
            if(err) console.log(err)
         })
      })  
   }
})
 
// читаем дирректорию и копируем
fs.readdir(path.join(__dirname, 'files'), (err, data) => { 
   if (err) console.log(err)
   data.forEach(el => {
      fs.promises.copyFile(path.join(__dirname, 'files', el), path.join(__dirname, 'files-copy', el));
   })
})

 