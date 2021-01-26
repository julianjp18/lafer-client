import React, { useEffect } from "react";
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import {
  getLinkClasses,
  createLinkClasses,
  deleteLinkClasses,
  updateLinkClasses,
  getLinkClassesById,
} from '../../../redux/actions';

import LinkClassesForm from "./LinkClassesForm";
import LinkClassesList from "./LinkClassesList";

import './linkclasses.scss';

function LinkClasses({
  getLinkClasses,
  createLinkClasses,
  deleteLinkClasses,
  updateLinkClasses, 
  get_linkclasses_list,
  getLinkClassesById,
  get_linkclasses,
}) {
  useEffect(() => {
    getLinkClasses();
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <h1>CRUD Link Classes</h1>
      <Row>
        <Col className="main-col" xs={12}>
          <h2>Agregar</h2>
          <LinkClassesForm
            createForm
            createLinkClasses={createLinkClasses}
          />
        </Col>
        <Col className="main-col" xs={12}>
          <h2>Modificar</h2>
          <LinkClassesForm
            updateForm
            getLinkClasses={getLinkClasses}
            updateLinkClasses={updateLinkClasses}
          />
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Eliminar</h2>
          <LinkClassesForm
            deleteForm
            deleteLinkClasses={deleteLinkClasses}
          />
          <div className="search-container">
            <h2>Búsqueda por código</h2>
            <LinkClassesForm
              linkClassesByIdForm
              getLinkClassesById={getLinkClassesById}
            />
            {get_linkclasses && (
              <div>
                <h3>Resultado:</h3>
                <p>{`code: ${get_linkclasses.linkClassID}, name: ${get_linkclasses.nameLink}, othername:${get_linkclasses.other}`}</p>
              </div>
            )}
          </div>
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Listar</h2>
          <LinkClassesList linkclasses={get_linkclasses_list} />
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  get_linkclasses_list: state.get_linkclasses_list,
  get_linkclasses: state.get_linkclasses,
});

const mapDispatchToProps = { 
  getLinkClasses,
  createLinkClasses,
  deleteLinkClasses,
  updateLinkClasses,
  getLinkClassesById,
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkClasses);
