import React from 'react';

import './UserOutput.css';

const userOutput = (props) => {
    return (
        <div className="UserOutput">
            <p>Username: {props.username}</p>
            <p>Lorem ipsum dolor sit amet, eam graece erroribus consequuntur ne, sale honestatis pro te. Sed ex purto mucius persius, eos id dolores tacimates. Vim nullam albucius quaestio ad, mollis option nonumes ex his, ne vim sonet viris labores. Movet mediocrem intellegebat has ea, id est ubique labores eleifend.  </p>
        </div>
    )
};

export default userOutput;