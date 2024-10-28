'use client';
import React, { ReactNode } from 'react';

type AuthProviderProps = {
    children: ReactNode;
};

const AuthProvider = ({children}: AuthProviderProps) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default AuthProvider;