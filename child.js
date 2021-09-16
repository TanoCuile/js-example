let i = 0;

sendAlive();

function sendAlive() {
  process.send({
    status: 'alive',
  });
  setTimeout(() => {
    if (++i < 200) {
      sendAlive();
    } else {
        process.send({
          status: 'die',
        });
        process.exit();
    }
  }, 100);
}
