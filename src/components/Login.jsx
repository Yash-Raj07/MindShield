import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { login } from '../services/AuthService.jsx';
import { toast } from 'sonner';
import './login.css';

const LoginForm = () => {
    const navigate = useNavigate();

    // State for form inputs
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    // State for form errors
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    // Handle input changes
    const handleInputChange = (field, value) => {
        setData((prevState) => ({
            ...prevState,
            [field]: value,
        }));

        // Clear the error for the specific field when user starts typing
        setErrors((prevState) => ({
            ...prevState,
            [field]: '',
        }));
    };

    // Validate form fields
    const validate = () => {
        const newErrors = {};

        if (!data.email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (!data.password) {
            newErrors.password = 'Password is required.';
        } else if (data.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Form is valid if there are no errors
    };

    // Handle form submission
    const handleLogin = (e) => {
        e.preventDefault();

        if (validate()) {
            login(data)
                .then((resp) => {
                    const user = {
                        userId: resp.userId,
                        name: resp.name,
                        email: resp.email,
                    };
                    Cookies.set('user', JSON.stringify(user), { expires: 7, secure: true });
                    toast.success('User logged in successfully');
                    navigate('/contact');
                })
                .catch((err) => {
                    console.error('Error during login:', err);
                    toast.error('Invalid credentials. Please try again.');
                });
        }
    };

    return (
        <div className="login-container">
            <h2>Login to Your Account</h2>
            <p>Enter your email and password below to login to your account</p>
            <form onSubmit={handleLogin}>

                {/* Email Input */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={data.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? 'input-error' : ''}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                {/* Password Input */}
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={data.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={errors.password ? 'input-error' : ''}
                    />
                    {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                {/* Login Button */}
                <button type="submit" className="login-button">
                    Login
                </button>
            </form>

            {/* Sign Up Link */}
            <p className="signup-text">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </div>
    );
};

export default LoginForm;
