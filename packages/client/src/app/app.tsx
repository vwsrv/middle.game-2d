import React from 'react'
import ReactDOM from 'react-dom/client'
import '../index.css'
import FeatureExample from '../features/feature-example/feature-example'
import './normalize.less'
import './fonts.less'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FeatureExample />
  </React.StrictMode>
)
