import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center space-x-2 h-screen bg-white">
        <div className="w-4 h-4 rounded-full animate-pulse bg-indigo-400"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-indigo-400"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-indigo-400"></div>
    </div>
    );
};

export default Loading;