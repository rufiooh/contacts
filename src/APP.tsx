import React, { useState, useEffect, useContext } from 'react'
import { css, cx, injectGlobal } from 'emotion'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ContactsProvider from '@root/context/ContactsContext'

import AppRootComponent from '@components/organism/AppRootComponent/AppRootComponent'
import AddEditContactSlide from '@components/organism/AddEditContactSlide/AddEditContactSlide'

import SideSlideSwitch from '@components/functional/AnimatedSwitch/SideSlideSwitch'

export interface Props {
    className?: string;
}

const App: React.FC<Props> = ( { className } ) => {
    injectGlobal`

        * {
            box-sizing: border-box;
        }

        html {
            background: #58815c99;
            font-family: Arial, Helvetica, sans-serif;
        }

        html, body {
            margin: 0;
            padding: 0;
        }

        html, body, #root {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #root {
            padding: 8px;
        }

    `

    const stylez = css`

        max-width: 480px;
        width: 100vw;
        margin: auto;
        background: rgba( 0,0,0,0.3 );
        text-align: center;
        position: relative;
        padding: 44px;
        border-radius: 3px;
        overflow: hidden;
        height: 80vh;

    `

    return (
        <div className={ stylez }>

            <ContactsProvider>
                <Router>
                    <SideSlideSwitch>
                        <Route path='/contact/add'>
                            <AddEditContactSlide type='add' />
                        </Route>
                        <Route path='/contact/:id/edit'>
                            <AddEditContactSlide type='edit' />
                        </Route>
                        <Route path='/contact/:id'>
                                Single Contact Display
                        </Route>
                        <Route path='/'>
                            <AppRootComponent />
                        </Route>
                    </SideSlideSwitch>
                </Router>
            </ContactsProvider>

        </div>
    )
}

export default App
