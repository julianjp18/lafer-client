import React, { useEffect } from "react";
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import {
  getTypeCompanies,
  createTypeCompanies,
  deleteTypeCompanies,
  updateTypeCompanies,
  getTypeCompaniesById,
} from '../../../redux/actions';

import TypeCompaniesForm from "./TypeCompaniesForm";
import TypeCompaniesList from "./TypeCompaniesList";

import './typecompanies.scss';

function TypeCompanies({
  getTypeCompanies,
  createTypeCompanies,
  deleteTypeCompanies,
  updateTypeCompanies, 
  get_typecompanies_list,
  getTypeCompaniesById,
  get_typecompanies,
}) {
  useEffect(() => {
    getTypeCompanies();
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <h1>CRUD TYPECOMPANIES</h1>
      <Row>
        <Col className="main-col" xs={12}>
          <h2>Agregar</h2>
          <TypeCompaniesForm
            createForm
            createTypeCompanies={createTypeCompanies}
          />
        </Col>
        <Col className="main-col" xs={12}>
          <h2>Modificar</h2>
          <TypeCompaniesForm
            updateForm
            getTypeCompanies={getTypeCompanies}
            updateTypeCompanies={updateTypeCompanies}
          />
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Eliminar</h2>
          <TypeCompaniesForm
            deleteForm
            deleteTypeCompanies={deleteTypeCompanies}
          />
          <div className="search-container">
            <h2>Búsqueda por código</h2>
            <TypeCompaniesForm
              typeCompaniesByIdForm
              getTypeCompaniesById={getTypeCompaniesById}
            />
            {get_typecompanies && (
              <div>
                <h3>Resultado:</h3>
                <p>{`code: ${get_typecompanies.typeCompanyID}, name: ${get_typecompanies.company}`}</p>
              </div>
            )}
          </div>
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Listar</h2>
          <TypeCompaniesList typecompanies={get_typecompanies_list} />
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  get_typecompanies_list: state.get_typecompanies_list,
  get_typecompanies: state.get_typecompanies,
});

const mapDispatchToProps = { 
  getTypeCompanies,
  createTypeCompanies,
  deleteTypeCompanies,
  updateTypeCompanies,
  getTypeCompaniesById,
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeCompanies);
