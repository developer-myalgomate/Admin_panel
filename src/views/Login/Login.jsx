import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { axios_post } from '../../api/axiosInstance'
import './login.scss'

function Login() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const handleLogin = async () => {
    if (!formData.username.trim()) {
      toast.error('Username is required')
      return
    }

    if (!formData.password.trim()) {
      toast.error('Password is required')
      return
    }

    try {
      setLoading(true)

      const response = await axios_post('/Auth/login', {
        username: formData.username.trim(),
        password: formData.password,
      })

      console.log('LOGIN RESPONSE:', response)

      if (response?.success && response?.data) {
        const loginData = response.data

        console.log('LOGIN DATA:', loginData)

        // -----------------------------------------
        // Save authentication
        // -----------------------------------------

        localStorage.setItem('token', loginData.token)

        localStorage.setItem('userId', String(loginData.id))

        localStorage.setItem('fullName', loginData.fullName || '')

        localStorage.setItem('email', loginData.email || '')

        localStorage.setItem('mobile', loginData.mobile || '')

        localStorage.setItem('username', loginData.username || '')

        localStorage.setItem('roleId', String(loginData.roleId))

        localStorage.setItem('role', loginData.role || '')

        localStorage.setItem('expiresAtUtc', loginData.expiresAtUtc || '')

        localStorage.setItem('user', JSON.stringify(loginData))

        console.log('TOKEN:', localStorage.getItem('token'))

        console.log('ROLE:', localStorage.getItem('role'))

        toast.success(response.message || 'Login Successful')

        // -----------------------------------------
        // IMPORTANT
        // -----------------------------------------

        window.location.href = '/dashboard'
      } else {
        toast.error(response?.message || 'Login Failed')
      }
    } catch (error) {
      console.error('LOGIN ERROR:', error)

      toast.error(error?.response?.data?.message || error?.message || 'Login Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back</h1>

        <p className="subtitle">Login to continue your trading journey</p>

        {/* Username */}
        <div className="form-group">
          <label htmlFor="username">Username</label>

          <input
            id="username"
            type="text"
            placeholder="Enter Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({
                ...formData,
                username: e.target.value,
              })
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLogin()
              }
            }}
            disabled={loading}
            autoComplete="username"
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLogin()
              }
            }}
            disabled={loading}
            autoComplete="current-password"
          />
        </div>

        {/* Login Button */}
        <button type="button" className="login-btn" onClick={handleLogin} disabled={loading}>
          {loading ? 'Please Wait...' : 'Login to Account'}
        </button>

        {/* Footer Links */}
        <div className="links">
          <a href="#">Terms & Conditions</a>

          <span>|</span>

          <a href="#">Privacy Policy</a>
        </div>

        <div className="footer-note">THIS APPLICATION IS FOR TRAINING PURPOSE ONLY.</div>
      </div>
    </div>
  )
}

export default Login
