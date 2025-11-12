import { useState } from 'react'
import React from 'react';
import ConectaEnsino from './components/ConectaEnsino';
import { AuthProvider } from './contexts/AuthContext';
import './App.css'

function App() {
  return (
    <AuthProvider>
      <ConectaEnsino />
    </AuthProvider>
  );
}

export default App;