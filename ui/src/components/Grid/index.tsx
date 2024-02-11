import { StringMatrix } from '../../types/random-code';
import { GridCell, GridRow, GridTable } from './styles';

interface IGridProps {
  randomCode?: StringMatrix;
}

export function Grid({ randomCode }: IGridProps) {
  return (
    <section>
      <GridTable>
        <tbody>
          {randomCode?.map((row, rowIndex) => (
            <GridRow key={rowIndex}>
              {row.map((cell, colIndex) => (
                <GridCell key={colIndex}>{cell}</GridCell>
              ))}
            </GridRow>
          ))}
        </tbody>
      </GridTable>
    </section>
  );
}
