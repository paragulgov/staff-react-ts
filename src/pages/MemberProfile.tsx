import React, { useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { ProfileCard } from '../components/UI/ProfileCard'
import staff from '../store/staff'
import { CircularProgress } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }
  })
)

type UrlParams = {
  userId: string
}

export const MemberProfile = observer(() => {
  const classes = useStyles()

  const {userId} = useParams<UrlParams>()

  const deleteMemberHandler = (id: string) => {
    staff.deleteMember(id)
  }

  useEffect(() => {
    staff.fetchStaff().then(() => staff.setCurrentMember(userId))
  }, [userId])

  if (staff.load) {
    return <CircularProgress className={classes.root} />
  }

  return (
    <div className={classes.root}>
      <ProfileCard
        values={staff.currentMember}
        deleteMemberHandler={deleteMemberHandler}
      />
    </div>
  )
})
