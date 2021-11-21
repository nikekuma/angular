export interface FilterModel {
    'brands': Array<String>;
    'prices': Array<String>;
    'rams': Array<String>;
    'internalMemories': Array<String>;
}

export interface FilterParamModel {
    'brands': Set<String>;
    'prices': Array<String>;
    'rams': Set<String>;
    'internalMemories': Set<String>;
}
