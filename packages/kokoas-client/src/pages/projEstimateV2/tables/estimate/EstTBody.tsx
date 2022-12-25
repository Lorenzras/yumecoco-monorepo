import { TableBody } from '@mui/material';
import { 
  useMemo,
  // MouseEvent, 
  // useCallback, 
} from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { TypeOfForm, KeyOfForm } from '../../form';
import { EstTRow } from './EstTRow';

//import { EstTRow } from './EstTRow';

const name: KeyOfForm = 'items';

export const EstTBody = ({
  control,
  isDisabled,
}: {
  control: Control<TypeOfForm> 
  isDisabled: boolean,
}) => {

  
  const { fields: rows } = useFieldArray({
    control,
    name,
  });


  const rowsLength = useMemo(() => rows.length, [rows]);

  return (

    <TableBody>

      {rows.map((row, rowIdx) => {

        const isAtBottom = rowIdx === (rowsLength - 1);
        
        return (

          <EstTRow
            rowIdx={rowIdx}
            control={control}
            key={row.id}
            isAtBottom={isAtBottom}
            isVisible={!isDisabled}
            rowsLength={rowsLength}
            isDisabled={isDisabled}
          />
        );
      })} 
    </TableBody>
  );

};