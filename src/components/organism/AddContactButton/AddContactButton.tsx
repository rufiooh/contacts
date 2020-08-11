import React, { useState, useEffect } from 'react'
import { css, cx } from 'emotion'
import AddIcon from '@material-ui/icons/Add'
import { Link } from 'react-router-dom'

export interface Props {
    className?: string;
}

const AddContactButton: React.FC<Props> = ( { className } ) => {
    const stylez = css`

        background: #9dbaa9;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        margin-top: 16px;
        cursor: pointer;
        transition: background-color 0.1s;
        color: black;

        &:hover {
            background: #c4efd6;
        }

    `

    return (
        <Link to='/contact/add' className={ cx( className, stylez, 'add_contact_button' ) }>
            <AddIcon />
        </Link>
    )
}

export default AddContactButton
