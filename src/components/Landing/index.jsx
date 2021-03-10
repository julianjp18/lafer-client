import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useMedia from 'use-media';
import { connect } from 'react-redux';
import { mainInfo } from '../../redux/actions';
import Carousel from "./Carousel/Carousel";
import { Modal, Select } from 'antd';
import axios from 'axios';
import './landing.scss';
import 'antd/dist/antd.css';
import IconAirplane from "./IconAirplane";
import IconMoney from "./IconMoney";
import Terms from "./terms"

function Landing({ mainInfo }) {

  const isMobile = useMedia({ maxWidth: 767 });

  const history = useHistory();
  localStorage.removeItem("fetchedInfo");
  let audio = new Audio("/snap_of_finger.mp3");

 const [formValues, setFormValues] = useState({plate:null});
 const [discount, setDiscount] = useState(null);

  const onFinish = () => {
    //comento para que no se vean las millas
    //if(formValues && formValues.discount_id && formValues.plate){
      try {
        audio.play();
      } catch (error) {
        console.log("no se pudo reproducir audio");
      }
      setTimeout(function(){
        mainInfo(formValues);
        history.push("/steps-form");
      }, 900);

    //}
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
    // axios.get(`${process.env.REACT_APP_API_URL}/Discounts`, {
    //   "accept": "*/*",
    //   "Access-Control-Allow-Origin": "*",
    // }).then((response) => {
    //   setDiscount(response.data);
    // }).catch(e => {
    //   //error.push(e);
    //   setDiscount(null);
    // });
  }, [])

  return (
    <>
      <section className="mainSection__container">
        <article className="soatForm__container">
          <h2>Inicia rápido y seguro aquí</h2>
          <input type="plate" id="plate" name="plate" placeholder="Ingresa la placa" onChange={handleChangePlate} value={formValues.plate && formValues.plate.toUpperCase()}></input>
          {
          /* 
          comento para que no se vean las millas
          <Select
            size={'large'}
            placeholder="Selecciona tu bono regalo"
            onChange={handleChangeDiscount}
          >
            {discount && discount.length>0 && discount.map(o=>{
              const iconMiles = o.description === 'Millas LifeMiles';
              return (
                <Option key={o.id} value={o.id}>
                  {iconMiles ? (
                    <IconAirplane />
                  ) : (
                    <IconMoney />
                  )}
                  {o.description}
                </Option>
              )
            })
            }
          </Select> */}
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
              {Terms} 
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
          {!isMobile && 
            <img src="images/Siendo-Seguros-banners/Siendo-Seguros-banner-3-desktop.png" alt="Image" />
          }
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
