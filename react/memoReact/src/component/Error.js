import React from 'react';

const Error = (props) => {
    return (
        <main className="container">
            <div className="row">
                <div className="col">
                    <h2>Error TOKEN</h2>
                    {props.location.state.error}
                </div>
            </div>
        </main>
    );
}

export default Error;