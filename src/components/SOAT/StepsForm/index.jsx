import React, { useState } from "react";
import { Form, Steps, message, Row, Col } from 'antd';
import { reduxForm } from 'redux-form';
import FirstForm from './FirstForm';
import SecondForm from './SecondForm';
import ThirdForm from './ThirdForm';
import './stepsForm.scss';
import { connect } from "react-redux";
import { vehicleInfo, clientInfo, buySoat, buySoatForm } from '../../../redux/actions';

const { Step } = Steps;

const StepsForm = ({
  vehicleInfoState,
  vehicleInfo,
  clientInfoState,
  clientInfo,
  buySoat,
  buySoatState,
  response,
  buySoatForm,
  idLeadSharp,
}) => {
  const [current, setCurrent] = useState(0);
  const [success, setsuccess] = useState(false);
  const onFinish = (values) => {
    const requestData = {
      vehicle_info: vehicleInfoState,
      client_info: clientInfoState,
      buy_soat: values ? values : {},
    };
    buySoatForm(requestData);
    //message.success('¡Proceso completado!');
    setsuccess(true);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  console.log(response);
  const steps = [
    {
      title: 'Tu vehiculo',
      content: (
        <FirstForm
          idLeadSharp={idLeadSharp}
          next={next}
          current={current}
          vehicleInfo={vehicleInfo}
          response={response}
          key={Math.random()}
        />
      ),
    },
    {
      title: 'Tus datos',
      content: (
        <SecondForm
          idLeadSharp={idLeadSharp}
          next={next}
          prev={prev}
          current={current}
          clientInfo={clientInfo}
          response={response}
          key={Math.random()}
        />
      ),
    },
    {
      title: 'Compra tu SOAT',
      content: (
        <ThirdForm
          prev={prev}
          idLeadSharp={idLeadSharp}
          current={current}
          butSoat={buySoat}
          success={success}
          currentQuote={response && response.currentQuote}
          endDate={response && response.endDate}
          billValue={response && response.valorPrima}
          billNumber={response && `${response.identification}-${response.placa}-${response.valorPrima}`}
          key={Math.random()}
        />
      ),
    },
  ];

  return (
    <>
      <Row>
        <Col className="col-steps-title" xs={24}>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
        </Col>
      </Row>
      <div className="steps-content">
        <Form
          name="soat-form"
          className="soat-form"
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 14,
          }}
          size="default"
        >
          {steps[current].content}
        </Form>
      </div>
    </>
  );
};

const mapStateToProps = (globalState) => {
  const state = globalState.app;
  return ({
    vehicleInfoState: state.vehicle_info_soat,
    clientInfoState: state.client_info_soat,
    buySoatState: state.buy_soat,
    response: state.response,
  });
};

const mapDispatchToProps = {
  vehicleInfo,
  clientInfo,
  buySoat,
  buySoatForm,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({
  form: 'soat-form',
})(StepsForm));
