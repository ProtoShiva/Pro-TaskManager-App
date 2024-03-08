import React, { useState } from "react"
import Styles from "./Dashboard.module.css"
import Board from "../../components/Board/Board"
import { IoIosArrowDown } from "react-icons/io"
import { useSelector } from "react-redux"
import { format } from "date-fns"
const Dashboard = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const [datePopup, setDatePopup] = useState(false)
  const date = new Date()
  const formattedDate = format(date, "do MMM yyyy")
  return (
    <>
      <div className={Styles.container}>
        <nav>
          <h1>Welcome! {currentUser ? currentUser.firstName : "Guest"}</h1>
          <p>{formattedDate}</p>
        </nav>
        <div className={Styles.title}>
          <h2>Board</h2>
          <div className={Styles.title_left}>
            <p>This week</p>
            <IoIosArrowDown
              onClick={() => setDatePopup(!datePopup)}
              className={Styles.pointer}
            />
            {datePopup && (
              <div className={Styles.popup_inner}>
                <p className={Styles.pointer}>Today</p>
                <p className={Styles.pointer}>This Week</p>
                <p className={Styles.pointer}>This Month</p>
              </div>
            )}
          </div>
        </div>
        <div className={Styles.outer_boards}>
          <div className={Styles.boards}>
            <Board name="Backlog" />
            <Board name="To do" />
            <Board name="In Progress" />
            <Board name="Done" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
