import React from 'react'

const ProgressLoader = () => {
    return (
        <div className='absolute w-full bg-slate-950 h-full mx-auto z-30 opacity-80'>
            <div id="preloader">
                <div id="loader"></div>
            </div>
        </div>
    )
}

export default ProgressLoader