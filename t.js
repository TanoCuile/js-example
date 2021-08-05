const fs = require('fs');

let str = '';
for (let i = 0; i < 1000 * 1024; ++i) {
  str += 't';
}

function gen() {
  const ws = fs.createWriteStream('./public/test_1.bin');

  for (let i = 0; i < 2000; ++i) {
    ws.write(str);
  }
  ws.end();
}

gen();
