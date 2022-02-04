export type ApplicationMode = 'live' | 'edit';

export interface IComponentSettingsDictionary {
    [key: string]: IComponentSettings;
}

export interface IComponentSettings {
    id?: string;
    name?: string;
    description?: string;
    settings: string;
}