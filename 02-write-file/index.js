const readline = require('readline');
const process = require('process');
const fs = require('fs');
const path = require('path')
const text = fs.createWriteStream(path.join(__dirname, 'text.txt'));

let rl = readline.createInterface(
  {
    input: process.stdin,
    output: process.stdout
  }
)

rl.write('Пожалуйста, введите текст \n')
rl.on('line', data => {
  if (data === 'exit') {
    rl.write('Приходите к нам еще =)')
    rl.close()
  } else {
    text.write(data + '\n')
  }
})

rl.on( 'SIGINT' , () => {
  rl.write('Приходите к нам еще =)')
  rl.close()
});

