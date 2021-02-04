import React from "react";
import { Spin } from 'antd';

function TypeIndustriesList({ typeindustries }) {
  return typeindustries ? (
    <div>
      {typeindustries.map((typeindustry) => (
        <p key={typeindustry.typeIndustryID}>
          {`code: ${typeindustry.typeIndustryID}, name: ${typeindustry.industry}`}
        </p>
      ))}
    </div>
  ) : (
      <div className="spin-container">
        <Spin tip="Cargando..." size="large" />
      </div>
    );
}

export default TypeIndustriesList;
