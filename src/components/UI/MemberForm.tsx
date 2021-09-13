import React, { useMemo } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Controller, useForm } from 'react-hook-form'
import { EmploymentType, GenderType, MemberType, PostType } from '../../utils/models'
import { DatePicker } from '@material-ui/pickers'
import { toDate } from 'date-fns'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    form: {
      '& > *': {
        margin: theme.spacing(1, 0),
      }
    }
  })
)

type MemberFormType = {
  formLabel: string
  onSubmit: any
  formDefaultValues?: MemberType
}

export interface IFormInput {
  fullName: string
  gender: GenderType
  post: PostType
  employment: EmploymentType
  birthDate: Date
}

export const MemberForm: React.FC<MemberFormType> = props => {
  const classes = useStyles()
  const {formLabel, onSubmit, formDefaultValues} = props

  const {control, handleSubmit} = useForm<IFormInput>({
    defaultValues: useMemo(() => {
      return {
        fullName: formDefaultValues?.fullName,
        post: formDefaultValues?.post,
        employment: formDefaultValues?.employment,
        gender: formDefaultValues?.gender,
        birthDate: toDate(formDefaultValues ? formDefaultValues.birthDate : new Date())
      }
    }, [formDefaultValues])
  })

  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom>
        {formLabel}
      </Typography>

      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>

        <Controller
          name="fullName"
          control={control}
          render={({field}) => <TextField
            {...field}
            label="Фамилия Имя Отчество"
            variant="outlined"
            fullWidth
          />}
        />

        <Controller
          name="gender"
          control={control}
          render={({field}) => <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">Пол</InputLabel>
            <Select
              {...field}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Пол"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'male'}>Мужской</MenuItem>
              <MenuItem value={'female'}>Женский</MenuItem>
            </Select>
          </FormControl>}
        />

        <Controller
          name="post"
          control={control}
          render={({field}) => <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">Должность</InputLabel>
            <Select
              {...field}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Должность"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'QA'}>QA</MenuItem>
              <MenuItem value={'DevOps'}>DevOps</MenuItem>
              <MenuItem value={'1C'}>1C</MenuItem>
              <MenuItem value={'SEO'}>SEO</MenuItem>
              <MenuItem value={'Back-end'}>Back-end</MenuItem>
              <MenuItem value={'Front-end'}>Front-end</MenuItem>
              <MenuItem value={'SMM'}>SMM</MenuItem>
              <MenuItem value={'UX/UI'}>UX/UI</MenuItem>
            </Select>
          </FormControl>}
        />

        <Controller
          name="employment"
          control={control}
          render={({field}) => <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">Занятость</InputLabel>
            <Select
              {...field}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Занятость"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'full'}>Полная</MenuItem>
              <MenuItem value={'part'}>Частичная</MenuItem>
            </Select>
          </FormControl>}
        />

        <Controller
          name="birthDate"
          control={control}
          render={({field}) => <DatePicker
            {...field}
            format={'d MMM yyyy'}
            cancelLabel={'Отмена'}
            fullWidth
          />}
        />

        <Button type="submit" fullWidth>
          Сохранить
        </Button>

      </form>
    </div>
  )
}
