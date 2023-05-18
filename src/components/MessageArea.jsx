import React from "react";
import { connect } from "react-redux";

function MessageArea({ main }) {
    return (
        <>
            <div id="messages-div">

                <div id="messages">
                    {main.messages.map((message, index) => {
                        return <p className='message' key={index}>{message}</p>
                    })}
                </div>
            </div>

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        main: state.mainReducer
    }
}

export default connect(mapStateToProps)(MessageArea)