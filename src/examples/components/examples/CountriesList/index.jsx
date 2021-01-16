import React from "react";
import { Spin, Table, Space } from 'antd';


const CountriesList = ({ countries, deleteCountry }) => {

  const columns = [
    {
      title: 'Código',
      dataIndex: 'countryId',
      key: 'code',
    },
    {
      title: 'Nombre país',
      dataIndex: 'countryName',
      key: 'name',
    },
    {
      title: 'Acción',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => deleteCountry({ countryId: record.countryId })}>Eliminar</a>
        </Space>
      ),
    },
  ];

  return countries ? (
    <div>
      <Table columns={columns} dataSource={countries} />
    </div>
  ): (
    <div className="spin-container">
      <Spin tip="Cargando..." size="large"/>
    </div>
  );
}

export default CountriesList;
