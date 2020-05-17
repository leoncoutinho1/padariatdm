exports.logHour = (req, res, next) => {
  let now = new Date;
  let horaatual = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  let host = req.url;
  console.log(`Chamada para ${host} às ${horaatual}`);
  next();
};