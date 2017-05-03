import React from 'react'
import express from 'express'
import { StaticRouter } from 'react-router'
import { renderToString } from 'react-dom/server'

import { initializeRoutes } from '../../../src/index'

import App from './App'
import routes from './routes'

const app = express()

app.use(express.static('public'))

app.get('*', function (req, res) {
  const path = req.path;

  initializeRoutes(routes, path)
    .then(newRoutes => renderToString(
      <StaticRouter location={ path } >
        <App routes={ newRoutes } />
      </StaticRouter>
    ))
    .then(html => {
      res.send(
        `<!doctype html>
        <html>
          <head>
            <title>Code splitting + Server Side Rendering</title>
          </head>
          <body>
            <div id="root">${ html }</div>
            <script src='/app.js'></script>
          </body>
        </html>`
    )
    })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
