import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	// Funções de autenticação fictícias
	const login = (userData) => {
		setLoading(true);
		setTimeout(() => {
			setUser(userData);
			setLoading(false);
		}, 1000);
	};

	const logout = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
