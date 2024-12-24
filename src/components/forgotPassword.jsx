import { useState } from 'react';
import { toast } from 'sonner';
import { resetPassword } from '../services/AuthService.jsx'; // Replace with actual service function
import './forgotPassword.css';

const ForgotPassword = () => {
    // State for form inputs
    const [email, setEmail] = useState('');

    // State for form errors
    const [error, setError] = useState('');

    // Handle input change
    const handleInputChange = (value) => {
        setEmail(value);
        setError(''); // Clear the error when user starts typing
    };

    // Validate email field
    const validate = () => {
        if (!email) {
            setError('Email is required.');
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return false;
        }
        return true;
    };

    // Handle form submission
    const handleResetPassword = (e) => {
        e.preventDefault();

        if (validate()) {
            resetPassword({ email })
                .then(() => {
                    toast.success('Password reset link sent to your email.');
                })
                .catch((err) => {
                    console.error('Error during password reset:', err);
                    toast.error('Unable to send reset link. Please try again.');
                });
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password?</h2>
            <p>Enter your email below to reset your password</p>
            <form onSubmit={handleResetPassword}>
                {/* Email Input */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => handleInputChange(e.target.value)}
                        className={error ? 'input-error' : ''}
                    />
                    {error && <span className="error-text">{error}</span>}
                </div>

                {/* Reset Password Button */}
                <button type="submit" className="reset-button">
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
