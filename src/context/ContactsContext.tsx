import React, { useState, useEffect } from 'react'
import { writeStorage, useLocalStorage } from '@rehooks/local-storage'

type Contact = { id: string, name: string, number: string, imageSrc?: string }

export const ContactsContext = React.createContext( {
    contacts: [] as Contact[],
    setContacts: ( () => null ) as React.Dispatch<React.SetStateAction<Contact[]>>,
    displayedContacts: [] as Contact[],
    setDisplayedContacts: ( () => null ) as React.Dispatch<React.SetStateAction<Contact[]>>,
} )

export interface Props {
    className?: string;
}

const test = [
    // { id: '1', name: 'X', number: '123' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
    // { id: '1', name: 'X', number: '123', imageSrc: 'https://www.fillmurray.com/200/300' },
]

const ContactsProvider: React.FC<Props> = ( { className, children } ) => {
    const [ storageContacts ] = useLocalStorage<Contact[]>( 'contacts' )

    const [ contacts, setContacts ] = useState( storageContacts || [] )
    const [ displayedContacts, setDisplayedContacts ] = useState( [] )

    useEffect( () => {
        setDisplayedContacts( contacts )
    }, [ contacts ] )

    return (
        <ContactsContext.Provider value={ {
            contacts,
            setContacts: ( newContacts ) => {
                writeStorage( 'contacts', JSON.stringify( newContacts ) )
                setContacts( newContacts )
            },
            displayedContacts,
            setDisplayedContacts,
        } }
        >
            { children }
        </ContactsContext.Provider>
    )
}

export default ContactsProvider
