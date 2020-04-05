import { addTask, moveTask, editTitle, editDesc, delTask, changeDate, changeExp } from './redux/task-reducer'
import Manager from './Manager'
import { connect } from 'react-redux'

let mapStateToProps = (state) => ({ tasks: state.tasks })

export default connect(mapStateToProps, { addTask, moveTask, editTitle, editDesc, delTask, changeDate, changeExp })(Manager)

