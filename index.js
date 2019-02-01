const mongoose = require('mongoose')
const app = require('./app')
const PORT = process.env.PORT || 9000
const DB = process.env.MONGODB_URI || 'mongodb://localhost:27017/docx'

mongoose.connect(DB, (err, res) => {
  if (err) {
    return console.log(`[index] Hubo un error al inicializar: ${err}`)
  } else {
    console.log('[index] Conexion a DB establecida.')
    app.listen(PORT, () => {
      console.log(`[index] Api ejecutandose desde el puerto ${PORT}.`)
    })
  }
})
