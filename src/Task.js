import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
  root: {
    cursor: 'move',
    margin: '0.5rem 0',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  date: {
    width: '10rem',
    marginLeft: '1rem',
    marginRight: '1rem',
  },
  title: {
    marginLeft: '1rem',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
}));

const Task = ({
  id,
  title,
  desc,
  moveTask,
  editTitle,
  editDesc,
  delTask,
  date,
  changeDate,
  changeExp,
  exp,
  backgroundColor
}) => {

  const classes = useStyles()

  let ref = useRef(null)
  const [, drop] = useDrop({
    accept: 'task',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      if (item.id === id) {
        return
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (item.id < id && hoverClientY < hoverMiddleY) {
        return
      }
      if (item.id > id && hoverClientY > hoverMiddleY) {
        return
      }
      moveTask(item.id, id)
      item.id = id
    },
  })
  const [{ opacity }, drag] = useDrag({
    item: { type: 'task', id },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0 : 1
    }),
  })


  drag(drop(ref))

  return (

    <ExpansionPanel ref={ref} className={classes.root} expanded={exp} style={{ backgroundColor, opacity }} >
      <ExpansionPanelSummary className={classes.heading} >
        <Button onClick={changeExp.bind(this, id, exp)}>
          {exp ? <ChevronRightIcon /> : <ExpandMoreIcon />}
        </Button>
        <TextField
          placeholder="Write the new task title"
          onFocus={event => event.stopPropagation()}
          onChange={editTitle.bind(this, id)}
          value={title}
          margin="normal"
          className={classes.title}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            value={date}
            onFocus={event => event.stopPropagation()}
            onChange={changeDate.bind(this, id)}
            animateYearScrolling
            autoOk
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            className={classes.date}
          />

        </MuiPickersUtilsProvider>

        <Button
          onClick={delTask.bind(this, id)}
          color="secondary"
        >
          <CloseIcon />
        </Button>

      </ExpansionPanelSummary>

      {exp && <ExpansionPanelDetails className={classes.secondaryHeading}>
        <TextField
          placeholder="and description"
          onChange={editDesc.bind(this, id)}
          value={desc}
          multiline
          fullWidth
        />
      </ExpansionPanelDetails>}
    </ExpansionPanel>


  )
}
export default Task
