import React from "react";
import { Spin } from 'antd';

function MainActivitiesList({ mainactivities }) {
  return mainactivities ? (
    <div>
      {mainactivities.map((mainactivity) => (
        <p key={mainactivity.mainActivityID}>
          {`code: ${mainactivity.mainActivityID}, name: ${mainactivity.activity}`}
        </p>
      ))}    
    </div>
  ): (
    <div className="spin-container">
      <Spin tip="Cargando..." size="large"/>
    </div>
  );
}

export default MainActivitiesList;
