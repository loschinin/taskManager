import { createStore } from 'redux'
import taskReducer from './task-reducer'

let store = createStore(taskReducer)

window.store = store

export default store