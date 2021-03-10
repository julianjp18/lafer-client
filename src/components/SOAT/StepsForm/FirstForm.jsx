import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  Radio,
  Card,
  Button,
  Spin,
} from 'antd';
import axios from 'axios';

const { Option } = Select;

function FirstForm({ next, vehicleInfo, response, clientInfo }) {
  const [typeVehicle, setTypeVehicle] = useState();
  const [line, setLine] = useState(response && response.line);
  const [classVehicle, setClassVehicle] = useState(response && response.class);
  const [model, setModel] = useState(response && response.model);
  const [plate, setPlate] = useState(response && response.placa);
  const [brand, setBrand] = useState(response && response.brand);
  // const [email, setEmail] = useState(response && response.email);
  // const [phoneNumber, setPhoneNumber] = useState(response && response.movil);
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [formError, setFormError] = useState({email:false, phoneNumber:false});
  const [quotation, setQuotation] = useState(response && response.brand);

  const history = useHistory();

  const censorWord = function (str) {
    return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
  }

  useEffect(() => {
    if (response) {
      setLine(response.line);
      setClassVehicle(response.class);
      setModel(response.model);
      setPlate(response.placa);
      setBrand(response.brand);
      setQuotation(response.cotizaciones[0])
    }else{
      if(localStorage.getItem("fetchedInfo")===null){
        history.push("/");
      }
    }
    
  }, [response]);

  const nextSubmit = () => {
    if(!validateForm()){
      let newClient = Object.assign({}, response, {});

      axios.post(`${process.env.REACT_APP_API_URL}/setAdditionalData`, {cotizacion_id: response.id, email: email, movil: phoneNumber}, {
        "accept": "*/*",
        "Access-Control-Allow-Origin": "*",
      }).then((res) => {
        if(res && res.data && res.data.response){
          newClient.email = email;
          newClient.movil = phoneNumber;
          clientInfo(newClient);
          const vehicleData = { 
            typeVehicle,
            line,
            classVehicle,
            model,
            plate,
            brand,
            email,
            phoneNumber,
          };
          vehicleInfo(vehicleData);
          next();
        }
      }).catch(e => {
        //error.push(e);
      });
   
    }

  };

  const validateForm=()=>{
    let emailError = false;
    let phoneError = false;
    let hasError = false;

    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) { 
      emailError = true;
      hasError = true;
    }

    if (!/[0-9]{10}$/.test(phoneNumber)) {  
      phoneError = true;
      hasError = true;
    }

    setFormError({ ...formError, email: emailError,  phoneNumber: phoneError});
    return hasError;
  }

  return response ? (
    <>
      <section className="card__container">
        <h1>Información del automóvil</h1>
        <article className="info__container">
          <img src="/images/icons/auto.svg" alt="auto" />
          <ul>
            <li>
              <h6>Placa</h6>
              <p>{response.placa}</p>
            </li>
            <li>
              <h6>Marca</h6>
              <p>{response.brand} {response.line}</p>
            </li>
            <li>
              <h6>Modelo</h6>
              <p>{response.model}</p>
            </li>
            <li>
              <h6>Cilindraje</h6>
              <p>falta</p>
            </li>
            <li>
              <h6>Nombre propietario</h6>
              <p>{censorWord(response.name)} {censorWord(response.lastName)}</p>
            </li>
          </ul>         
        </article>
        <footer>
          Esta información se extrae directamente del RUNT,<br/> si hay algún error debes ponerte en contacto con ellos.
        </footer>
      </section>

      {quotation &&
        <>
          <h2 className="soat__title">
            Este es el precio de tu SOAT
            <br />
            sin el bono de descuento
          </h2>
          <section className="soat__container">
            <article>
              <h3>{quotation.producto}</h3>
              <p>Costo: $ {quotation && quotation.imp_total && quotation.imp_total.toLocaleString()}</p>
            </article>
            <img src={`/images/secures_logos/${quotation.cod_aseguradora}.png`} alt="seguro" />
          </section>
        </>
      }

      <h2 className="bono__title">
        Para calcular tu bono de descuento,<br />
        requerimos los siguientes datos
      </h2>
      <section className="bono__container">
        <Form.Item>
          <p>Correo electrónico</p>
          <Input defaultValue={''} onChange={(value) => setEmail(value.target.value)} name="email"/>
          {formError && formError.email && <span className="error">Por favor inserta un email valido!</span>}
        </Form.Item>
        <Form.Item>
          <p>Celular</p>
          <Input defaultValue={''} onChange={(value) => setPhoneNumber(value.target.value)} name="movil"/>
          {formError && formError.phoneNumber && <span className="error">Por favor inserta un celular! <br/>Estructura del telefono: 1234567890</span>}
        </Form.Item>
      </section>

      <section className="nextstep__container">
        <Button type="primary" onClick={nextSubmit} className="btn--nextstep">
          Siguiente
        </Button>
      </section>
    </>
  ): (
    <div className="spin-container not--dates">
      <Spin tip="Cargando..." size="large"/>
    </div>
  );
}

export default FirstForm;
