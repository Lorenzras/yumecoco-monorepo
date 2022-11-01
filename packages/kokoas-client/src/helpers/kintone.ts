interface AppRecord {
  recordId: string,
  appId?: string,
  domain?: string
}

export const isMobile : boolean = (window.location.href).includes('k/m');

export const getAppId = () => {
  const url = window.location.href;
  return url.includes('k/m')
    ? kintone.mobile.app.getId()
    : kintone.app.getId();
};

export const getRecordPath = (
  {
    recordId,
    appId,
    domain = '',
  }: AppRecord) : string => {
  // const isDomainEmpty = domain.length > 0;
  const resolvedDomain = domain.length > 0 ? domain : window.location.href;
  const device = isMobile ? 'k/m' : 'k';
  const record = recordId
    ? `show${isMobile ? '?' : '#'}record=${recordId}`
    : '';

  return `https://${resolvedDomain}/${device}/${appId}/${record}`;

};

export const goToRecordPath = (recordDetails : AppRecord) => {
  window?.open(getRecordPath(recordDetails), '_blank')?.focus();
};

export const onEdit : string[] = [
  'app.record.edit.show',
  'mobile.app.record.edit.show',
];

export const onCreate : string[] = [
  'app.record.create.show',
  'mobile.app.record.create.show',
];

export const onEditSubmit = [
  'app.record.edit.submit',
  'mobile.app.record.edit.submit',
];

export const onEditSubmitSuccess : string[] = [
  'app.record.edit.submit.success',
  'mobile.app.record.edit.submit.success',
];

export const onCreateSubmit : string[] = [
  'app.record.create.submit',
  'mobile.app.record.create.submit',
];

export const onCreateSubmitSuccess : string[] = [
  'app.record.create.submit.success',
  'mobile.app.record.create.submit.success',
];

export const onIndexShow = [
  'app.record.index.show',
  'mobile.app.record.index.show',
];

export const onEditOrCreate : string[] = onEdit.concat(onCreate);
export const onSubmit : string[] = onEditSubmit.concat(onCreateSubmit);
export const onSubmitSuccess : string[] = onEditSubmitSuccess.concat(onCreateSubmitSuccess);

export const onFieldChange = (fields : string | string[]) : string[] =>
  ([] as string[]).concat(fields).reduce(
    (acc : string[], curr) : string[] => {
      return acc.concat(
        `app.record.edit.change.${curr}`,
        `mobile.app.record.edit.change.${curr}`,
        `app.record.create.change.${curr}`,
        `mobile.app.record.create.change.${curr}`,
      );
    }, [],
  );

/**
 * @returns Portal Space Element
 */
export const getPortalSpaceElement = () : HTMLElement | null => (
  isMobile
    ? kintone.mobile.portal.getContentSpaceElement()
    : kintone.portal.getContentSpaceElement()
);

/** * Index view ****/

/**
 * Index view
 * kintone...getHeaderMenuSpaceElement() may only be used on PC
 * so on mobile, this function will return kintone...getHeaderSpaceElement()
 * @returns Returns blank element in index view menu
 */
export const getHeaderMenuSpaceElement = () : HTMLElement | null => (
  isMobile
    ? kintone.mobile.app.getHeaderSpaceElement()
    : kintone.app.getHeaderMenuSpaceElement()
);


/**
 * Index view
 * @returns Returns blank element in index view body
 */
export const getHeaderSpaceElement = () : HTMLElement | null => (
  isMobile
    ? kintone.mobile.app.getHeaderSpaceElement()
    : kintone.app.getHeaderSpaceElement()
);


/**
* 要素を表示・非表示
* @param fieldCode  要素のフィールドコード
* @param isShown  trueは表示、falseは非表示
* @returns void
*/
export const setFieldShown = (fieldCode : string, isShown : boolean) => {
  if (isMobile) {
    kintone.mobile.app.record.setFieldShown(fieldCode, isShown);
  } else {
    kintone.app.record.setFieldShown(fieldCode, isShown);
  }
};
