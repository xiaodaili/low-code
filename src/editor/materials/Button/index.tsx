import React from 'react';
import {Button as AntdButton} from "antd";

import {type ButtonType} from "antd/es/button";

export interface ButtonProps {
    type: ButtonType
    text: string
    id: number
}

function Button({type, text, id}: ButtonProps) {
    return (
        <AntdButton type={type} data-component-id={id}>{text}</AntdButton>
    );
}

export default Button;