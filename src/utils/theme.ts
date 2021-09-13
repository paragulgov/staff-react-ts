import { createTheme } from '@material-ui/core'

export const theme = createTheme({
  palette: {
    primary: {
      light: '#5c6bc0',
      main: '#33691e',
      dark: '#002884',
      contrastText: '#fff',
    }
  },
  overrides: {
    MuiCircularProgress: {
      colorPrimary: {
        color: '#7e57c2',
      }
    }
  }
})
