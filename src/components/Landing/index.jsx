import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { mainInfo } from '../../redux/actions';
import { WarningOutlined } from '@ant-design/icons';
import Carousel from "./Carousel/Carousel";
import { Modal } from 'antd';
import axios from 'axios';
import './landing.scss';
import 'antd/dist/antd.css';
import Terms from "./terms"
import NormalButton from "../../helpers/Button";
import { MAIN_URL } from "../../apis/urls";

function Landing({ mainInfo, response, vehicle_info_soat }) {
  const history = useHistory();

  let audio = new Audio("/snap_of_finger.mp3");

  const [formValues, setFormValues] = useState({ plate: '' });
  const [discount, setDiscount] = useState([]);
  const [visible, setvisible] = useState(false);
  const [visibleTerms, setvisibleTerms] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const onFinish = () => {
    //comento para que no se vean las millas
    //if(formValues && formValues.discount_id && formValues.plate){
    try {
      audio.play();
    } catch (error) {
      console.log("no se pudo reproducir audio");
    }

    mainInfo(formValues);
    setShowErrorMessage(false);
    //}
  };

  useEffect(() => {
    if (response) {
      if (response.statusError === 401) {
        setvisible(true);
      } else {
        setFormValues({ ...formValues, plate: '' });
        setvisible(false);
      }
    }

  }, [response]);

  useEffect(() => {
    if (vehicle_info_soat) {
      if (response.codeHttp) {
        const { codeHttp } = response;
        if (codeHttp === 200) {
          history.push("/soat-vehicle-information");
        }
      } else {
        setShowErrorMessage(true);
      }
    } else {
      setShowErrorMessage(false);
    }
  }, [vehicle_info_soat]);

  const showModal = () => {
    setvisible(true);
  };

  const hideModal = () => {
    setvisible(false);
  };

  const handleChangeDiscount = (value) => {
    setFormValues({ ...formValues, discount_id: value });
  }

  const handleChangePlate = ({ target }) => {
    setFormValues({ ...formValues, plate: target.value });
  }

  useEffect(() => {
    localStorage.clear();
    axios.get(`${MAIN_URL}api/Discounts`, {
      "accept": "*/*",
      "Access-Control-Allow-Origin": "*",
    }).then((response) => {
      setDiscount(response);
    }).catch(e => {
      //error.push(e);
      setDiscount(null);
    });
  }, []);

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
          {showErrorMessage && (
            <p className="show-error">
              La placa ingresada no coincide con la base de datos del RUNT
            </p>
          )}
          <button className="soatForm__button" onClick={onFinish}>
            Cotiza SOAT gratis
          </button>
          <span className="soatForm__legales">
            Al continuar aceptas nuestros <a className="terms-and-conditions" onClick={() => setvisibleTerms(true)}>Términos y Condiciones & Política de Privacidad</a> para el tratamiento de tus datos.
            <Modal
              title="Términos y condiciones"
              centered
              visible={visibleTerms}
              onOk={() => setvisibleTerms(false)}
              onCancel={() => setvisibleTerms(false)}
              width={820}
              okText="Volver"
              className="terms-modal"
            >
              {Terms}
            </Modal>
            <Modal
              visible={visible}
              footer={null}
              onOk={() => showModal()}
              onCancel={hideModal}
              className="alert-modal"
            >
              <div className="important-info-container">
                <h2 className="important-info-title"><WarningOutlined /> Advertencia</h2>
                <p className="important-info-description first-modal">
                  {response && response.message ? response.message : ''}
                </p>
                {response && response.extraInfo && (
                  <div className="important-extra-info-container">
                    <p>Tu seguro no puede ser expedido en este momento. Por favor comunícate con un asesor en el siguiente número:</p>
                    <p>327 4712 - 327 4713</p>
                    <p>En los siguientes horarios</p>
                    <p>Lunes a jueves: <br />
                      8:00 a.m. a 5:00 p.m.
                    </p>
                    <p className="last-text">Viernes: 8:00 a.m. a 4:15 p.m.</p>
                  </div>
                )}
              </div>
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
          <img className="main-image" src="images/Siendo-Seguros-banners/Siendo-Seguros-banner-3-desktop.png" alt="Image" />
        </section>
      </div>
    </>
  );
}

const mapStateToProps = (globalState) => {
  const state = globalState.app;
  return ({
    response: state.response,
    vehicle_info_soat: state.vehicle_info_soat,
  });
};

const mapDispatchToProps = {
  mainInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
