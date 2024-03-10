import { useContext, useState } from "react"
import Styles from "./TodoPopUp.module.css"
import { UserContext } from "../../context/UserContext"
import { FaPlus } from "react-icons/fa6"
import { MdDelete } from "react-icons/md"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"

const TodoPopUp = () => {
  const {
    showCheckPopup,
    setShowCheckPopup,
    setTitle,
    setPriority,
    setDuedate,
    setInputs,
    title,
    priority,
    duedate,
    inputs,
    setSelectedId,
    selectedId,
    setLoggedIn,
    loggedIn
  } = useContext(UserContext)

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
    if (selectedId) {
      axios.put(`/api/cards/updatecard/${selectedId}`, {
        title,
        priority,
        duedate,
        inputs
      })
    } else {
      axios.post("/api/cards/newcards", {
        title,
        priority,
        duedate,
        inputs
      })
    }

    setSelectedId(null)
    setShowCheckPopup(false)
    setLoggedIn(!loggedIn)
  }

  const handleDelete = (idToDelete) => {
    setInputs(inputs.filter((input) => input.id !== idToDelete))
  }

  return (
    <div className={Styles.main}>
      <div className={Styles.popup_inner}>
        <div className={Styles.title}>
          <p>
            Title <span>*</span>
          </p>
          <input
            type="text"
            placeholder="Enter Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={Styles.priority}>
          <p className={Styles.priorityTitle}>
            Select Priority <span>*</span>
          </p>
          <div
            onClick={() => setPriority("HIGH PRIORITY")}
            className={`${Styles.priorityName} ${
              priority === "HIGH PRIORITY" ? Styles.selectedPriority : ""
            }`}
          >
            <span>&bull;</span> <p>HIGH PRIORITY</p>
          </div>
          <div
            onClick={() => setPriority("MODERATE PRIORITY")}
            className={`${Styles.priorityName} ${
              priority === "MODERATE PRIORITY" ? Styles.selectedPriority : ""
            }`}
          >
            <span id={Styles.mop}>&bull;</span> <p>MODERATE PRIORITY</p>
          </div>
          <div
            onClick={() => setPriority("LOW PRIORITY")}
            className={`${Styles.priorityName} ${
              priority === "LOW PRIORITY" ? Styles.selectedPriority : ""
            }`}
          >
            <span id={Styles.lop}>&bull;</span> <p>LOW PRIORITY</p>
          </div>
        </div>
        <div className={Styles.CheckTitle}>
          <p>
            Checklist (0/0) <span>*</span>
          </p>
        </div>
        <div className={Styles.checkInput} onClick={addInput}>
          <FaPlus />
          <p>Add New</p>
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
              <div
                className={Styles.deleteBtn}
                onClick={() => handleDelete(input.id)}
              >
                <MdDelete />
              </div>
            </div>
          ))}
        </div>
        <div id={Styles.date}>
          <DatePicker
            selected={duedate}
            onChange={(date) => setDuedate(date)}
            className={Styles.datePicker}
            dateFormat="MM/dd/yyyy"
            placeholderText="Select Due Date"
          />
        </div>
        <div className={Styles.todo_footer}>
          <div>
            <p id={Styles.cancel} onClick={() => setShowCheckPopup(false)}>
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
