import update from 'immutability-helper'




const ADD_TASK = 'ADD-TASK'
const MOVE_TASK = 'MOVE-TASK'
const EDIT_TITLE = 'EDIT-TITLE'
const EDIT_DESK = 'EDIT-DESK'
const DEL_TASK = 'DEL-TASK'
const CHANGE_DATE = 'CHANGE-DATE'
const CHANGE_EXP = 'CHANGE-EXP'


let fakeAPI = {
  tasks: [
    {
      id: 0,
      title: 'Zero a cool',
      desc: 'This is description. Lorem ipsum ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ',
      date: '04/27/2020',
      expanded: false,
      color: 'white',
    },
    {
      id: 1,
      title: 'Write a cool JS',
      desc: 'This is description. Lorem ipsum ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ',
      date: '03/28/2020',
      expanded: false,
      color: 'white',
    },
    {
      id: 2,
      title: 'Make it generic enough',
      desc: 'This is description. Lorem ipsum ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ',
      date: '04/30/2020',
      expanded: false,
      color: 'white',
    },
    {
      id: 3,
      title: 'Write README',
      desc: 'This is description. Lorem ipsum ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ipsum  ',
      date: '04/20/2020',
      expanded: false,
      color: 'white',
    }
  ]
}



const taskReducer = (state = fakeAPI, action) => {
  let stateCopy = {
    ...state,
    tasks: [...state.tasks]
  }

  const now = new Date()
  const d = now.getDate()
  const d3 = now.getDate() + 3
  const m = now.getMonth() + 1
  const y = now.getFullYear()
  const today = (m <= 9 ? '0' + m : m) + '/' + (d <= 9 ? '0' + d : d) + '/' + y
  const date3 = (m <= 9 ? '0' + m : m) + '/' + (d3 <= 9 ? '0' + d3 : d3) + '/' + y
  const yellow = 'LemonChiffon'
  const red = 'LightCoral'
  const white = 'HoneyDew'

  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [
          {
            id: Math.floor(Math.random() * 1000),
            title: '',
            desc: '',
            date: today,
            expanded: false,
            color: yellow
          }, ...state.tasks]
      }

    case MOVE_TASK:      
      return {
        ...state,
        tasks: update(stateCopy.tasks, {
          $splice: [
            [action.itemId, 1],
            [action.id, 0, stateCopy.tasks[action.itemId]],
          ],
        })
      }

    case EDIT_TITLE:
      return {
        ...state,
        tasks: stateCopy.tasks.map((t, stateIndex) => {
          if (stateIndex.toString() === action.id.toString()) {
            return { ...t, title: action.title.target.value }
          }
          return t
        })
      }

    case EDIT_DESK:
      return {
        ...state,
        tasks: stateCopy.tasks.map((t, stateIndex) => {
          if (stateIndex.toString() === action.id.toString()) {
            return { ...t, desc: action.desc.target.value }
          }
          return t
        })
      }

    case DEL_TASK:
      stateCopy.tasks.splice(action.id, 1)
      return stateCopy

    case CHANGE_DATE:
      return {
        ...state,
        tasks: stateCopy.tasks.map((t, stateIndex) => {
          if (stateIndex.toString() === action.id.toString()) {
            if (today > action.d) {
              return { ...t, date: action.d, color: red }
            }
            if ((date3 > action.d)) {
              return { ...t, date: action.d, color: yellow }
            }
            return { ...t, date: action.d, color: white }

          }
          return t
        })
      }

    case CHANGE_EXP:
      return {
        ...state,
        tasks: stateCopy.tasks.map((t, stateIndex) => {
          if (stateIndex.toString() === action.id.toString() && action.exp === false) {
            return { ...t, expanded: true }
          }
          return { ...t, expanded: false }
        })
      }

    default:
      return {
        ...state,
        tasks: stateCopy.tasks.map((t) => {
          if (today > t.date) {
            return { ...t, color: red }
          }
          if (date3 > t.date) {
            return { ...t, color: yellow }
          }
          return t
        })
      }
  }

}



export const addTask = (title, desc, date, exp) => ({ type: ADD_TASK, title, desc, date, exp })

export const moveTask = (itemId, id) => ({ type: MOVE_TASK, itemId, id })

export const editTitle = (id, title) => ({ type: EDIT_TITLE, id, title })

export const editDesc = (id, desc) => ({ type: EDIT_DESK, id, desc })

export const delTask = (id) => ({ type: DEL_TASK, id })

export const changeDate = (id, date, d) => ({ type: CHANGE_DATE, id, date, d })

export const changeExp = (id, exp) => ({ type: CHANGE_EXP, id, exp })


export default taskReducer