import { createContext, useEffect, useState } from "react"
import axios from "axios"
export const UserContext = createContext({})
export function UserContextProvider({ children }) {
  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState("")
  const [duedate, setDuedate] = useState(null)
  const [inputs, setInputs] = useState([])
  const [showCheckPopup, setShowCheckPopup] = useState(false)
  const [showLogPopup, setShowLogPopup] = useState(false)
  const [showDelPopup, setShowDelPopup] = useState(false)
  const [toDoCards, setToDoCards] = useState([])
  const [backlogCards, setBacklogCards] = useState([])
  const [inProgress, setInProgress] = useState([])
  const [check, setCheck] = useState(null)
  const [doneCards, setDoneCards] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [openDropdownId, setOpenDropdownId] = useState([])
  useEffect(() => {
    if (!check || loggedIn) {
      try {
        axios.get("/api/cards/allCards").then(({ data }) => {
          setCheck(data)
          setToDoCards(
            Object.values(data).filter((card) => card.status === "To Do")
          )
          setBacklogCards(
            Object.values(data).filter((card) => card.status === "BACKLOG")
          )
          setInProgress(
            Object.values(data).filter((card) => card.status === "PROGRESS")
          )
          setDoneCards(
            Object.values(data).filter((card) => card.status === "DONE")
          )
        })
      } catch (error) {
        console.log(error)
      }
    }
  }, [loggedIn])
  return (
    <UserContext.Provider
      value={{
        showCheckPopup,
        setShowCheckPopup,
        showLogPopup,
        setShowLogPopup,
        check,
        showDelPopup,
        setShowDelPopup,
        toDoCards,
        setToDoCards,
        backlogCards,
        setBacklogCards,
        inProgress,
        setInProgress,
        doneCards,
        setDoneCards,
        setTitle,
        setPriority,
        setDuedate,
        setInputs,
        title,
        priority,
        duedate,
        inputs,
        selectedId,
        setSelectedId,
        openDropdownId,
        setOpenDropdownId,
        setLoggedIn,
        loggedIn
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
