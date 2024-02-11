import { useEffect, useState } from 'react';
import { Button, Container, FormGroup, Input, Label } from './styles';
import clockIcon from '../../assets/clock-icon.png';

interface IOperationProps {
  fetchDataFromApi: (weightChar: string) => void;
  onChangeIntervalId: (intervalId: number) => void;
  onClearFetcher: () => void;
}

export function Operations({
  fetchDataFromApi,
  onChangeIntervalId,
  onClearFetcher,
}: IOperationProps) {
  const [isInputEnabled, setIsInputEnabled] = useState(true);
  const [isChannelOpen, setIsChannelOpen] = useState(false);
  const [weightChar, setWeightChar] = useState<string>('');

  useEffect(() => {
    if (isChannelOpen) {
      handleStartFetching();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weightChar]);

  const handleWeightCharChange = (event: React.FormEvent<HTMLInputElement>) => {
    setWeightChar(event.currentTarget.value);

    if (isChannelOpen) {
      setIsInputEnabled(false);
    }

    setTimeout(() => {
      setIsInputEnabled(true);
    }, 4000);
  };

  const checkFieldValidity = () => {
    if (!weightChar) {
      return true;
    }

    return /^[a-z]$/i.test(weightChar);
  };

  const handleStartFetching = () => {
    onClearFetcher();
    const isValid = checkFieldValidity();
    if (!isValid) {
      alert('Please enter a valid character.');
      setWeightChar('');
      return;
    }

    setIsChannelOpen(true);
    fetchDataFromApi(weightChar);

    const fetcher = setInterval(function () {
      fetchDataFromApi(weightChar);
    }, 2000);

    onChangeIntervalId(fetcher);
  };

  return (
    <Container>
      <FormGroup>
        <Label htmlFor="character-input">CHARACTER</Label>
        <Input
          type="text"
          id="character-input"
          placeholder="Character"
          maxLength={1}
          value={weightChar}
          onChange={handleWeightCharChange}
          disabled={!isInputEnabled}
        />
      </FormGroup>
      <img src={clockIcon} />
      <Button onClick={handleStartFetching}>GENERATE 2D GRID</Button>
    </Container>
  );
}
