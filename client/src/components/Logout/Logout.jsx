import Styles from "./Logout.module.css"
import { setShowLogPopup } from "../../redux/popUp/popUpSlice"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess
} from "../../redux/user/userSlice"
const Logout = () => {
  const showLogPopup = useSelector((state) => state.Popup.showLogPopup)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    dispatch(setShowLogPopup(false))
    try {
      dispatch(signOutUserStart())
      const res = await axios.get("/api/auth/logout")
      if (res.data.success === false) {
        dispatch(signOutUserFailure(res.data.message))
        return
      }
      dispatch(signOutUserSuccess(res.data))
    } catch (error) {
      dispatch(signOutUserFailure(error.res.data.message))
    }
    // axios
    //   .post("/api/auth/logout")
    //   .then(() => {
    //     navigate("/")
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  }
  if (!showLogPopup) {
    return null
  }

  return (
    <div className={Styles.main}>
      <div className={Styles.popup_inner}>
        <p>Are you sure you want to Logout?</p>
        <div>
          <p id={Styles.logout} onClick={handleLogout}>
            Yes, Logout
          </p>
          <p
            id={Styles.cancel}
            onClick={() => dispatch(setShowLogPopup(false))}
          >
            Cancel
          </p>
        </div>
      </div>
    </div>
  )
}

export default Logout
