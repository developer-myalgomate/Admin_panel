import React, { useEffect, useState } from 'react'
import { CRow, CCol, CCard, CCardBody, CSpinner } from '@coreui/react'
import {
  cilPeople,
  cilEducation,
  cilLibrary,
  cilUser,
  cilMoney,
  cilChartPie,
  cilBook,
  cilBusAlt,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { axios_get } from '../../../api/axiosInstance'

const Dashboard = () => {
  const [loading, setLoading] = useState(true)

  const [dashboard, setDashboard] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    totalParents: 0,
    totalFeeCollected: 0,
    attendancePercentage: 0,
    totalBooks: 0,
    totalVehicles: 0,
  })

  const getDashboard = async () => {
    try {
      const res = await axios_get('/Dashboard')

      if (res.success) {
        setDashboard(res.data)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDashboard()
  }, [])

  const cards = [
    {
      title: 'Students',
      value: dashboard.totalStudents,
      icon: cilPeople,
      color: 'primary',
    },
    {
      title: 'Teachers',
      value: dashboard.totalTeachers,
      icon: cilEducation,
      color: 'success',
    },
    {
      title: 'Classes',
      value: dashboard.totalClasses,
      icon: cilLibrary,
      color: 'warning',
    },
    {
      title: 'Parents',
      value: dashboard.totalParents,
      icon: cilUser,
      color: 'info',
    },
    {
      title: 'Fee Collected',
      value: `₹${dashboard.totalFeeCollected}`,
      icon: cilMoney,
      color: 'danger',
    },
    {
      title: 'Attendance',
      value: `${dashboard.attendancePercentage}%`,
      icon: cilChartPie,
      color: 'primary',
    },
    {
      title: 'Library Books',
      value: dashboard.totalBooks,
      icon: cilBook,
      color: 'success',
    },
    {
      title: 'Vehicles',
      value: dashboard.totalVehicles,
      icon: cilBusAlt,
      color: 'warning',
    },
  ]

  if (loading) {
    return (
      <div className="text-center mt-5">
        <CSpinner color="primary" />
      </div>
    )
  }

  return (
    <>
      <CCard className="mb-4 border-0 bg-primary text-white">
        <CCardBody>
          <h3>Welcome to School ERP</h3>
          <p className="mb-0">School Management Dashboard</p>
        </CCardBody>
      </CCard>

      <CRow>
        {cards.map((item, index) => (
          <CCol lg={3} md={6} sm={12} key={index} className="mb-4">
            <CCard className="shadow-sm h-100">
              <CCardBody className="text-center">
                <CIcon icon={item.icon} size="xxl" className={`text-${item.color} mb-3`} />

                <h2>{item.value}</h2>

                <h6 className="text-medium-emphasis">{item.title}</h6>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </>
  )
}

export default Dashboard
