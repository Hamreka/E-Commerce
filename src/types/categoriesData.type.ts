export interface CategoriesData {
    results:  number;
    metadata: Metadata;
    data:     categ[];
}

export interface categ {
    _id:       string;
    name:      string;
    slug:      string;
    image:     string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Metadata {
    currentPage:   number;
    numberOfPages: number;
    limit:         number;
}
