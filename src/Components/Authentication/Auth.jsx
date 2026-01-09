import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    const toggleMode = () => {
        setIsSignUp((prev) => !prev);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            const payload = {
                email: formData.email,
                username: formData.username,
                full_name: formData.fullName,
                role: "teacher",
                password: formData.password
            };
            console.log('Sign Up Payload:', payload);
            // Simulate API call success
            navigate('/dashboard');
        } else {
            console.log('Sign In Attempt:', { email: formData.email, password: formData.password });
            // Simulate API call success
            navigate('/dashboard');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {/* Left Side - Illustration */}
                <div className={styles.illustrationSection}>
                    <div className={styles.illustrationContent}>
                        <h2>{isSignUp ? 'Join NACOS' : 'Welcome to NACOS'}</h2>
                        <p>
                            {isSignUp
                                ? 'Knowledge for the Service of Humanity'
                                : 'Log in to access your student portal.'}
                        </p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className={styles.formSection}>
                    <div className={styles.header}>
                        <h1>{isSignUp ? 'NACOS University Connect' : 'University Connect Login'}</h1>
                        <p>{isSignUp ? 'Enter details to register your account' : 'Welcome back! Please enter your details'}</p>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        {isSignUp && (
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Enter your Name"
                                    className={styles.input}
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <div className={styles.inputGroup}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your Email"
                                className={styles.input}
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {isSignUp && (
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Enter your Username"
                                    className={styles.input}
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <div className={styles.inputGroup}>
                            <input
                                type="password"
                                name="password"
                                placeholder="Create Password"
                                className={styles.input}
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            {isSignUp ? 'Sign up' : 'Sign in'}
                        </button>
                    </form>

                    <div className={styles.divider}>Or {isSignUp ? 'Signup' : 'Signin'} with</div>

                    <div className={styles.socialLogin}>
                        <button className={styles.socialBtn}>Google</button>
                        <button className={styles.socialBtn}>Facebook</button>
                    </div>

                    <div className={styles.toggleContainer}>
                        {isSignUp ? "Already have an account?" : "Don't have an account?"}
                        <span className={styles.toggleLink} onClick={toggleMode}>
                            {isSignUp ? 'Sign in' : 'Sign up'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
