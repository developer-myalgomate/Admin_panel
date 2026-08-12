import React from 'react'
import { CAvatar, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'

import CIcon from '@coreui/icons-react'

import { cilAccountLogout, cilUser, cilSettings } from '@coreui/icons'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()

  // -----------------------------------------
  // Get logged-in user information
  // -----------------------------------------

  const fullName = localStorage.getItem('fullName') || 'User'
  const username = localStorage.getItem('username') || ''
  const role = localStorage.getItem('role') || ''

  // -----------------------------------------
  // Profile
  // -----------------------------------------

  const handleProfile = () => {
    navigate('/dashboard/profile')
  }

  // -----------------------------------------
  // Settings
  // -----------------------------------------

  const handleSettings = () => {
    navigate('/dashboard/settings')
  }

  // -----------------------------------------
  // Logout
  // -----------------------------------------

  const handleLogout = () => {
    try {
      // Remove authentication
      localStorage.removeItem('token')

      // Remove user information
      localStorage.removeItem('userId')
      localStorage.removeItem('fullName')
      localStorage.removeItem('email')
      localStorage.removeItem('mobile')
      localStorage.removeItem('username')
      localStorage.removeItem('roleId')
      localStorage.removeItem('role')
      localStorage.removeItem('expiresAtUtc')
      localStorage.removeItem('user')

      toast.success('Logged out successfully')

      // Redirect to login
      navigate('/', {
        replace: true,
      })
    } catch (error) {
      console.error('LOGOUT ERROR:', error)

      toast.error('Logout failed')

      // Still redirect to login
      navigate('/', {
        replace: true,
      })
    }
  }

  return (
    <CDropdown variant="nav-item" placement="bottom-end">
      {/* ========================================= */}
      {/* AVATAR */}
      {/* ========================================= */}

      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>

      {/* ========================================= */}
      {/* DROPDOWN MENU */}
      {/* ========================================= */}

      <CDropdownMenu placement="bottom-end">
        {/* ========================================= */}
        {/* USER INFO */}
        {/* ========================================= */}

        <div className="px-3 py-2 border-bottom">
          <div className="fw-semibold">{fullName}</div>

          {username && <small className="text-body-secondary">@{username}</small>}

          {role && (
            <>
              <br />

              <small className="text-body-secondary">{role}</small>
            </>
          )}
        </div>

        {/* ========================================= */}
        {/* PROFILE */}
        {/* ========================================= */}

        <CDropdownItem as="button" type="button" onClick={handleProfile}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>

        {/* ========================================= */}
        {/* SETTINGS */}
        {/* ========================================= */}

        <CDropdownItem as="button" type="button" onClick={handleSettings}>
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>

        {/* Divider */}

        <hr className="dropdown-divider" />

        {/* ========================================= */}
        {/* LOGOUT */}
        {/* ========================================= */}

        <CDropdownItem as="button" type="button" onClick={handleLogout} className="text-danger">
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
