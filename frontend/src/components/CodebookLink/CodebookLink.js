import React from "react";
import "./CodebookLink.css";
function CodebookLink(props) {
    return (
        <a href={props.href} className="codebook-link">
            {props.children}
        </a>
    );
}
export default CodebookLink;
