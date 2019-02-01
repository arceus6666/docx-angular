const Word = require('./model')

const transform = (req, res) => {
}

const add = (req, res) => {
  let word = new Word({ hash: req.body.hash, type: req.body.type })
  word.save().then((w) => {
    res.status(200).send({ msg: w, ok: true })
  }, (err) => {
    res.status(500).send({ msg: err, ok: false })
  })
}

const update = (req, res) => {
  Word.findOne({}, (err, w) => {
    if (err) return res.status(500).send(err)
    if (!w) return res.status(500).send(false)
    w.hash = req.body.hash
    w.type = req.body.type
    w.save().then((ww) => {
      res.status(200).send({ msg: ww, ok: true })
    }, (err) => {
      res.status(500).send({ msg: err, ok: false })
    })
  })
}

const get = (req, res) => {
  Word.findOne({}, (err, ws) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(ws)
    }
  })
}

module.exports = {
  add,
  update,
  get,
  transform
}
