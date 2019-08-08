import React from 'react';
import styled from 'styled-components';
import colorConvert from 'colorConvert';
import { animated, useSpring } from 'react-spring';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { recordGAEvent } from 'helpers';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 1rem;
  right: 2rem;
  font-size: 0.9em;
  .values {
    margin: 1rem 0 0 auto;
    padding: 0.4em 0.5em;
    line-height: 1;
    font-family: ${p => p.theme.fontFixed};
    background: ${p => p.theme.previewOverlayColor};
    color: ${p => p.theme.backgroundColor};
    border-radius: 0.3em;
    cursor: copy;
  }
`;

const CopyOnClick = ({ string, children }) => {
  return (
    <CopyToClipboard
      text={string}
      onCopy={() => {
        recordGAEvent('User', 'Clicked', 'Copy color');
      }}
    >
      <div className="values" title={`Copy CSS value "${string}"`}>
        {children}
      </div>
    </CopyToClipboard>
  );
};

export default function ColorValues({ colorValues }) {
  const values = useSpring({
    config: { duration: 400 },
    rgb: colorValues.rgb,
    hsl: colorValues.hsl
  });

  const cssStrings = {
    rgb: `rgb(${colorValues.rgb[0]}, ${colorValues.rgb[1]}, ${colorValues.rgb[2]})`,
    hsl: `hsl(${colorValues.hsl[0]}, ${colorValues.hsl[1]}%, ${colorValues.hsl[2]}%)`,
    hex: `#${colorValues.hex}`
  };

  return (
    <StyledDiv>
      <CopyOnClick string={cssStrings.rgb}>
        RGB
        <animated.span>
          {values.rgb.interpolate((...rgb) => {
            const [r, g, b] = rgb.map(v => Math.round(v));
            return ` ${r}, ${g}, ${b}`;
          })}
        </animated.span>
      </CopyOnClick>
      <CopyOnClick string={cssStrings.hsl}>
        HSL
        <animated.span>
          {values.hsl.interpolate((...hsl) => {
            const [h, s, l] = hsl.map(v => Math.round(v));
            return ` ${h}, ${s}%, ${l}%`;
          })}
        </animated.span>
      </CopyOnClick>
      <CopyOnClick string={cssStrings.hex}>
        #
        <animated.span>
          {values.rgb.interpolate((r, g, b) => colorConvert.rgb.toHex([r, g, b]))}
        </animated.span>
      </CopyOnClick>
    </StyledDiv>
  );
}