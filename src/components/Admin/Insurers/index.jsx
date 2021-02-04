import React, { useEffect } from "react";
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import {
  getInsurers,
  createInsurers,
  deleteInsurers,
  updateInsurers,
  getInsurersById,
} from '../../../redux/actions';

import InsurersForm from "./InsurersForm";
import InsurersList from "./InsurersList";

import './insurers.scss';

function Insurers({
  getInsurers,
  createInsurers,
  deleteInsurers,
  updateInsurers,
  get_insurers_list,
  getInsurersById,
  get_insurers,
}) {
  useEffect(() => {
    getInsurers();
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <h1>CRUD INSURERS</h1>
      <Row>
        <Col className="main-col" xs={12}>
          <h2>Agregar</h2>
          <InsurersForm
            createForm
            createInsurers={createInsurers}
          />
        </Col>
        <Col className="main-col" xs={12}>
          <h2>Modificar</h2>
          <InsurersForm
            updateForm
            getInsurers={getInsurers}
            updateInsurers={updateInsurers}
          />
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Eliminar</h2>
          <InsurersForm
            deleteForm
            deleteInsurers={deleteInsurers}
          />
          <div className="search-container">
            <h2>Búsqueda por código</h2>
            <InsurersForm
              insurersByIdForm
              getInsurersById={getInsurersById}
            />
            {get_insurers && (
              <div>
                <h3>Resultado:</h3>
                <p>{`code: ${get_insurers.id}, name: ${get_insurers.insurerName}, contact: ${get_insurers.contact},  movil: ${get_insurers.movil}, logo: ${get_insurers.logo}, email: ${get_insurers.email}`}</p>
              </div>
            )}
          </div>
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Listar</h2>
          <InsurersList insurers={get_insurers_list} />
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  get_insurers_list: state.get_insurers_list,
  get_insurers: state.get_insurers,
});

const mapDispatchToProps = {
  getInsurers,
  createInsurers,
  deleteInsurers,
  updateInsurers,
  getInsurersById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Insurers);
