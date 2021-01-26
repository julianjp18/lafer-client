import React, { useEffect } from "react";
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import {
  createMediumResponses,
  getMediumResponses,
  deleteMediumResponses,
  updateMediumResponses,
  getMediumResponsesById,
} from '../../../redux/actions';

import MediumResponsesForm from "./MediumResponsesForm";
import MediumResponsesList from "./MediumResponsesList";

import './mediumresponses.scss';

function MediumResponses({
  getMediumResponses,
  createMediumResponses,
  deleteMediumResponses,
  updateMediumResponses, 
  get_mediumresponses_list,
  getMediumResponsesById,
  get_mediumresponses,
}) {
  useEffect(() => {
    getMediumResponses();
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <h1>Medium Responses</h1>
      <Row>
      <Col className="main-col" xs={12}>
          <h2>Agregar</h2>
          <MediumResponsesForm
            createForm
            createMediumResponses={createMediumResponses}
          />
        </Col>
        <Col className="main-col" xs={12}>
          <h2>Modificar</h2>
          <MediumResponsesForm
            updateForm
            getMediumResponses={getMediumResponses}
            updateMediumResponses={updateMediumResponses}
          />
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Eliminar</h2>
          <MediumResponsesForm
            deleteForm
            deleteMediumResponses={deleteMediumResponses}
          />
          <div className="search-container">
            <h2>Búsqueda por código</h2>
            <MediumResponsesForm
              mediumResponsesByIdForm
              getMediumResponsesById={getMediumResponsesById}
            />
            {get_mediumresponses && (
              <div>
                <h3>Resultado:</h3>
                <p>{`code: ${get_mediumresponses.mediumResponseID}, name: ${get_mediumresponses.response}`}</p>
              </div>
            )}
          </div>
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Listar</h2>
          <MediumResponsesList mediumresponses={get_mediumresponses_list} />
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  get_mediumresponses_list: state.get_mediumresponses_list,
  get_mediumresponses: state.get_mediumresponses,
});

const mapDispatchToProps = { 
  createMediumResponses,
  getMediumResponses,
  deleteMediumResponses,
  updateMediumResponses,
  getMediumResponsesById,
};

export default connect(mapStateToProps, mapDispatchToProps)(MediumResponses);

