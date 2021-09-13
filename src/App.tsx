import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PATH } from './utils/routes'
import { StaffList } from './pages/StaffList'
import { Container, LinearProgress } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { observer } from 'mobx-react-lite'
import staffList from './store/staff'
import { MemberProfile } from './pages/MemberProfile'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '100vh',
      background: '#F5F5F5',
    },
    content: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      padding: theme.spacing(2)
    }
  })
)

export const App = observer(() => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {staffList.load && <LinearProgress />}

      <Container maxWidth="lg">
        <div className={classes.content}>
          <Switch>
            <Route exact path={PATH.STAFF_LIST}>
              <StaffList />
            </Route>

            <Route path={PATH.MEMBER_PROFILE + '/:userId'}>
              <MemberProfile />
            </Route>

            <Route path={'*'}>
              <h3>404</h3>
            </Route>
          </Switch>
        </div>

      </Container>
    </div>
  )
})
