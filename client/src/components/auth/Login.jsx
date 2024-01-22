import React from 'react'
import { loginUser } from '../../services/api'
import { Navigate } from 'react-router-dom'
import { useState } from 'react'
import { connect } from 'react-redux'
import { loginSuccess, loginFail } from '../../actions/authActions'

function Login({ loginSuccess, loginFail }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const handleChange = async (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const handleLogin = async () => {
        try{
            setLoading(true)
            const res  = await loginUser(formData)
            if (res.status === 200){
                console.log('Login successful!')
                // console.log(res.headers)
                loginSuccess(res.data)
                setError(null)
                setLoggedIn(true)
            } else{
                console.log('Error: ', res.data)
                setError(res.data)
                loginFail(res)
            }
        } catch (error){
            console.error('Login error:', error)
        } finally {
            setLoading(false)
        }
    }
  return (
    <>
    {loggedIn && <Navigate to='/' />}
    <div className='flex flex-col max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md'>
        <h2 className='text-2xl font-semibold mb-4'>Login</h2>
        <input 
        type='text' 
        name='email' 
        placeholder='Email' 
        onChange={handleChange}
        className='w-full mb-4 p-2 border border-gray-300 rounded focus:border-blue-400 focus:outline-none' 
        />
        <input 
        type='password'
        name='password'
        placeholder='Password'
        onChange={handleChange}
        className='w-full mb-4 p-2 border border-gray-300 rounded focus:border-blue-400 focus:outline-none'
        />
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleLogin}>{loading ? 'Logging in...': 'Login'}</button>     
        {error && <p className='text-red-500 m-auto mt-4'>{error}</p>} 
    </div>
    </>
  )
}
const mapDispatchToProps = (dispatch) => ({
    loginSuccess: (user) => dispatch(loginSuccess(user)),
    loginFail: (error) => dispatch(loginFail(error)),
  });
// export default Login

export default connect(null, mapDispatchToProps)(Login);

