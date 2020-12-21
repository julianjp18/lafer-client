import { Empty } from 'antd';
import { string } from 'prop-types';
import React from 'react';

const EmptyState = ({ description }) => {
  return (
    <Empty description={description} image={Empty.PRESENTED_IMAGE_SIMPLE} />
  );
};

EmptyState.propTypes = {
  description: string.isRequired,
};

export default EmptyState;
