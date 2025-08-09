const getDate = () => {
  const getDateConst = new Date();
  const nowDate = `${getDateConst.getDate()}-${
    getDateConst.getMonth() + 1
  }-${getDateConst.getFullYear()}`;

  return nowDate;
};

module.exports = getDate;
