import React, { useState, useEffect, useContext } from 'react'
import { css, cx } from 'emotion'
import { sortBy as _sortBy } from 'lodash-es'
import { Link } from 'react-router-dom'

import ContactListItem from '@components/molecule/ContactListItem/ContactListItem'
import { ContactsContext } from '@root/context/ContactsContext'

export interface Props {
    className?: string;
}

const ContactList: React.FC<Props> = ( { className } ) => {
    const { displayedContacts } = useContext( ContactsContext )

    const [ shownContacts, setShownContacts ] = useState( [] )

    useEffect( () => {
        const sortedContacts = _sortBy( displayedContacts, contact => contact.name )
        setShownContacts( sortedContacts )
    }, [ displayedContacts ] )

    const stylez = css`

        height: 100%;
        overflow: auto;
        border-top: 1px solid rgba( 0,0,0.2 );
        border-bottom: 1px solid rgba( 0,0,0.2 );

        .no_contacts {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        a {
            text-decoration: none;
            color: black;

            .contact_list_item {
                border-bottom: 1px solid rgba( 0,0,0,0.2 );
            }
        }

        a:last-child {
            .contact_list_item {
                border-bottom: none;
            }
        }

    `

    return (
        <div className={ cx( className, stylez ) }>
            {
                shownContacts.map( ( contact ) => {
                    return (
                        <Link
                          key={ contact.id }
                          to={ `/contact/${ contact.id }/edit` }
                        >
                            <ContactListItem
                              contact={ contact }
                            />
                        </Link>
                    )
                } )
            }
            {
                !shownContacts.length && (
                    <div className='no_contacts'>
                        no contacts found..
                    </div>
                )
            }
        </div>
    )
}

export default ContactList
