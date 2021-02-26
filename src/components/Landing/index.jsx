import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { mainInfo } from '../../redux/actions';
import Carousel from "./Carousel/Carousel";
import { Modal, Select } from 'antd';
import axios from 'axios';
import './landing.scss';
import 'antd/dist/antd.css';

function Landing({ mainInfo }) {


  const history = useHistory();
  localStorage.removeItem("fetchedInfo");
  let audio = new Audio("/snap_of_finger.mp3");

 const [formValues, setFormValues] = useState({plate:null});
 const [discount, setDiscount] = useState(null);

  const onFinish = () => {
    if(formValues && formValues.discount_id && formValues.plate){
      try {
        audio.play();
      } catch (error) {
        console.log("no se pudo reproducir audio");
      }
      mainInfo(formValues);
      history.push("/steps-form");
    }
  };

  const [visible, setVisible] = useState(false);
  const { Option } = Select;

  function handleChangeDiscount(value) {
    setFormValues({...formValues, discount_id:value});
  }
  function handleChangePlate({target}) {
    setFormValues({...formValues, plate:target.value});
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/Discounts`, {
      "accept": "*/*",
      "Access-Control-Allow-Origin": "*",
    }).then((response) => {
      setDiscount(response.data);
    }).catch(e => {
      //error.push(e);
      setDiscount(null);
    });
  }, [])

  return (
    <>
      <section className="mainSection__container">
        <article className="soatForm__container">
          <h2>Cotiza rápido y seguro aquí</h2>
          <input type="plate" id="plate" name="plate" placeholder="Ingresa la placa" onChange={handleChangePlate} value={formValues.plate && formValues.plate.toUpperCase()}></input>
          <Select
            size={'large'}
            placeholder="Selecciona tu bono regalo"
            onChange={handleChangeDiscount}
          >
            {discount && discount.length>0 && discount.map(o=>{
              return <Option key={o.id} value={o.id}>{o.description}</Option>
            })
            }
          </Select>
          <button className="soatForm__button" onClick={onFinish}>
            Cotiza SOAT gratis
          </button>
          <span className="soatForm__legales">
            Al continuar aceptas nuestros <a onClick={() => setVisible(true)}>Términos y Condiciones & Política de Privacidad</a> para el tratamiento de tus datos.
            <Modal
              title="Términos y condiciones"
              centered
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              width={820}
              okText="Volver"
            >
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc laoreet viverra purus, sed viverra eros efficitur vel. Donec euismod luctus faucibus. Ut vel lectus lectus. Nulla a suscipit massa. Nam in sodales dolor. Nulla nulla turpis, elementum ac eleifend nec, efficitur in arcu. Phasellus sodales sapien a semper egestas. Integer lacinia nisl ante, non placerat quam elementum sit amet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus eu sapien vel metus faucibus sollicitudin. Integer aliquet ac magna vel sagittis. Phasellus luctus mattis lacus sit amet varius. Donec pharetra id quam eu iaculis. Vivamus id blandit velit. Cras venenatis pharetra dui quis consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sodales a quam sed mattis. Etiam varius vel urna sed finibus. Aenean varius nibh vitae mauris rutrum suscipit quis eget diam. Nullam pellentesque cursus lorem non tincidunt. Suspendisse ultricies efficitur pretium. In eu pellentesque neque. Etiam pharetra libero nec neque pulvinar, id posuere elit interdum. Nam luctus augue lorem. Nullam tempor egestas libero eget iaculis. Phasellus eu sapien vel metus faucibus sollicitudin. Integer aliquet ac magna vel sagittis. Phasellus luctus mattis lacus sit amet varius. Donec pharetra id quam eu iaculis. Vivamus id blandit velit. Cras venenatis pharetra dui quis consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sodales a quam sed mattis. Etiam varius vel urna sed finibus. Aenean varius nibh vitae mauris rutrum suscipit quis eget diam. Nullam pellentesque cursus lorem non tincidunt. Suspendisse ultricies efficitur pretium. In eu pellentesque neque. Etiam pharetra libero nec neque pulvinar, id posuere elit interdum. Nam luctus augue lorem. Nullam tempor egestas libero eget iaculis.v</p>
            </Modal>
          </span>
        </article>
        <Carousel />
      </section>
      <div className="maxwidth__container">
        <section className="aboutus__container">
          <article>
            <h1>¿Quiénes <strong>somos?</strong></h1>
            <p>Somos intermediarios con más de 40 años de experiencia, líderes en mercadeo masivo de seguros y microseguros. Entregamos soluciones a la medida, excelente servicio al cliente y manejamos todos los riesgos para que tus intereses estén bien asegurados.</p>
          </article>
          <img src="images/Siendo-Seguros-banners/Siendo-Seguros-banner-1-desktop.png" alt="Image" />
        </section>
      </div>
    </>
  );
}

const mapStateToProps = (globalState) => {
  const state = globalState.app;
  return ({
    response: state.response,
  });
};

const mapDispatchToProps = {
  mainInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
