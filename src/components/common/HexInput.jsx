import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { hexCharsMatch } from '../../regexDefs';
import Input from './Input';

const Styles = styled(Input)`
  width: calc(6ch + 1em);
`;

const validHex = value => hexCharsMatch.test(value) || value === '';

const HexInput = props => {
  const { name, value, onChange } = props;

  const handleChange = e => {
    const { value, name } = e.target;
    const valid = validHex(value);
    if (valid) onChange(e, value || '000000', name);
  };

  return (
    <Styles
      {...props}
      name={name}
      value={value}
      onChange={handleChange}
      type="text"
      pattern="[a-fA-F\d]+"
      placeholder="FFFFFF"
      maxLength="6"
    />
  );
};

HexInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired
};

export default HexInput;
