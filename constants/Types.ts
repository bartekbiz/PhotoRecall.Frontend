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
    name: string,
    localUri: string,
    classes: number[],
    classNames: string[],
    processedBy: string[],
    isProcessed: boolean
}

export type PredictionResult = {
    class: number,
    name: string
}

