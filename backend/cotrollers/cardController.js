const Card = require('../models/card');
const handleOkStatus = require('../utils/handleOkStatus');
const NotEnoughRights = require('../exceptions/notEnoughRights');
const {notEnoughRight} = require('../utils/validationMessage');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((data) => handleOkStatus(data, res))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  Card.create({
    ...req.body,
    owner,
  })
    .then(d => Card.populate(d, {path: 'owner'}))
    .then((data) => handleOkStatus(data, res, 201))
    .catch(next);
};
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then(() => {
      Card.findOneAndRemove({
        _id: req.params.cardId,
        owner: req.user._id,
      })
        .orFail(new NotEnoughRights(notEnoughRight))
        .then((u) => handleOkStatus(u, res))
        .catch(next);
    })
    .catch(next);
};
module.exports.addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: {likes: req.user._id},
    },
    {
      new: true,
    },
  )
    .populate('owner')
    .orFail()
    .then((data) => handleOkStatus(data, res))
    .catch(next);
};
module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: {likes: req.user._id},
    },
    {
      new: true,
    },
  )
    .populate('owner')
    .orFail()
    .then((data) => handleOkStatus(data, res))
    .catch(next);
};
