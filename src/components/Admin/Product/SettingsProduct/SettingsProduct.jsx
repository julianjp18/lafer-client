import React, { useEffect, useState } from "react";
import { Row, Col, Button, InputNumber, Table } from 'antd';
import { connect } from 'react-redux';
import './settingsProduct.scss';

const columns = [
  {
    title: 'Seguro',
    dataIndex: 'secure',
  },
  {
    title: 'Sub seguro',
    dataIndex: 'subsecure',
  },
  {
    title: 'Prioridad de búsqueda',
    dataIndex: 'priority',
    render: (priority, row) => (
      <div className="price-container money-activity-container">
        <InputNumber
          step={1}
        />
      </div>
    ),
  },
];

const data = [
  {
    key: 1,
    secure: 'Mundial de seguros',
    subsecure: 'SOAT',
    priority: 0,
  },
  {
    key: 2,
    secure: 'Mundial de seguros',
    subsecure: 'Vehiculo Premium',
    priority: 0,
  },
  {
    key: 3,
    secure: 'Mundial de seguros',
    subsecure: 'Vehiculo Clásico',
    priority: 0,
  },
  {
    key: 4,
    secure: 'Mundial de seguros',
    subsecure: 'Vehiculo ligero',
    priority: 0,
  },
  {
    key: 5,
    secure: 'Seguros Bolivar',
    subsecure: 'Vehiculo Premium',
    priority: 0,
  },
  {
    key: 6,
    secure: 'Seguros Bolivar',
    subsecure: 'Vehiculo Clásico',
    priority: 0,
  },
];

const SettingsProduct = ({
}) => {
  const [selectedRows, setselectedRows] = useState([]);

  useEffect(() => {
  }, []);

  const onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setselectedRows({ selectedRowKeys });
  };

  const rowSelection = {
    selectedRows,
    onChange: onSelectChange,
  };

  return (
    <div className="settings-container">
      <h1>Configuraciones de producto</h1>
      <Row>
        <Col className="main-col" xs={24}>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </Col>
        <Col className="main-col second-col" xs={24}>
          <Button type="primary">Guardar</Button>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (globalState) => {
};

const mapDispatchToProps = { 
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsProduct);
