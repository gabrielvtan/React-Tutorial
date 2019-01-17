import React from 'react';

import './UserOutput.css';

const userOutput = (props) => {
    return (
        <div className="UserOutput">
            <p>Username: {props.username}</p>
            <p>Lorem ipsum dolor sit amet, eam graece erroribus consequuntur ne, sale honestatis pro te. Sed ex purto mucius persius, eos id dolores tacimates. Vim nullam albucius quaestio ad, mollis option nonumes ex his, ne vim sonet viris labores. Movet mediocrem intellegebat has ea, id est ubique labores eleifend.  </p>
            <p>Maluisset scripserit eum an. Integre perpetua pro at, id mea ullum mnesarchum consectetuer, movet zril legimus no eam. Sale inani summo eos no, homero euismod usu ad. Has tale sumo paulo ad, dicunt eloquentiam mea et, cum ea ipsum aliquam intellegat.</p>
        </div>
    )
};

export default userOutput;