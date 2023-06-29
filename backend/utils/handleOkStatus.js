module.exports = (data, res, statusCod = 200) => {
  res.status(statusCod)
    .send({ data });
};
