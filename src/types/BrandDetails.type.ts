export interface BrandsDetails {
    data: brandItem;
}

export interface brandItem {
    _id:       string;
    name:      string;
    slug:      string;
    image:     string;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
}
