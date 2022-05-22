const fs = require('fs');
const path = require('path')

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
   if (err) console.log(err)
   files.forEach(file => {
      if (!file.isDirectory()) {
         let fileName = path.basename(file.name, path.extname(file.name));
         let fileLastName = path.extname(file.name).slice(1);
         let sizes;
         fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
            if(err) console.log(err)
            sizes = stats.size
            console.log(fileName + ' - ' + fileLastName + ' - ' + sizes + 'b')
         })
      }
   })
})



