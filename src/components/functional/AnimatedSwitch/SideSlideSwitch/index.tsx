import React from 'react'

import AnimatedSwitch from '..'

export interface Props {
    className?: string;
    forwardedRef?: React.RefObject<HTMLDivElement>;
    location?: any
}

const SideSlideSwitch: React.FC<Props> = ( { className, children, location, ...transitionProps } ) => {
    const anim = {
        left: { position: 'absolute', top: 0, opacity: 0, transform: 'translate3d( -450px, 0, 0 )' },
        right: { position: 'absolute', top: 0, opacity: 0, transform: 'translate3d( 450px, 0, 0 )' },
        center: { position: 'absolute', top: 0, opacity: 1, transform: 'translate3d( 0px, 0, 0 )' },
    }

    return (
        <AnimatedSwitch
          className='side_slide_switch'
          initial={ anim.center }
          from={ anim.right }
          enter={ anim.center }
          leave={ anim.left }
        >
            { children }
        </AnimatedSwitch>
    )
}

export default SideSlideSwitch
