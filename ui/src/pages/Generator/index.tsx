import { useCallback, useEffect, useState } from 'react';
import { StringMatrix, TwoDigits } from '../../types/random-code';
import randomCodeClient from '../../clients/RandomCodeClient';
import systemClockClient from '../../clients/SystemClockClient';
import { Grid } from '../../components/Grid';
import { Result } from '../../components/Result';
import { Operations } from '../../components/Operations';

export function Generator() {
  const [randomCode, setRandomCode] = useState<StringMatrix>(
    Array.from({ length: 10 }, () => Array(10).fill('--')),
  );
  const [generatedCode, setGeneratedCode] = useState<string>('??');
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

  const clearFetcher = useCallback(() => {
    if (!intervalId) return;
    clearInterval(intervalId);
  }, [intervalId]);

  useEffect(() => {
    return () => {
      clearFetcher();
    };
  }, [clearFetcher]);

  const getTwoDigitsSecond = (systemClock: Date): TwoDigits => {
    const parsedSeconds = ('0' + systemClock.getSeconds()).slice(-2);
    return parsedSeconds.split('').map(Number) as TwoDigits;
  };

  const fetchDataFromApi = (weightChar: string) => {
    const matrix = randomCodeClient.get(weightChar);
    const systemClock = systemClockClient.get();
    Promise.all([matrix, systemClock])
      .then((values) => {
        setRandomCode(values[0]);
        const twoDigits = getTwoDigitsSecond(new Date(values[1]));
        const firstChar = getFromMatrix(values[0], twoDigits[0], twoDigits[1]);
        const firstCharOccurence = countOccurrences(values[0], firstChar);
        const secondChar = getFromMatrix(values[0], twoDigits[1], twoDigits[0]);
        const secondCharOccurence = countOccurrences(values[0], secondChar);
        setGeneratedCode(`${firstCharOccurence}${secondCharOccurence}`);
      })
      .catch((error) => {
        clearFetcher();
        alert(error);
      });
  };

  const getFromMatrix = (grid: StringMatrix, x: number, y: number): string => {
    return grid[x][y];
  };

  const countOccurrences = (grid: StringMatrix, char: string) => {
    const occurrences = grid.flat().filter((cell) => cell === char).length;
    if (occurrences <= 9) {
      return occurrences;
    }

    return occurrences / findLowestIntegerDenominator(occurrences);
  };

  function findLowestIntegerDenominator(target: number) {
    let denominator = 2;
    const limit = 9;

    while (target % denominator !== 0 || target / denominator > limit) {
      denominator++;
    }

    return denominator;
  }

  return (
    <main>
      <Operations
        fetchDataFromApi={fetchDataFromApi}
        onChangeIntervalId={setIntervalId}
        onClearFetcher={clearFetcher}
      />
      <Grid randomCode={randomCode} />
      <Result generatedCode={generatedCode} intervalId={intervalId} />
    </main>
  );
}
