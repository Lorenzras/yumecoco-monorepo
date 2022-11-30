import { Box, Divider, Grid, LinearProgress } from '@mui/material';
import { useMemo, useRef } from 'react';
import { KanaNavigation } from '../common/KanaNavigation';
import { TownButton } from '../common/TownButton';
import { useGroupedTowns } from '../hooks/useGroupedTowns';

export const Towns = (props : {
  prefecture: string,
  city: string,
  handleClick: (params: {
    town: string,
    postalCode: string,
  }) => void
}) => {
  const {
    handleClick,
    prefecture,
    city,
  } = props;

  const kanaRows = useRef<Array<HTMLElement | null>>([]);
  const { data: sortedTowns, isFetching } = useGroupedTowns({ prefecture, city });
  const kanaKeys = useMemo(() => sortedTowns?.map(([key]) => key), [sortedTowns]);

  if (isFetching) {
    return <LinearProgress />;
  }

  return (
    <Box>
      <KanaNavigation 
        kanaKeys={kanaKeys || []}
        kanaRowsRef={kanaRows}
      />
      {
      sortedTowns
        ?.map(([groupKey, values], index) => {
          return (
            <Grid
              key={groupKey}
              ref={(el) =>  kanaRows.current[index] = el}
              container
              item
              xs={12}
              pb={2}
              p={4}
              spacing={2}
            >
              <Grid item xs={12}>
                <Divider textAlign='left'>
                  {groupKey}
                </Divider>
              </Grid>
              {
              values.map(({ id, town, townReading, postalCode }) => {
                return (
                  <Grid key={id} item xs={3}>
                    <TownButton 
                      town={town}
                      townReading={townReading}
                      postalCode={postalCode}
                      handleClick={() => handleClick({
                        town,
                        postalCode,
                      })}
                    />
                  </Grid>
                );
              })
            }

            </Grid>
          );
        })
    }
    </Box>
  );
};