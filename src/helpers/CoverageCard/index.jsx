import React from "react";
import Button from "../Button";
import InsuCard from "../InsuCard";
import SegurosMundial from '../../assets/images/seguros-mundial.png';
import "./coverageCard.scss";

const CoverageCard = ({ backButton }) => {
  return (
    <div className='cobertura'>
      <div className='contane'>
        <InsuCard
          secureName={'SOAT Seguros Mundial'}
          price={'556.000'}
        />
        <div className='detalle'>
          <div className='benefits'>
            <div className='iconText'>
              <div className='group'>
                <img
                  alt=""
                  src={SegurosMundial}
                />
              </div>
              <p
                className='gastosMedicosQuirurgicosFarmaceutic'
              >
                Gastos médicos, quirúrgicos, farmacéuticos y
                hospitalarios:
                <br />$ 22.083.093
              </p>
            </div>
            <div className='iconText'>
              <div className='group'>
                <img
                  alt=""
                  src="https://static.overlay-tech.com/assets/a348b627-ebd8-4fca-bacb-357cde8c5b32.svg"
                />
              </div>
              <p
                className='incapacidadPermanente4968696'
              >
                Incapacidad permanente: $ 4.968.696
              </p>
            </div>
            <div className='iconText'>
              <div className='group'>
                <img
                  alt=""
                  src="https://static.overlay-tech.com/assets/cbc793aa-7c4d-439d-a930-2b8c64c03b37.svg"
                />
              </div>
              <p
                className='muerteDeLaVictimaYGastosFunerarios'
              >
                Muerte de la víctima y gastos
                <br />
                funerarios: $ 20.702.900
              </p>
            </div>
            <div className='iconText'>
              <div className='group'>
                <img
                  alt=""
                  src="https://static.overlay-tech.com/assets/b13c6c87-83bd-4b51-a9eb-b907945da26b.svg"
                />
              </div>
              <p
                className='gastosDeTransporteYMovilizacionDeL'
              >
                Gastos de transporte y movilización <br />
                de las víctimas: $ 276.039
              </p>
            </div>
          </div>
        </div>
        <Button text='Volver' onClick={backButton} />
      </div>
      <a onClick={backButton}>
        <img
          alt=""
          className='vector'
          src="https://static.overlay-tech.com/assets/3802673c-b377-4bac-a912-c9f02dac6a21.svg"
        />
      </a>
    </div>
  );
};

export default CoverageCard;