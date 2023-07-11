import React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import AppAlert from '../app-snackbar/AppSnackbar'

const AppLayout = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between bg-blue-200 font-ubuntu">
      <div>
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
