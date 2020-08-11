import React, { useState, useEffect } from 'react'
import { css, cx } from 'emotion'

import Avatar from '@components/atomic/Avatar/Avatar'

export interface Props {
    className?: string;
    contact: ContactType
    onClick?: ( id ) => void
}

const ContactListItem: React.FC<Props> = ( {
    className,
    contact,
    onClick = () => null,
} ) => {
    const stylez = css`

        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 4px;

        &:hover {
            background-color: rgba( 0,0,0,0.2 );
            cursor: pointer;
        }

        .contact_avatar {
            flex: 0 0 50px;
        }

        .contact_name_number {

            text-align: left;

            .contact_name {

            }

            .contact_number {
                font-size: 0.75rem;
                color: rgba( 0, 0, 0, 0.4 );
            }
        }

    `

    const handleClick = () => {
        onClick( contact.id )
    }

    console.log( contact.imageSrc )

    return (
        <div className={ cx( className, stylez, 'contact_list_item' ) } onClick={ handleClick }>
            <div className='contact_avatar'>
                <Avatar small name={ contact.name } imageSrc={ contact.imageSrc } />
            </div>
            <div className='contact_name_number'>
                <div className='contact_name'>
                    { contact.name }
                </div>
                <div className='contact_number'>
                    { contact.number }
                </div>
            </div>
        </div>
    )
}

export default ContactListItem
