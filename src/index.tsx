import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import { firebaseConfig } from './utils/config'
import { initializeApp } from 'firebase/app'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import ruLocale from 'date-fns/locale/ru'
import { RuLocalizedUtils } from './utils/datePicker'
import { ThemeProvider } from '@material-ui/core'
import { theme } from './utils/theme'

// Initialize Firebase
initializeApp(firebaseConfig)

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={RuLocalizedUtils} locale={ruLocale}>
          <App />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
