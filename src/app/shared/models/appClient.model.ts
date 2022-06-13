export interface AppClient {
    companyCode: string;
    ipAddress:string;
    isActive: string;
    appEnvironment: string;
}

export interface AppClientUpdate extends AppClient {
    clientId:any;
}