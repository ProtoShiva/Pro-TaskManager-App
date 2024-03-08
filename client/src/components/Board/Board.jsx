import React from "react"
import { FaPlus } from "react-icons/fa"
import { BiWindows } from "react-icons/bi"
import { useDispatch } from "react-redux"
import { setShowCheckPopup } from "../../redux/popUp/popUpSlice"
import Styles from "./Board.module.css"
import TodoPopUp from "../TodoPopUp/TodoPopUp"
const Board = ({ name }) => {
  const dispatch = useDispatch()
  return (
    <div className={Styles.board}>
      <div className={Styles.top}>
        <p className={Styles.title}>{name}</p>
        {name === "To do" && (
          <FaPlus
            onClick={() => dispatch(setShowCheckPopup(true))}
            className={Styles.collapse}
          />
        )}
        <BiWindows className={Styles.collapse} />
      </div>
      <div className={`${Styles.cards} ${Styles.scroll}`}></div>
      <TodoPopUp />
    </div>
  )
}

export default Board
