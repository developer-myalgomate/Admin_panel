import React from 'react'
import { CAvatar, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilAccountLogout } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { axios_post } from '../../api/axiosInstance'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()

  // const handleLogout = async () => {
  //   try {
  //     // const refreshToken = localStorage.getItem('refreshToken')
  //     const user = JSON.parse(localStorage.getItem('user'))

  //     await axios_post('/Auth/logout', {
  //       // refreshToken,
  //       schoolCode: user?.schoolCode,
  //     })

  //     toast.success('Logged out successfully')
  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     localStorage.removeItem('token')
  //     // localStorage.removeItem('refreshToken')
  //     localStorage.removeItem('user')
  //     localStorage.removeItem('role')

  //     navigate('/login', { replace: true })
  //   }
  // }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>

      {/* <CDropdownMenu placement="bottom-end">
        <CDropdownItem onClick={handleLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu> */}
    </CDropdown>
  )
}

export default AppHeaderDropdown
