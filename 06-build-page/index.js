const fs = require('fs');
const path = require('path')
const rimraf = require('rimraf')

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
   if (err) throw err;
});

// read template.html
fs.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, template) => {
   if (err) console.log(err)
   // read dirrectories components
   fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true }, (err, files) => {
      // read files html
      files.forEach(file => {
         let fileName = path.basename(file.name, path.extname(file.name));
         fs.readFile(path.join(__dirname, 'components', file.name), (err, data) => {
            let content = data.toString();
            template = template.replace(`{{${fileName}}}`, content)
            fs.writeFile(
               path.join(__dirname, 'project-dist', 'index.html'),
               template,
               (err) => {
                   if (err) throw err;
               }
           );
         })
      })
   }) 
})

// собираем стили
fs.writeFile(
   path.join(__dirname, 'project-dist', 'style.css'), '', (err) => {
       if (err) throw err;
   }
);

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
   if (err) console.log(err)
   files.forEach(file => {
      if (path.extname(file.name).slice(1) === 'css') {
         fs.readFile(path.join(__dirname, 'styles', file.name), (err, data) => {
            fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data.toString(), (err) => {
               if(err) console.log(err)
            })
         })
      }
   })
})



// копируем assets
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive : true}, err => {
   if(err) console.log(err)
})

// копируем папки
fs.readdir(path.join(__dirname, 'assets'), (err, elem) => {
   if(err) console.log(err)
   elem.forEach(el => {
      fs.mkdir(path.join(__dirname, 'project-dist', 'assets', el), {recursive : true}, err => {
         if (err) console.log(err)
      })
   })
})

// копируем файлы
fs.readdir(path.join(__dirname, 'assets'), (err, elems) => {
   elems.forEach(elem => {
      fs.readdir(path.join(__dirname, 'assets', elem), { withFileTypes: true }, (err, files) => {
         files.forEach(el => {
            fs.copyFile(path.join(__dirname, 'assets', elem, el.name), path.join(__dirname, 'project-dist', 'assets', elem, el.name), err => {
               if (err) console.log(err)
            });
         })
         
      })
   })
});

