import React from 'react'
import { Button, Card, CardActions, CardContent, IconButton, Typography } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { PATH } from '../../utils/routes'
import { MemberType } from '../../utils/models'
import { format, toDate } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'
import { MemberUpdate } from '../MemberUpdate'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      minWidth: 275
    },
    icon: {
      margin: 5
    }
  })
)

type ProfileCardType = {
  values: MemberType
  deleteMemberHandler: (id: string) => void
}

export const ProfileCard: React.FC<ProfileCardType> = props => {
  const classes = useStyles()

  const {values, deleteMemberHandler} = props

  const date = values.birthDate ? format(toDate(values.birthDate), 'dd MMMM yyyy', {locale: ruLocale}) : ''

  return (
    <Card className={classes.card}>
      <IconButton className={classes.icon} component={Link} to={PATH.STAFF_LIST}>
        <ArrowBack fontSize="inherit" />
      </IconButton>

      <CardContent>
        <Typography variant="h5" gutterBottom>
          {values.fullName}
        </Typography>
        <Typography color="textSecondary">
          Должность: {values.post}
        </Typography>
        <Typography color="textSecondary">
          Занятость: {values.employment === 'full' ? 'Полная' : 'Частичная'}
        </Typography>
        <Typography color="textSecondary">
          Пол: {values.gender === 'male' ? 'Мужской' : 'Женский'}
        </Typography>
        <Typography color="textSecondary">
          Дата рождения: {date}
        </Typography>
      </CardContent>

      <CardActions>
        <MemberUpdate id={values.id} />
        <Button
          color="secondary"
          component={Link}
          to={PATH.STAFF_LIST}
          onClick={() => deleteMemberHandler(values.id)}
          fullWidth>Удалить</Button>
      </CardActions>
    </Card>
  )
}
