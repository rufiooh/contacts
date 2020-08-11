import React, { useState, useEffect } from 'react'
import { css, cx } from 'emotion'
import SearchIcon from '@material-ui/icons/Search'

export interface Props {
    className?: string;
    onSearch: ( searchText: string ) => void
}

const SearchBar: React.FC<Props> = ( { className, onSearch } ) => {
    const [ searchText, setSearchText ] = useState<string>( '' )

    const handleSearchChange = ( e ) => {
        setSearchText( e.target.value )
        onSearch( e.target.value )
    }

    const handleSubmit = ( e ) => {
        e.preventDefault()
        onSearch( searchText )
    }

    const stylez = css`

        input {
            width: 100%;
            font-size: 1rem;
            border-radius: 3px;
            box-shadow: none;
            border:none;
            padding: 4px 8px;
            margin-bottom: 16px;
        }

    `

    return (
        <div className={ cx( className, stylez ) }>
            <form onSubmit={ handleSubmit }>
                <input placeholder='Search...' type='text' value={ searchText } onChange={ handleSearchChange } />
            </form>
        </div>
    )
}

export default SearchBar
