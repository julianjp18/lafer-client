import React, { useEffect } from "react";
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import {
  getCountries,
  createCountry,
  deleteCountry,
  updateCountry,
  getCountryById,
} from '../../../redux/actions';

import CountryForm from "./CountryForm";
import CountriesList from "./CountriesList";

import './countries.scss';

function Countries({
  getCountries,
  createCountry,
  deleteCountry,
  updateCountry, 
  get_countries_list,
  getCountryById,
  get_country,
}) {
  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <h1>CRUD Países</h1>
      <Row>
        <Col className="main-col" xs={12}>
          <h2>Agregar</h2>
          <CountryForm
            createForm
            createCountry={createCountry}
          />
        </Col>
        <Col className="main-col" xs={12}>
          <h2>Modificar</h2>
          <CountryForm
            updateForm
            getCountries={getCountries}
            updateCountry={updateCountry}
          />
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Eliminar</h2>
          <CountryForm
            deleteForm
            deleteCountry={deleteCountry}
          />
          <div className="search-container">
            <h2>Búsqueda por código</h2>
            <CountryForm
              countryByIdForm
              getCountryById={getCountryById}
            />
            {get_country && (
              <div>
                <h3>Resultado:</h3>
                <p>{`code: ${get_country.countryId}, name: ${get_country.countryName}`}</p>
              </div>
            )}
          </div>
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Listar</h2>
          <CountriesList countries={get_countries_list} />
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (globalState) => {
  const state = globalState.app;
  return ({
    get_countries_list: state.get_countries_list,
    get_country: state.get_country,
  });
};

const mapDispatchToProps = { 
  getCountries,
  createCountry,
  deleteCountry,
  updateCountry,
  getCountryById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Countries);
