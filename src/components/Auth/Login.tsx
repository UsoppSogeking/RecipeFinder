import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectIsLoading, selectError, setError } from '../../redux/slices/authSlice';
import { AppDispatch } from '../../redux/store';

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(setError(null));
        dispatch(login({email, password}));

        console.log('Logou');
        
        setEmail("");
        setPassword("");
    };

    return (
        <div className="w-[1200px] mx-auto bg-white dark:bg-dark-panel shadow-md rounded-lg p-6 mt-10">
            <form className="space-y-4 border border-orange-400 p-6 rounded-lg" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700 dark:text-dark-text-60">Login</h2>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-500 dark:text-dark-text-60">
                        E-mail
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 mt-1 text-sm border rounded-md bg-light-panel dark:bg-dark-panel outline-none text-gray-600 dark:text-dark-text-60"
                        placeholder="Enter your e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-500 dark:text-dark-text-60">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-3 py-2 mt-1 text-sm border rounded-md bg-light-panel dark:bg-dark-panel outline-none text-gray-600 dark:text-dark-text-60"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="w-full py-2 text-gray-600 dark:text-dark-text-60 rounded-md bg-react-color hover:opacity-90 focus:outline-none"
                    >
                        {isLoading ? 'Loading...' : 'Login'}
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
            </form>
        </div>
    )
}

export default Login;