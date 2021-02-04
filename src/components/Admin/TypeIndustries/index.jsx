import React, { useEffect } from "react";
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import {
  getTypeIndustries,
  createTypeIndustries,
  deleteTypeIndustries,
  updateTypeIndustries,
  getTypeIndustriesById,
} from '../../../redux/actions';

import TypeIndustriesForm from "./TypeIndustriesForm";
import TypeIndustriesList from "./TypeIndustriesList";

import './typeindustries.scss';

function TypeIndustries({
  getTypeIndustries,
  createTypeIndustries,
  deleteTypeIndustries,
  updateTypeIndustries, 
  get_typeindustries_list,
  getTypeIndustriesById,
  get_typeindustries,
}) {
  useEffect(() => {
    getTypeIndustries();
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <h1>CRUD TYPE INDUSTRIES</h1>
      <Row>
        <Col className="main-col" xs={12}>
          <h2>Agregar</h2>
          <TypeIndustriesForm
            createForm
            createTypeIndustries={createTypeIndustries}
          />
        </Col>
        <Col className="main-col" xs={12}>
          <h2>Modificar</h2>
          <TypeIndustriesForm
            updateForm
            getTypeIndustries={getTypeIndustries}
            updateTypeIndustries={updateTypeIndustries}
          />
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Eliminar</h2>
          <TypeIndustriesForm
            deleteForm
            deleteTypeIndustries={deleteTypeIndustries}
          />
          <div className="search-container">
            <h2>Búsqueda por código</h2>
            <TypeIndustriesForm
              typeIndustriesByIdForm
              getTypeIndustriesById={getTypeIndustriesById}
            />
            {get_typeindustries && (
              <div>
                <h3>Resultado:</h3>
                <p>{`code: ${get_typeindustries.typeIndustryID}, name: ${get_typeindustries.industry}`}</p>
              </div>
            )}
          </div>
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Listar</h2>
          <TypeIndustriesList typeindustries={get_typeindustries_list} />
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  get_typeindustries_list: state.get_typeindustries_list,
  get_typeindustries: state.get_typeindustries,
});

const mapDispatchToProps = { 
  getTypeIndustries,
  createTypeIndustries,
  deleteTypeIndustries,
  updateTypeIndustries,
  getTypeIndustriesById,
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeIndustries);
