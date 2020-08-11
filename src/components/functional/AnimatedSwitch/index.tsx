import React, { useState, useEffect, useContext, useRef } from 'react'
import { css, cx } from 'emotion'
import { Switch, useLocation } from 'react-router-dom'
import { useTransition, animated } from 'react-spring/web.cjs'

export interface Props {
    className?: string;
    initial?: any
    from: any
    enter: any
    leave: any

}

const AnimatedSwitch: React.FC<Props> = ( { className, children, ...animationProps } ) => {
    const location = useLocation()
    const transitions = useTransition( location, location => location.pathname, { ...animationProps } )
    const animatedContainerRef = useRef( null )

    const stylez = css`

        position: relative;
        height: 100%;

        .animated_switch_animated_container {
            height: 100%;
            width: 100%;
        }

    `

    return (
        <div className={ cx( 'animated_switch', className, stylez ) }>
            {
                transitions.map( ( { item, props, key } ) => (
                    <animated.div ref={ animatedContainerRef } className='animated_switch_animated_container' key={ key } style={ props }>
                        <Switch location={ item }>
                            { children }
                        </Switch>
                    </animated.div>
                ) )
            }

        </div>
    )
}

export default AnimatedSwitch
