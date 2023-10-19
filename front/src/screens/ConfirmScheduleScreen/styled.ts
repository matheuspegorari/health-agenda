import styled from "styled-components";

export const Title = styled.h1`
  color: var(--text-color);
  font-size: 26px;
  font-weight: 700;
  line-height: normal;
`;

export const Description = styled.p`
  color: var(--text-color);
  font-size: 16px;
  font-weight: 400;
  line-height: normal;

  margin-top: 12px;
  margin-bottom: 40px;
`;

export const Info = styled.p`
  color: var(--text-color);
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;

  margin-bottom: 24px;
`;

export const Card = styled.div`
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  height: auto;
  padding: 24px;
  border-radius: 16px;
  background: rgba(11, 210, 91, 0.1);

  h2 {
    color: var(--text-color);
    font-family: Montserrat;
    font-size: 24px;
    font-weight: 700;
    line-height: 100%; /* 24px */
  }

  h3 {
    color: var(--text-color);
    font-size: 16px;
    font-weight: 400;
    line-height: 100%; /* 16px */

    margin-top: 6px;
  }

  h4 {
    color: var(--text-color);
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 600;
    line-height: 100%; /* 14px */

    margin-bottom: 4px;
  }

  p {
    color: var(--text-color);
    font-size: 12px;
    font-weight: 400;
    line-height: 120%; /* 12px */
  }

  span {
    color: var(--text-color);
    font-size: 12px;
    font-weight: 400;
    line-height: 120%; /* 12px */

    display: flex;
    align-items: center;
    gap: 12px;
  }
`;
