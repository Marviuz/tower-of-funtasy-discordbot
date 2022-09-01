module.exports = (sorter, key, arr) => {
  let newArr = [];

  sorter.forEach(_ => {
    arr.forEach(__ => {
      if (_ === __[key]) newArr.push(__);
    });
  });

  return newArr;
};