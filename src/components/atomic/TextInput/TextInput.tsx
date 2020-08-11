import React, { useState, useEffect } from 'react'
import { css, cx } from 'emotion'

export interface Props {

}

const TextInput: React.FC<Props & React.InputHTMLAttributes<HTMLInputElement>> = ( { className, ...rest } ) => {
    const stylez = css``

    return (
        <input type='text' className={ cx( className, stylez ) } { ...rest } />
    )
}

export default TextInput
