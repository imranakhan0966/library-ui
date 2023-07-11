import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-blue-200 font-ubuntu">
      {children}
    </div>
  );
};

export default AuthLayout;
