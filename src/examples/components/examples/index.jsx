import React, { useEffect } from "react";
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { getCountries } from '../../redux/actions';
import CountryForm from "./CountryForm";
import CountriesList from "./CountriesList";

function Examples({ getCountries, get_countries_list }) {
  
  useEffect(() => {
    getCountries();
  }, []);
  console.log(get_countries_list);

  return (
    <div style={{ padding: 50 }}>
      <h1>Example crud</h1>
      <Row>
        <Col xs={12}>
          <h2>Listar</h2>
          <CountriesList countries={get_countries_list} />
        </Col>
        <Col xs={12}>
          <h2>Agregar</h2>
          <CountryForm />
        </Col>
        <Col xs={12}>
          <h2>Modificar</h2>
          <CountryForm updateForm />
        </Col>
        <Col xs={12}>
          <h2>Eliminar</h2>
          <CountryForm deleteForm />
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  get_countries_list: state.get_countries_list,
});

const mapDispatchToProps = { 
  getCountries,
};

export default connect(mapStateToProps, mapDispatchToProps)(Examples);
