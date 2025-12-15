import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const AdminRoute = ({children}) => {
const { loading}=useAuth();
const {role, roleLoading}=useRole();

if(loading || roleLoading){
    return <h1>Loading</h1>
}

if(role !== 'admin'){
    return <h1>Access is Forbidden</h1>
}
    return children
};

export default AdminRoute;