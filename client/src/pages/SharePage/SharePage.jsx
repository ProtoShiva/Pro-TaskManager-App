import React, { useContext } from "react"
import Styles from "./SharePage.module.css"
import { FiCodesandbox } from "react-icons/fi"
import { UserContext } from "../../context/UserContext"
import { format, parseISO, isPast } from "date-fns"
import { v4 as uuidv4 } from "uuid"

const SharePage = () => {
  const { status, title, priority, duedate, inputs } = useContext(UserContext)

  const handleCss = (p) => {
    switch (p) {
      case "HIGH PRIORITY":
        return Styles.highPriority
      case "MODERATE PRIORITY":
        return Styles.mediumPriority
      case "LOW PRIORITY":
        return Styles.lowPriority
      default:
        return {}
    }
  }

  const calcLen = () => {
    return inputs.filter((i) => {
      return i.checked === true
    })
  }
  return (
    <div className={Styles.main}>
      <div className={Styles.sidebar}>
        <p className={Styles.sidebar_logo}>
          <FiCodesandbox className={Styles.logo} />
          Pro Manage
        </p>
      </div>
      <div id={Styles.mycard} className={Styles.card}>
        <div className={Styles.card_top}>
          <div className={Styles.card_lables}>
            <div id={Styles.prior}>
              {" "}
              <span className={handleCss(priority)}>&bull;</span>
              <p>{priority}</p>
            </div>
          </div>
        </div>
        <div className={Styles.card_title}>{title}</div>
        <div className={Styles.scrolldrop}>
          <button className={Styles.dropdown}>
            Checklist ({calcLen().length}/{inputs.length}){" "}
          </button>
          <div>
            {
              <ul className={Styles.dropdownItems}>
                {inputs.map((item) => (
                  <div key={uuidv4()} className={Styles.items}>
                    <input
                      type="checkbox"
                      checked={item.checked}
                      className={Styles.checkbox}
                      readOnly
                    />
                    {item.value}
                  </div>
                ))}
              </ul>
            }
          </div>
        </div>
        {duedate && (
          <div className={Styles.footer_due}>
            <p>Due Date</p>
            <div
              className={`${Styles.date} ${
                typeof duedate === "string" && isPast(parseISO(duedate))
                  ? Styles.overdue
                  : ""
              } ${status === "DONE" ? Styles.doneCol : ""}`}
            >
              {typeof duedate === "string"
                ? format(parseISO(duedate), "MMM do")
                : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SharePage
