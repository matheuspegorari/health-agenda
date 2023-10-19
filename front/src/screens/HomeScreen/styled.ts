import styled from "styled-components";

export const Title = styled.h1`
  color: var(--text-color);
  font-size: 26px;
  font-weight: 700;
  line-height: normal;

  margin-bottom: 12px;
`;

export const Description = styled.p`
  color: var(--text-color);
  font-size: 16px;
  font-weight: 400;
  line-height: normal;

  margin-bottom: 16px;
`;

export const Subtitle = styled.h2`
  color: var(--text-color);
  font-size: 24px;
  font-weight: 600;
  line-height: normal;

  margin-top: 56px;
  margin-bottom: 12px;
`;

export const CardUnity = styled.div`
  h3 {
    color: var(--text-color);
    font-size: 20px;
    font-weight: 400;
    line-height: normal;

    margin-top: 8px;
  }

  &:hover {
    opacity: 0.8;
  }
`;
