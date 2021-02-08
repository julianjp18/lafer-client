import React, { useEffect } from "react";
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import {
  getRequestTypes,
  createRequestTypes,
  deleteRequestTypes,
  updateRequestTypes,
  getRequestTypesById,
} from '../../../redux/actions';

import RequestTypesForm from "./RequestTypesForm";
import RequestTypesList from "./RequestTypesList";

import './requesttypes.scss';

function RequestTypes({
  getRequestTypes,
  createRequestTypes,
  deleteRequestTypes,
  updateRequestTypes,
  get_requesttypes_list,
  getRequestTypesById,
  get_requesttypes,
}) {
  useEffect(() => {
    getRequestTypes();
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <h1>CRUD REQUEST TYPES</h1>
      <Row>
        <Col className="main-col" xs={12}>
          <h2>Agregar</h2>
          <RequestTypesForm
            createForm
            createRequestTypes={createRequestTypes}
          />
        </Col>
        <Col className="main-col" xs={12}>
          <h2>Modificar</h2>
          <RequestTypesForm
            updateForm
            getRequestTypes={getRequestTypes}
            updateRequestTypes={updateRequestTypes}
          />
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Eliminar</h2>
          <RequestTypesForm
            deleteForm
            deleteRequestTypes={deleteRequestTypes}
          />
          <div className="search-container">
            <h2>Búsqueda por código</h2>
            <RequestTypesForm
              requestTypesByIdForm
              getRequestTypesById={getRequestTypesById}
            />
            {get_requesttypes && (
              <div>
                <h3>Resultado:</h3>
                <p>{`code: ${get_requesttypes.requestTypeID}, name: ${get_requesttypes.requestName}`}</p>
              </div>
            )}
          </div>
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Listar</h2>
          <RequestTypesList requesttypes={get_requesttypes_list} />
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  get_requesttypes_list: state.get_requesttypes_list,
  get_requesttypes: state.get_requesttypes,
});

const mapDispatchToProps = {
  getRequestTypes,
  createRequestTypes,
  deleteRequestTypes,
  updateRequestTypes,
  getRequestTypesById,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestTypes);
