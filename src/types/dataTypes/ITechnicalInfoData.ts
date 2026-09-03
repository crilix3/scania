export interface ITechnicalInfoData {
  maingroup: number;
  maingroupDesc: string;
  items: {
    even: {
      key: string;
      value: string;
    } | null;
    odd: {
      key: string;
      value: string;
    } | null;
  }[];
}
