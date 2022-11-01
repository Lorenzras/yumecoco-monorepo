import { KintoneRecord, APPIDS } from '../../../api/kintone';
import format from 'date-fns/format';


export interface SearchOption {
  name: string,
  id: string,
  subTitle?: string,
  secondaryLabel?: string
  record?: any
}

/**
 * Search customer group app by string.
 * Except for records that were soft deleted
 * as indicated in isDeleted field.
 *
 * @param searchStr The search string.
 * @returns Array of Customer group records
 */
export const searchCustGroup = async (searchStr: string) => {


  return KintoneRecord.getRecords({
    app: APPIDS.custGroup,
    query: [
      `${'customerName' as KeyOfCustomerGroupMembers} like "${searchStr}"`,
      `${'isDeleted' as KeyOfCustomerGroup} < "${+true}"`,
    ].join(' and '),
  }).then((resp) => resp.records as unknown as TypeOfCustomerGroup[]);
};

const convertRecordToOption = (value: string, record: TypeOfCustomerGroup) => {
  const { $id, storeName, 作成日時, members } = record;
  const mainCust = members.value[0].value;
  const mainCustName = mainCust.customerName.value;

  if (mainCustName.includes(value)) {
    return {
      name: mainCustName,
      id: $id.value,
      subTitle: `${storeName.value} ${mainCust.address2.value}`,
      secondaryLabel: format(Date.parse(作成日時.value), 'yyyy-MM-dd' ),
      record: record,
    };
  }
};

export const getCustGroupOptions = async (value : string) => {
  return searchCustGroup(value)
    .then(records => {

      const newOptions = records.reduce<SearchOption[]>((accu, curr)=>{
        const custGrpRec =  curr;
        const convertedOption = convertRecordToOption(value, custGrpRec);
        if (convertedOption) {
          return accu.concat(convertedOption);
        }

        return accu;

      }, []);

      return newOptions;

    });
};