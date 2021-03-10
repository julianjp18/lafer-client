import React, { useState } from "react";
import { Form, Input, Row, Col, Button, Select, Modal } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

const { Option } = Select;

function SecondForm({ next, prev, clientInfo, response }) {
  const [visible, setVisible] = useState({
    show: false,
    id: null
  });
  const [cotizacion, setCotizacion] = useState(response ? response.cotizaciones.filter(c=>c.cotizacion_nro===100) : null);
  const [clientData, setClientData] = useState(response ? response : {});

  const nextSubmit = (id) => {
    debugger;
    const soat = cotizacion && cotizacion.filter(c=>c.cotizacion_nro===id)[0]
    clientData.selectedSoat = soat
    clientInfo(clientData);
    next();
  };

  
  return (
    <>
      {/* <h1 className="paycard__container--title">Escoge el BONO de tu SOAT</h1> */}
      {cotizacion && Object.values(cotizacion).map((data, key) => {
        return (
          <section className="paycard__container" key={key}>
            <h2>{data.producto}</h2>
            <article className="paycard__container--info">
              <section className="info__container">
                {data.cotizacion_nro === 100 && (
                  <>
                    {data.imp_total && (
                      <p className="info__container--descuento">Costo: ${data.imp_total.toLocaleString()}</p>
                    )}
                    <p>Bono: {data.discount_text}</p>
                    <p><b>Costo: {data.discount_total}</b></p>
                  </>
                )}
                {data.cotizacion_nro === 2 && (
                  <>
                    <p>Bono: {data.discount_text} millas</p>
                    <p><b>Costo: {data.discount_total}</b></p>
                  </>
                )}
              </section>
              <section className="logo__container">
                {data.logo && data.miles ? (
                  <>
                    <img src={`/images/secures_logos/${data.cod_aseguradora}.png`} alt="seguro" />
                    <img src={`/images/secures_logos/miles.png`} alt="seguro" className="img-smiles" />
                  </>
                ) : (
                  <img src={`/images/secures_logos/${data.cod_aseguradora}.png`} alt="seguro" className="img-not-smiles"/>
                )}
              </section>
            </article>
            <article className="payment__container">
              <h4>Medios de pago:</h4>
              <img src="/images/cards_logos/mastercard.png" alt="mastercard"/>
              <img src="/images/cards_logos/visa.png" alt="visa"/>
              <img src="/images/cards_logos/pse.png" alt="pse"/>
            </article>
            <span className="btn--coberturas">
              <a
                onClick={() =>
                  setVisible({
                    show: true,
                    id: key
                  })
                }
              >
                Ver coberturas
              </a>
              {visible.show && visible.id === key && (
                <Modal
                  title={data.producto}
                  centered
                  visible={visible}
                  onOk={() => setVisible({ show: false, id: null })}
                  onCancel={() => setVisible({ show: false, id: null })}
                  width={330}
                  okText="Volver"
                  wrapClassName="coberturas__modal"
                >
                  <section className="detallesModal__container">
                    <article className="detallesModal__container--info">
                      <section className="info__container">
                        {data.cotizacion_nro === 100 && (
                          <>
                            {data.imp_total && (
                              <p className="info__container--descuento">Costo: ${data.imp_total.toLocaleString()}</p>
                            )}
                            <p>Bono: {data.discount_text}</p>
                            <p><b>Costo: {data.discount_total}</b></p>
                          </>
                        )}
                        {data.cotizacion_nro === 2 && (
                          <>
                            <p>Bono: {data.discount_text} millas</p>
                            <p><b>Costo: {data.discount_total}</b></p>
                          </>
                        )}
                      </section>
                      <section className="logo__container">
                        {data.logo && data.miles ? (
                          <>
                            <img src={`/images/secures_logos/${data.cod_aseguradora}.png`} alt="seguro" />
                            <img src={`/images/secures_logos/miles.png`} alt="seguro" className="img-smiles" />
                          </>
                        ) : (
                          <img src={`/images/secures_logos/${data.cod_aseguradora}.png`} alt="seguro" className="img-not-smiles"/>
                        )}
                      </section>
                    </article>
                    <ul className="cobertura__modal">
                      {data.coberturas.map((obj)=>{
                        return (
                          <li><CheckOutlined /> {obj}</li>
                        )
                      })}
                    </ul>

                  </section>
                </Modal>
              )}
            </span>
            <Button type="primary" onClick={()=>nextSubmit(data.cotizacion_nro)} className="btn--next">
              {data.discount_id === 1 ? (<span>Comprar SOAT con descuento</span>) : (<span>Ganar millas con mi SOAT</span>)}
            </Button>
          </section>
        )
      })}
    </>
  );
}

export default SecondForm;