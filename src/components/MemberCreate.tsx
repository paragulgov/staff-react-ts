import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { SubmitHandler } from 'react-hook-form'
import { ModalWindow } from './UI/ModalWindow'
import { IFormInput, MemberForm } from './UI/MemberForm'
import staff from '../store/staff'
import { observer } from 'mobx-react-lite'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(2, 0)
    }
  })
)

export const MemberCreate = observer(() => {
  const classes = useStyles()

  const [open, setOpen] = React.useState<boolean>(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit: SubmitHandler<IFormInput> = data => {
    staff.createMember(data)
  }

  return (
    <>
      <Button className={classes.button} type="button" onClick={handleOpen} fullWidth>
        Создать нового пользователя
      </Button>
      <ModalWindow open={open} handleClose={handleClose}>
        <MemberForm onSubmit={onSubmit} formLabel="Добавление сотрудника" />
      </ModalWindow>
    </>
  )
})
