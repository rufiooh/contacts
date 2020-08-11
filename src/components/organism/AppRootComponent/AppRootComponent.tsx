import React, { useState, useEffect, useContext } from 'react'
import { css, cx } from 'emotion'

import { ContactsContext } from '@root/context/ContactsContext'

import ContactList from '@components/organism/ContactList/ContactList'
import SearchBar from '@components/atomic/SearchBar/SearchBar'
import AddContactButton from '@components/organism/AddContactButton/AddContactButton'

export interface Props {
    className?: string;
}

const AppRootComponent: React.FC<Props> = ( { className } ) => {
    const { contacts, setDisplayedContacts } = useContext( ContactsContext )

    const handleSearch = ( searchText: string ) => {
        if ( !searchText.trim() ) {
            setDisplayedContacts( contacts )
        } else {
            setDisplayedContacts( contacts.filter( contact => contact.name.toLocaleLowerCase().startsWith( searchText.toLowerCase() ) ) )
        }
    }

    const stylez = css`

        height: 100%;
        display: flex;
        flex-direction: column;

    `

    return (
        <div className={ cx( className, stylez ) }>
            <SearchBar onSearch={ handleSearch } />
            <ContactList />
            <AddContactButton />
        </div>
    )
}

export default AppRootComponent
