/* stylelint-disable declaration-empty-line-before */
/** for now stylelint ignores stylelint-disable */
import styled from 'styled-components';

export const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const Li = styled.li`
  box-sizing: border-box;
  display: inline-flex;
  height: 6.4rem;
  position: relative;
`;

export const Nav = styled.nav`
  display: grid;
  grid-template-columns: 10rem auto 20rem;
  height: 6.4rem;
  max-height: 6.4rem;
`;

export const A = styled.a<{
  selected?: boolean;
  nohover?: boolean;
  round?: boolean;
}>`
  ${({ selected, nohover, round }) => {
    if (selected) {
      return `
      color: #111;
      font-weight: 325;
    `;
    } else {
      return `
      color: #757575;
      font-weight: 300;
      ${
        round
          ? `
          line-height: 2.8rem;
          outline: none;
          border: 0.1rem solid #d0d0d0;
          border-radius: 0.55rem;`
          : ''
      }
      ${
        nohover
          ? ''
          : `:hover {
              color: #111;
              ${round ? `border-color: #adadad;` : ''}
            }`
      }
    `;
    }
  }}

  text-decoration: none;
  padding: 0 1rem;
  place-self: center;
`;
