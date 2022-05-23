const fs = require('fs');
const path = require('path')

fs.writeFile(
   path.join(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
       if (err) throw err;
   }
);



fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
   if (err) console.log(err)
   files.forEach(file => {
      if (path.extname(file.name).slice(1) === 'css') {
         fs.readFile(path.join(__dirname, 'styles', file.name), (err, data) => {
            fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data.toString(), (err) => {
               if(err) console.log(err)
            })
         })
      }
   })
})
