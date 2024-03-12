import React, { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { useNavigate } from "react-router-dom"
import Styles from "./DeletePopup.module.css"
import axios from "axios"

const DeletePopup = ({ cardId }) => {
  const { showDelPopup, setShowDelPopup, refresh, setRefresh } =
    useContext(UserContext)

  const navigate = useNavigate()

  if (!showDelPopup) {
    return null
  }

  const handleDelete = async (id) => {
    try {
      setShowDelPopup(false)
      await axios.delete(`/api/cards/user_cards/${id}`).then(() => {
        setRefresh(!refresh)
      })

      navigate("/dashboard")
    } catch (error) {
      console.log("cannot delete card")
    }
  }
  return (
    <div className={Styles.main}>
      <div className={Styles.popup_inner}>
        <p>Are you sure you want to Delete?</p>
        <div>
          <p id={Styles.logout} onClick={() => handleDelete(cardId)}>
            Yes, Delete
          </p>
          <p id={Styles.cancel} onClick={() => setShowDelPopup(false)}>
            Cancel
          </p>
        </div>
      </div>
    </div>
  )
}

export default DeletePopup
