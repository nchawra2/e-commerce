import React from 'react';

function Home() {
    return (
        <React.Fragment>
            <div className='home'>
                <h1 className='display-3 fw-bolder'>Welcome to React Kart</h1>
                <p className='h4 text-center'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, debitis ducimus est expedita modi nostrum odio optio ratione reiciendis, repudiandae sapiente sequi tempora veniam? Dolore doloribus exercitationem itaque omnis placeat.</p>
                <button className='btn shop-btn text-white text-uppercase bg-primary btn-md fw-bold'>Shop Now</button>
            </div>
        </React.Fragment>
    );
}

export default Home;