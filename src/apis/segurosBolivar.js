import axios from "axios";

const PASSWORD_ASESOR = "";
const QUOTATION_ENDPOINT = "";
const HEADERS = {
  "accept": "application/json",
  "Content-Type": "application/json",
  "x-api-key": "",
};

export const getQuote = async (userData, numerodeliquidacion) => {
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");
myHeaders.append("x-api-key", "");

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

  const url = "";
  const response = await fetch("https://cors-anywhere.herokuapp.com/" + url, requestOptions)
  
  console.log(response);
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
