import React from 'react'
import Task from './Task'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const Manager = (props) => {

  return (
    <>
      <Container maxWidth="sm">
        <div style={{ display: 'flex', justifyContent: 'center', margin: '0.5rem 0' }}>
          <Button size="large" variant="contained" color="primary" onClick={props.addTask}>
            ADD NEW TASK 
            <AddIcon />
          </Button>
        </div>

        <div>
          {props.tasks.map((t, i) => <Task
            key={t.id}
            id={i.toString()}
            title={t.title}
            desc={t.desc}
            moveTask={props.moveTask}
            editTitle={props.editTitle}
            editDesc={props.editDesc}
            delTask={props.delTask}
            date={t.date}
            changeDate={props.changeDate}
            changeExp={props.changeExp}
            exp={t.expanded}
            props={props}
            backgroundColor={t.color}
          />)}
        </div>
      </Container>
    </>
  )
}

export default Manager
