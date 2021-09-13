import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { EmploymentType, PostType } from '../../utils/models'
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { PATH } from '../../utils/routes'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 275,
    },
    fullName: {
      fontSize: 18
    }
  })
)

type StaffCardType = {
  id: string
  fullName: string
  post: PostType
  employment: EmploymentType
  deleteMemberHandler: (id: string) => void
}

export const StaffCard: React.FC<StaffCardType> = props => {
  const classes = useStyles()

  const {id, fullName, post, employment, deleteMemberHandler} = props

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.fullName}>
          {fullName}
        </Typography>
        <Typography color="textSecondary">
          Должность: {post}
        </Typography>
        <Typography color="textSecondary">
          {employment === 'full' ? 'Полная' : 'Частичная'} занятость
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" component={Link} to={PATH.MEMBER_PROFILE + `/${id}`}>Подробнее</Button>
        <Button size="small" color="secondary" onClick={() => deleteMemberHandler(id)}>Удалить</Button>
      </CardActions>
    </Card>
  )
}
