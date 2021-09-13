import React from 'react'
import { Button } from '@material-ui/core'
import { ModalWindow } from './UI/ModalWindow'
import { IFormInput, MemberForm } from './UI/MemberForm'
import { SubmitHandler } from 'react-hook-form'
import staff from '../store/staff'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { observer } from 'mobx-react-lite'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(2, 0)
    }
  })
)

type MemberUpdateType = {
  id: string
}

export const MemberUpdate: React.FC<MemberUpdateType> = observer(props => {
  const classes = useStyles()

  const {id} = props

  const [open, setOpen] = React.useState<boolean>(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit: SubmitHandler<IFormInput> = data => {
    staff.updateMember(id, data)
  }

  return (
    <>
      <Button className={classes.button} type="button" onClick={handleOpen} fullWidth>
        Редактировать
      </Button>
      <ModalWindow open={open} handleClose={handleClose}>
        <MemberForm onSubmit={onSubmit} formLabel="Добавление сотрудника" formDefaultValues={staff.currentMember} />
      </ModalWindow>
    </>
  )
})
