import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { verifyToken } from '../services/auth';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verify = async () => {
            const valid = await verifyToken();
            setIsVerified(valid);
            setIsLoading(false);
        };
        verify();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isVerified) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProtectedRoute; 