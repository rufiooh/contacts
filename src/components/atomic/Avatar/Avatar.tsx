import React, { useState, useEffect } from 'react'
import { css, cx } from 'emotion'
import AddIcon from '@material-ui/icons/Add'

export interface Props {
    className?: string;
    name: string
    imageSrc?: string
    small?: boolean
    add?: boolean
}

const Avatar: React.FC<Props> = ( {
    className,
    name,
    imageSrc,
    small,
    add,
} ) => {
    const stylez = css`

        background-size: cover;
        border-radius: 50%;
        width: ${ small ? 36 : 120 }px;
        height: ${ small ? 36 : 120 }px;
        font-size: ${ small ? 20 : 60 }px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        border: 1px solid rgba( 0,0,0,0.4 );
        color: rgba( 0,0,0,0.4 );

        svg {
            font-size: 2.5rem;
        }

    `

    const specificStyles = {
        backgroundImage: `url(${ imageSrc })`,
    }

    return (
        <div className={ cx( className, stylez ) } style={ specificStyles }>
            { add && !imageSrc ? <AddIcon /> : !imageSrc && name.substr( 0, 1 ).toUpperCase() }
        </div>
    )
}

export default Avatar
