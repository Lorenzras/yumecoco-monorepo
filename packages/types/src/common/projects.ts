import { KProjects, IProjects } from './../dbKintone';
import { KeyOfSubtable } from './../utils/KeyOfSubtable';

export type IProjectsAgents = KeyOfSubtable<IProjects['agents']>;
export type IProjectsCustGroup = KeyOfSubtable<IProjects['custGroup']>;
export type KFlatProjects = (KProjects | IProjectsAgents | IProjectsCustGroup);

/* 工事種別 */
export type BuildingType =
| '戸建て'
| 'マンション'
| '店舗/事務所'
| 'その他';


export const recordStatuses = [
  '情報登録のみ',
  '追客中',
  '契約申請中',
  '契約済',
  '工事進行中',
  '工事完了(未精算)',
  '工事完了(精算済)',
  '他決',
  '中止',
  '削除',
  '削除 (工事)',
] as const;

export type RecordStatus = typeof recordStatuses[number];