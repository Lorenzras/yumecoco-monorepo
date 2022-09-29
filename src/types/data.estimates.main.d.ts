declare namespace Estimates.main {
  interface Data {
    projId: kintone.fieldTypes.Number;
    contractDate: kintone.fieldTypes.Date;
    envRecipients: kintone.fieldTypes.SingleLineText;
    税: kintone.fieldTypes.Number;
    顧客名: kintone.fieldTypes.SingleLineText;
    estimateStatus: kintone.fieldTypes.SingleLineText;
    voidedEnvelopes: kintone.fieldTypes.SingleLineText;
    工事種別名: kintone.fieldTypes.SingleLineText;
    工事名称: kintone.fieldTypes.SingleLineText;
    envId: kintone.fieldTypes.SingleLineText;
    envStatus: kintone.fieldTypes.SingleLineText;
    工事種別利益: kintone.fieldTypes.Number;
    projTypeId: kintone.fieldTypes.Number;
    contractPrice: kintone.fieldTypes.Number;
    signMethod: kintone.fieldTypes.SingleLineText;

    envDocFileKeys: kintone.fieldTypes.File;
    内訳: {
      type: "SUBTABLE";
      value: Array<{
        id: string;
        value: {
          大項目: kintone.fieldTypes.SingleLineText;
          数量: kintone.fieldTypes.Number;
          原価: kintone.fieldTypes.Number;
          部材名: kintone.fieldTypes.SingleLineText;
          部材利益率: kintone.fieldTypes.Number;
          中項目: kintone.fieldTypes.SingleLineText;
          taxType: kintone.fieldTypes.SingleLineText;
          単位: kintone.fieldTypes.SingleLineText;
        };
      }>;
    };
  }
  interface SavedData extends Data {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新者: kintone.fieldTypes.Modifier;
    作成者: kintone.fieldTypes.Creator;
    レコード番号: kintone.fieldTypes.RecordNumber;
    更新日時: kintone.fieldTypes.UpdatedTime;
    作成日時: kintone.fieldTypes.CreatedTime;
  }
}
