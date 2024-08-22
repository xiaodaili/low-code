import React from 'react';

interface HeaderProps {
    title: string,
    className?: string,
}

function Header(props: HeaderProps) {
    const {className, title} = props;
    return (
        <div className={className} >
            {title}
        </div>
    );
}

export default Header;