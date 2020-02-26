import React from 'react';
import { render } from 'react-dom';

function Header(props) {
    //console.log(this.props);
        return (<h1>{props.title}</h1>);  
}

export default Header;