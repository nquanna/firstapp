async function sleep() {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

[0, 1, 2, 3, 4, 5].map(async (number) => {
  console.log(number);
  return await sleep();
});
