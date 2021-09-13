import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {  Modal } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4)
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }),
)

type SimpleModalType = {
  children: React.ReactNode
  handleClose: () => void
  open: boolean
}

export const ModalWindow: React.FC<SimpleModalType> = props => {
  const classes = useStyles()

  const {children, open, handleClose} = props

  return (
    <div>

      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          {children}
        </div>
      </Modal>
    </div>
  )
}
