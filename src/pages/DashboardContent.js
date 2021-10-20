import React from 'react';
import { useParams } from 'react-router-dom';

const DashboardContent = () => {
    let { id } = useParams();

    return (
        <div>
            <h2>Dashboard Content</h2>
            <p>ID: {id}</p>
        </div>
    );
}

export default DashboardContent;