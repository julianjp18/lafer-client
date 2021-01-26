import React, { useEffect } from "react";
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import {
  getPQRContacts,
  createPQRContacts,
  deletePQRContacts,
  updatePQRContacts,
  getPQRContactsById,
} from '../../../redux/actions';

import PQRContactsForm from "./PQRContactsForm";
import PQRContactsList from "./PQRContactsList";

import './pqrcontacts.scss';

function PQRContacts({
  getPQRContacts,
  createPQRContacts,
  deletePQRContacts,
  updatePQRContacts,
  get_pqrcontacts_list,
  getPQRContactsById,
  get_pqrcontacts,
}) {
  useEffect(() => {
    getPQRContacts();
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <h1>CRUD PQR CONTACTS</h1>
      <Row>
        <Col className="main-col" xs={12}>
          <h2>Agregar</h2>
          <PQRContactsForm
            createForm
            createPQRContacts={createPQRContacts}
          />
        </Col>
        <Col className="main-col" xs={12}>
          <h2>Modificar</h2>
          <PQRContactsForm
            updateForm
            getPQRContacts={getPQRContacts}
            updatePQRContacts={updatePQRContacts}
          />
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Eliminar</h2>
          <PQRContactsForm
            deleteForm
            deletePQRContacts={deletePQRContacts}
          />
          <div className="search-container">
            <h2>Búsqueda por código</h2>
            <PQRContactsForm
              PQRContactsByIdForm
              getPQRContactsById={getPQRContactsById}
            />
            {get_pqrcontacts && (
              <div>
                <h3>Resultado:</h3>
                <p>{`code: ${get_pqrcontacts.pqrContactID}, id: ${get_pqrcontacts.identificaction}, name: ${get_pqrcontacts.fullName},  email: ${get_pqrcontacts.email}, movil: ${get_pqrcontacts.movil}, comment: ${get_pqrcontacts.comment}, annex: ${get_pqrcontacts.fileAnnex}, date: ${get_pqrcontacts.initialDate}`}</p>
              </div>
            )}
          </div>
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Listar</h2>
          <PQRContactsList pqrcontacts={get_pqrcontacts_list} />
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  get_pqrcontacts_list: state.get_pqrcontacts_list,
  get_pqrcontacts: state.get_pqrcontacts,
});

const mapDispatchToProps = {
  getPQRContacts,
  createPQRContacts,
  deletePQRContacts,
  updatePQRContacts,
  getPQRContactsById,
};

export default connect(mapStateToProps, mapDispatchToProps)(PQRContacts);
