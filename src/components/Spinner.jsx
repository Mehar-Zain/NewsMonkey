import React from 'react'
import loading from '../assets/loading.gif'

const Spinner = () => {
    return (
        <div className='text-center'>
            <img src={loading} alt="loading" style={{ width: "130px" }} />
        </div>
    )
}

export default Spinner
