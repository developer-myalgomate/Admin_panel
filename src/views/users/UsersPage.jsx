import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { axios_get } from '../../api/axiosInstance'
import './UsersPage.scss'

function UsersPage() {
  const location = useLocation()
  const navigate = useNavigate()

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const loggedInRole = localStorage.getItem('role')
  const loggedInUserId = localStorage.getItem('userId')

  // -----------------------------------------
  // Target Role
  // -----------------------------------------

  const getTargetRoleInfo = () => {
    const path = location.pathname.toLowerCase()

    if (path.includes('super')) {
      return {
        roleId: 1,
        title: 'SUPER ADMIN',
        route: 'super',
      }
    }

    if (path.includes('sub-admin')) {
      return {
        roleId: 3,
        title: 'SUB ADMIN',
        route: 'sub-admin',
      }
    }

    if (path.includes('admin')) {
      return {
        roleId: 2,
        title: 'ADMIN',
        route: 'admin',
      }
    }

    if (path.includes('master')) {
      return {
        roleId: 4,
        title: 'MASTER',
        route: 'master',
      }
    }

    if (path.includes('client')) {
      return {
        roleId: 5,
        title: 'CLIENT',
        route: 'client',
      }
    }

    return {
      roleId: 5,
      title: 'CLIENT',
      route: 'client',
    }
  }

  const { roleId, title, route } = getTargetRoleInfo()

  // -----------------------------------------
  // Get Users
  // -----------------------------------------

  const fetchUsers = async () => {
    try {
      setLoading(true)

      let query = `roleId=${roleId}`

      if (loggedInUserId && roleId !== 1) {
        if (loggedInRole === 'Super Admin') {
          query += `&superAdminId=${loggedInUserId}`
        }

        if (loggedInRole === 'Admin') {
          query += `&adminId=${loggedInUserId}`
        }

        if (loggedInRole === 'SubAdmin') {
          query += `&subAdminId=${loggedInUserId}`
        }

        if (loggedInRole === 'Master') {
          query += `&masterId=${loggedInUserId}`
        }
      }

      const response = await axios_get(`/Users?${query}`)

      console.log('USER LIST RESPONSE:', response)

      if (response?.success) {
        setUsers(response.data || [])
      } else {
        setUsers([])
        toast.error(response?.message || 'Failed to load users')
      }
    } catch (error) {
      console.error('GET USERS ERROR:', error)

      toast.error(error?.response?.data?.message || error?.message || 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [location.pathname, roleId, loggedInRole, loggedInUserId])

  // -----------------------------------------
  // Search
  // -----------------------------------------

  const filteredUsers = users.filter((user) => {
    const value = search.toLowerCase()

    return (
      user.username?.toLowerCase().includes(value) ||
      user.fullName?.toLowerCase().includes(value) ||
      user.email?.toLowerCase().includes(value) ||
      user.mobile?.toLowerCase().includes(value)
    )
  })

  // -----------------------------------------
  // CREATE
  // -----------------------------------------

  const handleCreate = () => {
    navigate(`/dashboard/${route}/create`)
  }

  // -----------------------------------------
  // EDIT
  // -----------------------------------------

  const handleEdit = (user) => {
    navigate(`/dashboard/${route}/edit/${user.id}`)
  }

  return (
    <div className="users-page">
      {/* ================= HEADER ================= */}

      <div className="users-header">
        <div className="left-section">
          <button className="summary-btn">SUMMARY {title}</button>

          <button className="create-btn" onClick={handleCreate}>
            CREATE {title}
          </button>
        </div>
      </div>

      {/* ================= TOOLBAR ================= */}

      <div className="table-toolbar">
        <div className="record-box">
          RECORDS : <strong>{filteredUsers.length}</strong>
        </div>

        <div className="search-actions">
          <input
            type="text"
            placeholder={`Search ${title}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button>EXCEL</button>

          <button>PDF</button>
        </div>
      </div>

      {/* ================= TABLE ================= */}

      <div className="table-wrapper">
        {loading ? (
          <div className="table-loading">Loading...</div>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                {roleId >= 2 && <th>SUPER ADMIN</th>}

                {roleId >= 3 && <th>ADMIN</th>}

                {roleId >= 4 && <th>SUB ADMIN</th>}

                {roleId >= 5 && <th>MASTER</th>}

                <th>USERNAME</th>

                {roleId === 5 && <th>CREDIT</th>}

                {roleId >= 4 && <th>BOOKED</th>}

                {roleId >= 4 && <th>NET BOOKED</th>}

                {roleId === 4 && <th>SHARING</th>}

                <th>STATUS</th>

                <th>CREATED DATE</th>

                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="12" className="no-data">
                    No records found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((item) => (
                  <tr key={item.id}>
                    {roleId >= 2 && <td>{item.superAdminName || '-'}</td>}

                    {roleId >= 3 && <td>{item.adminName || '-'}</td>}

                    {roleId >= 4 && <td>{item.subAdminName || '-'}</td>}

                    {roleId >= 5 && <td>{item.masterName || '-'}</td>}

                    <td>{item.username || '-'}</td>

                    {roleId === 5 && <td>{item.credit ?? 0}</td>}

                    {roleId >= 4 && <td>{item.booked ?? 0}</td>}

                    {roleId >= 4 && <td>{item.netBooked ?? 0}</td>}

                    {roleId === 4 && <td>{item.sharing ?? 0}</td>}

                    <td>
                      <span className={`status ${item.isActive ? 'active' : 'inactive'}`}>
                        {item.isActive ? 'ACTIVE' : 'DEACTIVE'}
                      </span>
                    </td>

                    <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}</td>

                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(item)}>
                        EDIT
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default UsersPage
