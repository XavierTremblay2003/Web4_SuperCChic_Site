export interface IEAS {
    BeyondOrigin: number;
    BeyondDestination: number;
}

export interface ITCW {
    Weight: number;
    WeightUnits: number;
}

export interface IInsurance {
    PricePerUnit: number;
    UnitAmount: number;
    FreeAmount: number;
    TotalCost: number;
    Minimum: number;
}

export interface IRate {
    CarrierCode: number;
    ServiceCode: number;
    ServiceName: string;
    TypeOfRate: number;
    BaseRate: number;
    SubTotal: number;
    Tax: number;
    Total: number;
    FuelSurcharge: number;
    FuelPercentage: number;
    RateZone: string;
    EAS: IEAS;
    TNT: Date;
    CutoffTime: Date;
    LongTNT: string;
    TCW: ITCW;
    PickupCharge: number;
    CurrencyCode: string;
    Residential: number;
    Signature: number;
    AdditionalHandling: number;
    LargePackage: number;
    Insurance: IInsurance;
}

export interface IRatesResponce {
    Rates: IRate[];
    Status: string;
    Messages: string[];
}
