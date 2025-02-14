import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { verifyToken } from '../services/auth';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, fallback }) => {
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
        return fallback || <Navigate to="/login" />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    fallback: PropTypes.node
};

export default ProtectedRoute;
