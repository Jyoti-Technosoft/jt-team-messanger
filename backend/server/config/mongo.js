import mongoose from 'mongoose'
import config from './index.js'

const CONNECTION_URL = `mongodb://${config.db.url}/${config.db.name}`

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology',true);
mongoose.connect(CONNECTION_URL)

mongoose.connection.on('connected', () => {
  console.log('Mongo is connected succesfully')
  
})
mongoose.connection.on('reconnected', () => {
  console.log('Mongo is reconnected')
})
mongoose.connection.on('error', error => {
  console.log('Mongo connection is an error', error)
  mongoose.disconnect()
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongo connection is disconnected')
})
