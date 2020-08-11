import React, { useState, useEffect, useContext } from 'react'
import { css, cx } from 'emotion'
import { ContactsContext } from '@root/context/ContactsContext'
import TextField from '@material-ui/core/TextField'
import { useParams, Link, withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { v4 as uuid } from 'uuid'
import { random as _random } from 'lodash-es'
import Avatar from '@components/atomic/Avatar/Avatar'

export interface Props {
    className?: string;
    history?: any // dont know type currently
    type: 'edit' | 'add'
}

const AddEditContactSlide: React.FC<Props> = ( { className, type, history } ) => {
    const { contacts, setContacts } = useContext( ContactsContext )

    const [ contact, setContact ] = useState( null )

    const [ name, setName ] = useState( '' )
    const [ number, setNumber ] = useState( '' )
    const [ imageSrc, setImageSrc ] = useState( '' )

    const { id } = useParams()

    useEffect( () => {
        const foundContact = contacts.find( contact => contact.id === id )
        if ( foundContact ) {
            setName( foundContact.name )
            setNumber( foundContact.number )
            setImageSrc( foundContact.imageSrc )
            setContact( foundContact )
        }
    }, [ contacts, id ] )

    const stylez = css`

        position: relative;
        height: 100%;

        h1 {
            margin-bottom: 64px;
        }

        form {
            display: flex;
            justify-content: center;
            flex-direction: column;
        }

        .image_wrap {
            display: flex;
            justify-content: center;
            margin-bottom: 32px;
        }

        .image {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 1px solid rgba( 0,0,0,0.4 );
            display: flex;
            justify-content: center;
            align-items: center;
            color: rgba( 0,0,0,0.4 );
            background-size: cover;

            svg {
                font-size: 2.5rem;
            }
        }

        .text_field {
            margin-bottom: 16px;
        }

        .text_field_number {

        }

        .controls {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            flex-direction: column;

            .delete_btn {
                background-color: red;
            }

            .save_btn {
                background-color: #9dbaa9;
                transition: background-color 0.1s;

                &:hover {
                    background-color: #c4efd6;
                }
            }

            & > * {
                margin-bottom: 16px;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }

    `

    const handleSubmit = ( e ) => {
        e.preventDefault()

        if ( contact ) {
            const filteredContacts = contacts.filter( _contact => _contact.id !== contact.id )
            setContacts(
                [
                    ...filteredContacts,
                    {
                        ...contact,
                        name,
                        number,
                        imageSrc,
                    },
                ],
            )
        } else {
            setContacts( [ ...contacts, {
                id: uuid(),
                name,
                number,
                imageSrc: `https://www.fillmurray.com/${ _random( 194, 206 ) }/${ _random( 194, 206 ) }`,
            } ] )
        }

        history.push( '/' )
    }

    const handleDelete = () => {
        const confirmed = confirm( 'Really delete?' )
        if ( confirmed ) {
            const newContacts = contacts.filter( _contact => _contact.id !== contact.id )
            setContacts( newContacts )
            history.push( '/' )
        }
    }

    const handleCancel = ( e ) => {
        history.push( '/' )
    }

    return (
        <div className={ cx( className, stylez ) }>
            <h1>
                { type === 'add' && 'Add Contact' }
                { type === 'edit' && 'Edit Contact' }
            </h1>
            <form onSubmit={ handleSubmit }>
                <div className='image_wrap'>
                    <Avatar add name={ contact?.name } imageSrc={ contact?.imageSrc } />
                </div>
                <TextField className='text_field' label='Name' variant='filled' value={ name } onChange={ e => setName( e.target.value ) } />
                <TextField className='text_field text_field_number' label='Number' variant='filled' value={ number } onChange={ e => setNumber( e.target.value ) } />
                <div className='controls'>

                    <Button className='save_btn' type='submit'>Save</Button>
                    { contact && <Button onClick={ handleDelete } className='delete_btn'>Delete</Button> }
                    <Button onClick={ handleCancel } variant='outlined'>Cancel</Button>

                </div>
            </form>
        </div>
    )
}

export default withRouter( AddEditContactSlide )
