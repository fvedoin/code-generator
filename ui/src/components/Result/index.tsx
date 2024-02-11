import { Container, LiveCircle, LiveContainer, ResultConsole } from './styles';

interface IResultProps {
  intervalId?: NodeJS.Timeout;
  generatedCode: string;
}

export function Result({ generatedCode, intervalId }: IResultProps) {
  return (
    <Container>
      {intervalId && (
        <LiveContainer>
          <LiveCircle />
          <p>LIVE</p>
        </LiveContainer>
      )}
      <ResultConsole>
        <p>
          YOUR CODE: <strong>{generatedCode}</strong>
        </p>
      </ResultConsole>
    </Container>
  );
}
