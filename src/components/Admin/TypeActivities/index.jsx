import React, { useEffect } from "react";
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import {
  getTypeActivities,
  createTypeActivity,
  deleteTypeActivity,
  updateTypeActivity,
  getTypeActivityById,
} from '../../../redux/actions';

import TypeActivityForm from "./TypeActivityForm";
import TypeActivitiesList from "./TypeActivitiesList";

import './typeActivities.scss';

function TypeActivities({
  getTypeActivities,
  createTypeActivity,
  deleteTypeActivity,
  updateTypeActivity, 
  get_typeactivities_list,
  getTypeActivityById,
  get_typeactivity,
}) {
  useEffect(() => {
    getTypeActivities();
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <h1>CRUD Type Activities</h1>
      <Row>
        <Col className="main-col" xs={12}>
          <h2>Agregar</h2>
          <TypeActivityForm
            createForm
            createTypeActivity={createTypeActivity}
          />
        </Col>
        <Col className="main-col" xs={12}>
          <h2>Modificar</h2>
          <TypeActivityForm
            updateForm
            getTypeActivities={getTypeActivities}
            updateTypeActivity={updateTypeActivity}
          />
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Eliminar</h2>
          <TypeActivityForm
            deleteForm
            deleteTypeActivity={deleteTypeActivity}
          />
          <div className="search-container">
            <h2>Búsqueda por código</h2>
            <TypeActivityForm
              typeActivityByIdForm
              getTypeActivityById={getTypeActivityById}
            />
            {get_typeactivity && (
              <div>
                <h3>Resultado:</h3>
                <p>{`code: ${get_typeactivity.typeActivityID}, name: ${get_typeactivity.activity}`}</p>
              </div>
            )}
          </div>
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Listar</h2>
          <TypeActivitiesList typeactivities={get_typeactivities_list} />
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  get_typeactivities_list: state.get_typeactivities_list,
  get_typeactivity: state.get_typeactivity,
});

const mapDispatchToProps = { 
  getTypeActivities,
  createTypeActivity,
  deleteTypeActivity,
  updateTypeActivity,
  getTypeActivityById,
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeActivities);
