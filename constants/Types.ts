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
    isBeingProcessed: boolean
}

export type PredictionResult = {
    class: number,
    name: string
}

export type DetectionClass = {
    class: number,
    name: string
}

