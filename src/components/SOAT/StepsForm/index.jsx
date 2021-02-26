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
}) => {
  const [current, setCurrent] = useState(0);
  const onFinish = (values) => {
    const requestData = {
      vehicle_info: vehicleInfoState,
      client_info: clientInfoState,
      buy_soat: values ? values : {},
    };
    buySoatForm(requestData);
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
          next={next}
          current={current}
          vehicleInfo={vehicleInfo}
          clientInfo={clientInfo}
          response={response}
          key={Math.random()}
        />
      ),
    },
    {
      title: 'Tus datos',
      content: (
        <SecondForm
          next={next}
          prev={prev}
          current={current}
          clientInfo={clientInfo}
          response={clientInfoState}
          key={Math.random()}
        />
      ),
    },
    {
      title: 'Compra tu SOAT',
      content: (
        <ThirdForm
          current={current}
          butSoat={buySoat}
          response={response}
          clientInfo={clientInfoState}
          key={Math.random()}
        />
      ),
    },
  ];

  return (
    <main className="steps-content">
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
    </main>
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
