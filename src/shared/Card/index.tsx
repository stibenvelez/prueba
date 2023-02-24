import React from 'react'

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card = ({ children, ...res }: CardProps) => {
    return (
        <div className={`bg-white p-4 shadow rounded-lg ${res.className}`}>
            {children}
        </div>
    );
};

export default Card
