import React from 'react';

export default function Dashboard () {
    const userId = localStorage.getItem('userId');
    
    return (
        <div>
            Hello from Dashboard
        </div>
    )
}