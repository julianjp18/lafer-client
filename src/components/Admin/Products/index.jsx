import React, { useEffect } from "react";
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import {
  getProducts,
  createProducts,
  deleteProducts,
  updateProducts,
  getProductsById,
} from '../../../redux/actions';

import ProductsForm from "./ProductsForm";
import ProductsList from "./ProductsList";

import './products.scss';

function Products({
  getProducts,
  createProducts,
  deleteProducts,
  updateProducts,
  get_products_list,
  getProductsById,
  get_products,
}) {
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div style={{ padding: 50 }}>
      <h1>CRUD PRODUCTS</h1>
      <Row>
        <Col className="main-col" xs={12}>
          <h2>Agregar</h2>
          <ProductsForm
            createForm
            createProducts={createProducts}
          />
        </Col>
        <Col className="main-col" xs={12}>
          <h2>Modificar</h2>
          <ProductsForm
            updateForm
            getProducts={getProducts}
            updateProducts={updateProducts}
          />
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Eliminar</h2>
          <ProductsForm
            deleteForm
            deleteProducts={deleteProducts}
          />
          <div className="search-container">
            <h2>Búsqueda por código</h2>
            <ProductsForm
              productsByIdForm
              getProductsById={getProductsById}
            />
            {get_products && (
              <div>
                <h3>Resultado:</h3>
                <p>{`code: ${get_products.productID}, name: ${get_products.name}, feature: ${get_products.features},  feature2: ${get_products.features2}, feature3: ${get_products.features3}, feature4: ${get_products.features4}, feature5: ${get_products.features5}`}</p>
              </div>
            )}
          </div>
        </Col>
        <Col className="main-col second-col" xs={12}>
          <h2>Listar</h2>
          <ProductsList products={get_products_list} />
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  get_products_list: state.get_products_list,
  get_products: state.get_products,
});

const mapDispatchToProps = {
  getProducts,
  createProducts,
  deleteProducts,
  updateProducts,
  getProductsById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
