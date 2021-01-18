import React, { useEffect, useState } from "react";
import { Row, Col, Tabs, Divider, Modal, } from 'antd';
import { connect } from 'react-redux';
import {
  getCountries,
  createCountry,
  deleteCountry,
  updateCountry,
  getCountryById,
} from '../../redux/actions';

import CountryForm from "./CountryForm";
import CountriesList from "./CountriesList";

import './examples.scss';

const { TabPane } = Tabs;

const Examples = ({
  getCountries,
  createCountry,
  deleteCountry,
  updateCountry, 
  get_countries_list,
  getCountryById,
  get_country,
}) => {
  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <h1>Example CRUD</h1>
      <Tabs defaultActiveKey="search">
        <TabPane tab="Buscar" key="search">
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
        </TabPane>
        <TabPane tab="Agregar" key="add">
          <h2>Agregar</h2>
          <CountryForm
            createForm
            createCountry={createCountry}
          />
        </TabPane>
        <TabPane tab="Modificar" key="update">
          <h2>Modificar</h2>
          <CountryForm
            updateForm
            getCountries={getCountries}
            updateCountry={updateCountry}
          />
        </TabPane>
        <TabPane tab="Eliminar" key="delete">
          <h2>Eliminar</h2>
          <CountryForm
            deleteForm
            deleteCountry={deleteCountry}
          />
        </TabPane>
      </Tabs>
      <Row>
        <Col className="main-col" xs={24}>
          <Divider orientation="left">Lista países</Divider>
          <CountriesList
            countries={get_countries_list}
            deleteCountry={deleteCountry}
          />
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  get_countries_list: state.get_countries_list,
  get_country: state.get_country,
});

const mapDispatchToProps = { 
  getCountries,
  createCountry,
  deleteCountry,
  updateCountry,
  getCountryById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Examples);
