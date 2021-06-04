export interface IConfigurableComponentProps {
  id?: string;
  name?: string;
  description?: string;
  //settings: string;
}

export declare type StoreValue = any;
export interface Store {
  [name: string]: StoreValue;
}