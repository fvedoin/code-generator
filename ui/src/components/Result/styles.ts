import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ResultConsole = styled.div`
  border: 1px solid #000;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

export const LiveContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const LiveCircle = styled.div`
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`;
