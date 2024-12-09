export type NavParams = {
    GalleryHome: undefined;
    GalleryPhotoView: { index: number; assets: GalleryAsset[] };
};

export type DropdownItemType = {
    title: string;
    value: any;
    selected: boolean;
}

export type GalleryAsset = {
    localUri: string
}

