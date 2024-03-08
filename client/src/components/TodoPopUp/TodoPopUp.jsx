import Styles from "./TodoPopUp.module.css"
import { FaPlus } from "react-icons/fa6"
import { MdDelete } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { setShowCheckPopup } from "../../redux/popUp/popUpSlice"
import axios from "axios"
import { useState } from "react"

const TodoPopUp = () => {
  const [inputs, setInputs] = useState([])
  const [duedate, setDuedate] = useState(null)
  const showCheckPopup = useSelector((state) => state.Popup.showCheckPopup)
  const dispatch = useDispatch()

  if (!showCheckPopup) {
    return null
  }
  const addInput = () => {
    const newInput = {
      id: Math.random().toString(36).substring(2, 15),
      value: "",
      checked: false
    }

    setInputs([...inputs, newInput])
  }
  const handleCheckboxChange = (event, inputId) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === inputId
          ? { ...input, checked: event.target.checked }
          : input
      )
    )
  }
  const handleChange = (event, inputId) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === inputId
          ? {
              ...input,
              value: event.target.value
            }
          : input
      )
    )
  }

  const addNewCard = () => {
    dispatch(setShowCheckPopup(false))
  }

  return (
    <div className={Styles.main}>
      <div className={Styles.popup_inner}>
        <div className={Styles.title}>
          <p>
            Title <span>*</span>
          </p>
          <input type="text" placeholder="Enter Task Title" />
        </div>
        <div className={Styles.priority}>
          <p className={Styles.priorityTitle}>
            Select Priority <span>*</span>
          </p>
          <div className={Styles.priorityName}>
            <span>&bull;</span> <p>HIGH PRIORITY</p>
          </div>
          <div className={Styles.priorityName}>
            <span id={Styles.mop}>&bull;</span> <p>MODERATE PRIORITY</p>
          </div>
          <div className={Styles.priorityName}>
            <span id={Styles.lop}>&bull;</span> <p>LOW PRIORITY</p>
          </div>
        </div>
        <div className={Styles.CheckTitle}>
          <p>
            Checklist (0/0) <span>*</span>
          </p>
        </div>

        <div className={Styles.checklist}>
          {inputs.map((input) => (
            <div className={Styles.inputs}>
              <div className={Styles.input_two}>
                <input
                  type="checkbox"
                  checked={input.checked}
                  onChange={(event) => handleCheckboxChange(event, input.id)}
                />
                <input
                  className={Styles.mainInput}
                  type="text"
                  value={input.value}
                  onChange={(event) => handleChange(event, input.id)}
                  placeholder="Enter value..."
                />
              </div>
              <div className={Styles.deleteBtn}>
                <MdDelete />
              </div>
            </div>
          ))}
        </div>
        <div className={Styles.checkInput} onClick={addInput}>
          <FaPlus />
          <p>Add New</p>
        </div>
        <div className={Styles.todo_footer}>
          <div id={Styles.date}>
            <input type="date" value={duedate} />
          </div>
          <div>
            <p
              id={Styles.cancel}
              onClick={() => dispatch(setShowCheckPopup(false))}
            >
              Cancel
            </p>
            <p id={Styles.save} onClick={addNewCard}>
              Save
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TodoPopUp
