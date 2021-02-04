import React, { useEffect } from "react";
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import {
  getTypeIdentifications,
  createTypeIdentifications,
  deleteTypeIdentifications,
  updateTypeIdentifications,
  getTypeIdentificationsById,
} from '../../../redux/actions';

import TypeIdentificationsForm from "./TypeIdentificationsForm";
import TypeIdentificationsList from "./TypeIdentificationsList";

import './typeidentifications.scss';

function TypeIdentifications({
  getTypeIdentifications,
  createTypeIdentifications,
  deleteTypeIdentifications,
  updateTypeIdentifications, 
  get_typeidentifications_list,
  getTypeIdentificationsById,
  get_typeidentifications,
}) {
  useEffect(() => {
    getTypeIdentifications();
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <h1>CRUD TYPEIDENTIFICATIONS</h1>
      <Row>
        <Col className="main-col" xs={12}>
          <h2>Agregar</h2>
          <TypeIdentificationsForm
            createForm
            createTypeIdentifications={createTypeIdentifications}
          />
        </Col>
        <Col className="main-col" xs={12}>
          <h2>Modificar</h2>
          <TypeIdentificationsForm
            updateForm
            getTypeIdentifications={getTypeIdentifications}
            updateTypeIdentifications={updateTypeIdentifications}
          />
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Eliminar</h2>
          <TypeIdentificationsForm
            deleteForm
            deleteTypeIdentifications={deleteTypeIdentifications}
          />
          <div className="search-container">
            <h2>Búsqueda por código</h2>
            <TypeIdentificationsForm
              typeIdentificationsByIdForm
              getTypeIdentificationsById={getTypeIdentificationsById}
            />
            {get_typeidentifications && (
              <div>
                <h3>Resultado:</h3>
                <p>{`code: ${get_typeidentifications.typeIdentificationID}, name: ${get_typeidentifications.identification}`}</p>
              </div>
            )}
          </div>
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Listar</h2>
          <TypeIdentificationsList typeidentifications={get_typeidentifications_list} />
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  get_typeidentifications_list: state.get_typeidentifications_list,
  get_typeidentifications: state.get_typeidentifications,
});

const mapDispatchToProps = { 
  getTypeIdentifications,
  createTypeIdentifications,
  deleteTypeIdentifications,
  updateTypeIdentifications,
  getTypeIdentificationsById,
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeIdentifications);
