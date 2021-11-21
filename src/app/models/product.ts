export interface ProductModel {
    'model': String;
    'thumbnail': String;
    'price': Number;
    'brand': String;
    'features': FeatureModel;
}

export interface FeatureModel {
    'ram': String;
    'internalMemory': String;
}