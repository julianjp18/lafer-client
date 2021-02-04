import React, { useEffect } from "react";
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import {
  getTypeOperations,
  createTypeOperations,
  deleteTypeOperations,
  updateTypeOperations,
  getTypeOperationsById,
} from '../../../redux/actions';

import TypeOperationsForm from "./TypeOperationsForm";
import TypeOperationsList from "./TypeOperationsList";

import './typeoperations.scss';

function TypeOperations({
  getTypeOperations,
  createTypeOperations,
  deleteTypeOperations,
  updateTypeOperations, 
  get_typeoperations_list,
  getTypeOperationsById,
  get_typeoperations,
}) {
  useEffect(() => {
    getTypeOperations();
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <h1>CRUD TYPE OPERATIONS</h1>
      <Row>
        <Col className="main-col" xs={12}>
          <h2>Agregar</h2>
          <TypeOperationsForm
            createForm
            createTypeOperations={createTypeOperations}
          />
        </Col>
        <Col className="main-col" xs={12}>
          <h2>Modificar</h2>
          <TypeOperationsForm
            updateForm
            getTypeOperations={getTypeOperations}
            updateTypeOperations={updateTypeOperations}
          />
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Eliminar</h2>
          <TypeOperationsForm
            deleteForm
            deleteTypeOperations={deleteTypeOperations}
          />
          <div className="search-container">
            <h2>Búsqueda por código</h2>
            <TypeOperationsForm
              typeOperationsByIdForm
              getTypeOperationsById={getTypeOperationsById}
            />
            {get_typeoperations && (
              <div>
                <h3>Resultado:</h3>
                <p>{`code: ${get_typeoperations.typeOperationID}, name: ${get_typeoperations.nameOperations}`}</p>
              </div>
            )}
          </div>
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Listar</h2>
          <TypeOperationsList typeoperations={get_typeoperations_list} />
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  get_typeoperations_list: state.get_typeoperations_list,
  get_typeoperations: state.get_typeoperations,
});

const mapDispatchToProps = { 
  getTypeOperations,
  createTypeOperations,
  deleteTypeOperations,
  updateTypeOperations,
  getTypeOperationsById,
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeOperations);
