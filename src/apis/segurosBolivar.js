import axios from "axios";

const PASSWORD_ASESOR = "29528";
const API_KEY = "UK3ncSKYBD3dxMHSCLNVe4QYh6ZHEwbZ4dlc1dSp";
const QUOTATION_ENDPOINT = "https://stg-api-conecta.segurosbolivar.com/stage/seguro-autos/cotizacion";
const HEADERS = {
  "accept": "application/json",
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
};

export const getQuote = async (userData, numerodeliquidacion) => {
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");
myHeaders.append("x-api-key", "UK3ncSKYBD3dxMHSCLNVe4QYh6ZHEwbZ4dlc1dSp");

const {
  vehicle,
  name,
  lastName,
  email,
  address,
  birthDate,
  genre,
  cityCode = 14000,
  phone,
} = userData;

var raw = JSON.stringify({
  "mailTomador": email,
  "celTomador": phone,
  "dirTomador": address,
  "ciuTomador": Number.parseInt(cityCode),
  "nomConductor": `${name} ${lastName}`,
  "sexoConductor": genre,
  "fecNacConductor": birthDate,
  "placaVeh": vehicle,
  "numLiquidacion": Number.parseInt(numerodeliquidacion),
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

const response = await fetch("https://stg-api-conecta.segurosbolivar.com/stage/seguro-autos/cotizacion", requestOptions)
  .then(result => result)
  .catch(error => console.log('error', error));

  if(response.data) return response.data;

  return '';
};

/*
export const getQuote = async (userData, numerodeliquidacion) => {
  const {
    vehicle,
    name,
    lastName,
    email,
    address,
    birthDate,
    genre,
    cityCode = 14000,
    phone,
  } = userData;

  const quotationData = {
    "mailTomador": email,
    "celTomador": phone,
    "dirTomador": address,
    "ciuTomador": Number.parseInt(cityCode),
    "nomConductor": `${name} ${lastName}`,
    "sexoConductor": genre,
    "fecNacConductor": birthDate,
    "placaVeh": vehicle,
    "numLiquidacion": Number.parseInt(numerodeliquidacion),
  };

  const data = await axios.post(QUOTATION_ENDPOINT, quotationData, HEADERS);
  
  const response = await data.json();

  if (response.data) return response.data;

  return '';
};
*/
