import React from 'react';
import spinner from '../../assets/spinner2.gif';

function Spinner() {
    return (
        <React.Fragment>
            <div className='spinner'>
                <img src={spinner} alt="" />
            </div>
        </React.Fragment>
    );
}

export default Spinner;