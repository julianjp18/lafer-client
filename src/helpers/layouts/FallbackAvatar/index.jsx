import { Avatar, Spin } from 'antd';
import { string } from 'prop-types';
import React, { useState } from 'react';

const FallbackAvatar = ({ logo, name }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      {!loaded && <Spin size="large" />}
      <Avatar
        style={loaded ? {} : { display: 'none' }}
        alt={name}
        src={logo}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

FallbackAvatar.propTypes = {
  logo: string.isRequired,
  name: string.isRequired,
};

export default FallbackAvatar;
