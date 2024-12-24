import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import { resetPasswordWithToken, validateToken } from '../services/AuthService'; // Replace with actual service functions
import './forgotPassword.css'; // Use the same CSS for consistency

const ResetPassword = () => {
    const { token } = useParams(); // Get token from the URL params
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isTokenValid, setIsTokenValid] = useState(true); // Track token validity
    const navigate = useNavigate(); // Use navigate for redirection

    useEffect(() => {
        // Validate token when the component is mounted
        if (token) {
            validateToken(token)
                .then((isValid) => {
                    if (!isValid) {
                        setIsTokenValid(false); // Set to false if token is invalid
                        toast.error('Invalid or expired token. Please request a new password reset.');
                        navigate('/login'); // Redirect to login page
                    }
                })
                .catch((err) => {
                    console.error('Error during token validation:', err);
                    setIsTokenValid(false);
                    toast.error('Error validating token. Please try again.');
                    navigate('/login');
                });
        } else {
            setIsTokenValid(false); // If no token is provided, mark it as invalid
            toast.error('No token provided. Please request a password reset.');
            navigate('/login'); // Redirect to login page
        }
    }, [token, navigate]);

    // Validate form fields
    const validate = () => {
        if (!newPassword || !confirmPassword) {
            setError('Both password fields are required.');
            return false;
        } else if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return false;
        }
        return true;
    };

    // Handle password reset submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate() && isTokenValid) {
            resetPasswordWithToken(token, newPassword)
                .then(() => {
                    toast.success('Password has been successfully reset.');
                    navigate('/login'); // Redirect to login after successful reset
                })
                .catch((err) => {
                    console.error('Error during password reset:', err);
                    toast.error('Unable to reset password. Please try again.');
                });
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Reset Your Password</h2>
            <p>Enter your new password below</p>
            <form onSubmit={handleSubmit}>
                {/* New Password Input */}
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={error ? 'input-error' : ''}
                        disabled={!isTokenValid} // Disable if token is invalid
                    />
                </div>

                {/* Confirm Password Input */}
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={error ? 'input-error' : ''}
                        disabled={!isTokenValid} // Disable if token is invalid
                    />
                </div>

                {/* Error Message */}
                {error && <span className="error-text">{error}</span>}

                {/* Submit Button */}
                <button type="submit" className="reset-button" disabled={!isTokenValid}>
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
