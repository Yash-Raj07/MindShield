import './login.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from '../services/AuthService.jsx';
import { toast } from "sonner";

const RegisterForm = () => {
    const navigate = useNavigate();

    // State for form data
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // State for form errors
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // Handle input changes
    const handleInputChange = (field, value) => {
        setData((prevState) => ({
            ...prevState,
            [field]: value,
        }));

        // Clear the error for the specific field when the user starts typing
        setErrors((prevState) => ({
            ...prevState,
            [field]: '',
        }));
    };

    // Form validation
    const validateForm = () => {
        const validationErrors = {};
        let isValid = true;

        if (!data.name) {
            validationErrors.name = "Name is required.";
            isValid = false;
        }

        if (!data.email) {
            validationErrors.email = "Email is required.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            validationErrors.email = "Please enter a valid email address.";
            isValid = false;
        }

        if (!data.password) {
            validationErrors.password = "Password is required.";
            isValid = false;
        } else if (data.password.length < 6) {
            validationErrors.password = "Password must be at least 6 characters long.";
            isValid = false;
        }

        if (!data.confirmPassword) {
            validationErrors.confirmPassword = "Confirm Password is required.";
            isValid = false;
        } else if (data.password !== data.confirmPassword) {
            validationErrors.confirmPassword = "Passwords do not match.";
            isValid = false;
        }

        setErrors(validationErrors);
        return isValid;
    };

    // Handle form submission
    const submitForm = (event) => {
        event.preventDefault();

        if (validateForm()) {
            // If form is valid, call the register service
            register(data)
                .then(() => {
                    toast.success("Registered successfully!");
                    navigate("/login");
                })
                .catch((err) => {
                    console.error("Error during registration: ", err);
                    toast.error("An error occurred during registration. Please try again.");
                });
        } else {
            toast.error("Please fix the errors in the form.");
        }
    };

    return (
        <div className="login-container">
            <h2>Create an account</h2>
            <p>Enter your details below to create your account</p>

            <form onSubmit={submitForm}>
                {/* Name Input */}
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        className={errors.name ? 'input-error' : ''}
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                {/* Email Input */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
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
                        value={data.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Enter your password"
                        className={errors.password ? 'input-error' : ''}
                    />
                    {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                {/* Confirm Password Input */}
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirmPassword"
                        value={data.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder="Re-enter your password"
                        className={errors.confirmPassword ? 'input-error' : ''}
                    />
                    {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>

                <button type="submit" className="login-button">
                    Create account
                </button>
            </form>
            <p className="signup-text">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </div>
    );
};

export default RegisterForm;
