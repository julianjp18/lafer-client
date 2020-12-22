import React from 'react';
import { connect } from 'react-redux';
import { getNews } from '../redux/actions';

const Button=({getNews})=>(
   <button onClick={getNews}>Press to see news</button>
)
const mapDispatchToProps = {
     getNews: getNews,
};
export default connect(null,mapDispatchToProps)(Button);