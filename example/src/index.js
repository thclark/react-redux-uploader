import React from 'react'
import ReactDOM from 'react-dom'
import FineUploaderTraditional from 'fine-uploader-wrappers'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'

import App from './App'
import configureStore from './store'

const store = configureStore()

const uploader = new FineUploaderTraditional({
  options: {
    chunking: {
      enabled: true,
    },
    deleteFile: {
      enabled: true,
      endpoint: '/uploads',
    },
    request: {
      endpoint: '/uploads',
    },
    retry: {
      enableAuto: true,
    },
  },
})
ReactDOM.render(
  <Provider store={store}>
    <App uploader={uploader} />
  </Provider>,
  document.getElementById('root'),
)
