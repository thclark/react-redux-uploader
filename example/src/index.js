import React from 'react'
import ReactDOM from 'react-dom'
import FineUploaderTraditional from 'fine-uploader-wrappers'
// import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.min.css'
import 'react-table/react-table.css'


// Of course you can (and should!) use your own scss etc etc, but we'll just load an example file here.
// You can use completely custom CSS which isn't overwritten or modified by the uploader utilities.
import './my-custom-css.css'


import App from './App'
// import configureStore from './store'

// const store = configureStore()

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

// ReactDOM.render(
//   <Provider store={store}>
//     <App uploader={uploader} />
//   </Provider>,
//   document.getElementById('root'),
// )

ReactDOM.render(
  <App uploader={uploader} />,
  document.getElementById('root'),
)
