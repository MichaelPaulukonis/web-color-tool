import React from 'react';
import styled, { css } from 'styled-components';
import breakpoints from 'styles/breakpoints';
import { recordGAEvent } from 'helpers';
import { hslTo4x } from 'colorUtils';
import { useBaseColor } from 'contexts/baseColorContext';

const Styles = styled.div`
  margin: 0 -2rem 0;
  ${breakpoints.tablet(css`
    display: flex;
    margin: 0;
    .lum,
    .sat {
      width: 50%;
    }
    .lum {
      margin-right: 1.5rem;
    }
    .sat {
      margin-left: 1.5rem;
    }
  `)};
`;

const Display = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  margin-bottom: 1.5rem;
  ${breakpoints.tablet(css`
    border-radius: 0.5rem;
    margin-bottom: 0;
  `)};
`;

const DisplayButton = styled.button`
  margin: 0;
  border: none;
  display: block;
  height: 4rem;
  flex-grow: 1;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  body.using-keyboard &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem ${p => p.theme.textColor};
  }
`;

const Labels = styled.div`
  margin: 0 2rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  ${breakpoints.tablet(css`
    margin: 0;
  `)};
`;

const ColorAdjustControls = () => {
  const { baseColor, setBaseHslPrecise } = useBaseColor();
  let [h, s, l] = baseColor.hslNormalized;
  const lumAdjusts = [12, 24, 36, 50, 62, 74, 86];
  const satAdjusts = [10, 25, 50, 75, 90];

  const scaleUpAndSet = hslValues => {
    setBaseHslPrecise(hslTo4x(hslValues));
  };

  return (
    <Styles>
      <div className="lum">
        <Labels>
          <div>Shade</div>
          <div>Tint</div>
        </Labels>
        <Display onClick={() => recordGAEvent('User', 'Clicked', 'Shade/tint controls')}>
          {lumAdjusts.map(lum => {
            return (
              <DisplayButton
                key={lum}
                h={h}
                l={lum}
                s={s}
                onClick={() => scaleUpAndSet([h, s, lum])}
                title={`Set lightness to ${lum}%`}
                style={{
                  background: `hsl(${h}, ${s}%, ${lum}%)`
                }}
              />
            );
          })}
        </Display>
      </div>
      <div className="sat">
        <Labels>
          <div>Desaturate</div>
          <div>Saturate</div>
        </Labels>
        <Display onClick={() => recordGAEvent('User', 'Clicked', 'Sat/desat controls')}>
          {satAdjusts.map(sat => {
            return (
              <DisplayButton
                key={sat}
                h={h}
                l={l}
                s={sat}
                onClick={() => scaleUpAndSet([h, sat, l])}
                title={`Set saturation to ${sat}%`}
                style={{
                  background: `hsl(${h}, ${sat}%, 50%)`
                }}
              />
            );
          })}
        </Display>
      </div>
    </Styles>
  );
};

export default ColorAdjustControls;
