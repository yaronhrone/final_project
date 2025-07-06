
import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import '../styels/coustomLink.css';
const CoustomLink = ({ to, children , ...rest}) => {
    const { pathname } = useResolvedPath(to);
    const isActive = useMatch({ path: pathname, end: true });
    return (
        <Link to={to} {...rest} className={`custom-link ${isActive ? "active" : ""}`}>
            {children}
        </Link>
    )
}

export default CoustomLink