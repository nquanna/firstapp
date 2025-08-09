const setNextRemind = (count) => {
  const getDateConst = new Date();
  getDateConst.setDate(getDateConst.getDate() + count);
  const nowDate = `${getDateConst.getDate()}-${
    getDateConst.getMonth() + 1
  }-${getDateConst.getFullYear()}`;

  return nowDate;
};

module.exports = setNextRemind;
