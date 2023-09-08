import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/UserContext/UserContext';
import Loading from '../pages/Loading/Loading';

const PrivateRoute = ({ children }) => {
    const { loading, user } = useContext(AuthContext)

    const location = useLocation()

    if (loading) {
        return (<Loading/>)
    }
    if (user) {
        return children;
    }
    return <Navigate to='/signin' state={{ from: location }} replace></Navigate>


};

export default PrivateRoute;