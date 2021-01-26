import React, { useEffect } from "react";
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import {
  getMainActivities,
  createMainActivity,
  deleteMainActivity,
  updateMainActivity,
  getMainActivityById,
} from '../../../redux/actions';

import MainActivityForm from "./MainActivityForm";
import MainActivitiesList from "./MainActivitiesList";

import './mainActivities.scss';

function MainActivities({
  getMainActivities,
  createMainActivity,
  deleteMainActivity,
  updateMainActivity, 
  get_mainactivities_list,
  getMainActivityById,
  get_mainactivity,
}) {
  useEffect(() => {
    getMainActivities();
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <h1>CRUD Main Activities</h1>
      <Row>
        <Col className="main-col" xs={12}>
          <h2>Agregar</h2>
          <MainActivityForm
            createForm
            createMainActivity={createMainActivity}
          />
        </Col>
        <Col className="main-col" xs={12}>
          <h2>Modificar</h2>
          <MainActivityForm
            updateForm
            getMainActivities={getMainActivities}
            updateMainActivity={updateMainActivity}
          />
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Eliminar</h2>
          <MainActivityForm
            deleteForm
            deleteMainActivity={deleteMainActivity}
          />
          <div className="search-container">
            <h2>Búsqueda por código</h2>
            <MainActivityForm
              mainActivityByIdForm
              getMainActivityById={getMainActivityById}
            />
            {get_mainactivity && (
              <div>
                <h3>Resultado:</h3>
                <p>{`code: ${get_mainactivity.mainActivityID}, name: ${get_mainactivity.activity}`}</p>
              </div>
            )}
          </div>
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Listar</h2>
          <MainActivitiesList mainactivities={get_mainactivities_list} />
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  get_mainactivities_list: state.get_mainactivities_list,
  get_mainactivity: state.get_mainactivity,
});

const mapDispatchToProps = { 
  getMainActivities,
  createMainActivity,
  deleteMainActivity,
  updateMainActivity,
  getMainActivityById,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainActivities);
