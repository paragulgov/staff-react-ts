import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { StaffCard } from '../components/UI/StaffCard'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { MemberCreate } from '../components/MemberCreate'
import staff from '../store/staff'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    button: {
      margin: theme.spacing(2, 0)
    }
  })
)

export const StaffList = observer(() => {
  const classes = useStyles()

  const deleteMemberHandler = (id: string) => {
    staff.deleteMember(id)
  }

  useEffect(() => {
    staff.fetchStaff()
  }, [])

  return (
    <div className={classes.root}>
      <MemberCreate />

      <Grid container spacing={2}>
        {staff.staffList.map(({id, fullName, employment, post}) => {
          return (
            <Grid key={id} item md={4} sm={6} xs={12}>
              <StaffCard
                key={id}
                id={id}
                fullName={fullName}
                employment={employment}
                post={post}
                deleteMemberHandler={deleteMemberHandler}
              />
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
})
