import React from "react";
import { Spin } from 'antd';

function ProductsList({ products }) {
  return products ? ( 
    <div>
      {products.map((product) => (
        <p key={product.productID}>
          {`code: ${product.productID}, name: ${product.name}, feature: ${product.features},  feature2: ${product.features2}, feature3: ${product.features3}, feature4: ${product.features4}, feature5: ${product.features5}`} 
          </p>
      ))}    
    </div>
  ): (
    <div className="spin-container">
      <Spin tip="Cargando..." size="large"/>
    </div>
  );
}

export default ProductsList;
