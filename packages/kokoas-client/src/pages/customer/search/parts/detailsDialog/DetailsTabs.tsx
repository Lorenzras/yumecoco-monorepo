
import { Box, Tab,  Skeleton  } from '@mui/material';
import {  TabList, TabPanel } from '@mui/lab';
import { DTCustomer } from './customers/DTCustomer';
import { ProjectDetailsContainer } from './projects/ProjectDetailsContainer';
import { useState, useEffect, SyntheticEvent } from 'react';
import { getCustGroup } from '../../../../../api/kintone/custgroups/GET';
import { ButtonEdit } from './ButtonEdit';
import { getConstRecordByIds } from '../../../../../api/kintone/projects/GET';
import { pages } from '../../../../Router';
import { generateParams } from '../../../../../helpers/url';
import { TabContextContainer } from './TabContextContainer';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { ICustgroups, IProjects } from 'types';

export function DetailsTabs(props : {
  custGroupId?: string,
}) {
  const { custGroupId } = props;
  const [tabValue, setTabValue] = useState('1');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const [record, setRecord] = useState<ICustgroups>();
  const [fetchedProjects, setFetchedProjects] = useState<IProjects[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const projectIds =  record?.projects?.value
    .map(item => item.value.projId.value)
    .filter(Boolean) ?? [];

  useDeepCompareEffect(()=>{
    if (projectIds.length && !fetchedProjects && tabValue === '2') {
      getConstRecordByIds(
        projectIds,
      ).then(result => {
        setFetchedProjects(result.records as unknown as IProjects[]);
      });
    }
  }, [projectIds, fetchedProjects, tabValue]);

  useEffect(()=>{
    if (custGroupId) {
      setLoading(true);
      getCustGroup(custGroupId)
        .then(resp => {
          setLoading(false);
          setRecord(resp);
        });
    }
  }, [custGroupId]);

  const isWithProject = Boolean(record?.projects.value
    .filter(item=>item.value.projId.value)
    .length);
  return (
    <TabContextContainer tabValue={tabValue}>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList variant='fullWidth' onChange={handleChange} >
          <Tab label="顧客情報" value="1" />
          <Tab label="工事情報" value="2" disabled={!isWithProject} />
        </TabList>
      </Box>
      <TabPanel value="1">
        <DTCustomer {...{ record, loading }} />
        <ButtonEdit link={`${pages.custGroupEdit}?${generateParams({
          custGroupId,
        })}`}
        />
      </TabPanel>
      <TabPanel value="2">
        {
            fetchedProjects &&
            <ProjectDetailsContainer fetchedProjects={fetchedProjects} />
          }

        {
            !fetchedProjects &&
            <Skeleton variant="rectangular" width={210} height={118} />
          }
      </TabPanel>
    </TabContextContainer>

  );
}
