export interface ISearchData {
  info: {
    even: { key: string; value: string }[];
    odd: { key: string; value: string }[];
    adaptations: {
      num: string;
      description: "BWE control unit configuration: Without";
      docId: "";
    }[];
    // ffuAdaptations?: {};
    aggregateInfo: {
      type: string;
      num: number;
      vehicleType: string;
    };
  };
}
