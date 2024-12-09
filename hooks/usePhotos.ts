import * as MediaLibrary from 'expo-media-library';
import {useEffect, useState} from "react";
import {useStorage} from "@/hooks/useStorage";
import {GalleryAsset} from "@/constants/Types";


export default function usePhotos() {
    const albumName: string = "Test";
    const storageKey: string = "assets";
    const {storeDataJSON, getDataJSON} = useStorage();

    const [isPhotosPermission, requestPermission] = MediaLibrary.usePermissions();

    const [galleryAssets, setGalleryAssets] = useState<GalleryAsset[]>();

    useEffect(() => {
        if (!isPhotosPermission) {
            requestPermission()
                .then(() => getGalleryAssets());
        }
        else {
            getGalleryAssets().then();
        }
    }, []);

    useEffect(() => {
        getDataJSON(storageKey)
            .then((storedAssets) => {
                if ((storedAssets === null || storedAssets != galleryAssets)
                    && (galleryAssets !== null && galleryAssets !== undefined)) {

                    storeDataJSON(storageKey, galleryAssets).then();
                }
            });
    }, [galleryAssets]);

    async function getGalleryAssets() {
        getDataJSON(storageKey)
            .then((storedAssets) => {
                if (storedAssets === null) {
                    getAssets(albumName)
                        .then((a) => {
                            if (a !== null) setGalleryAssets(a);
                        })
                }
                else {
                    setGalleryAssets(storedAssets);
                }
            });
    }

    async function getAssets(albumName: string) {
        const assetsAlbum = await MediaLibrary.getAssetsAsync(
            {album: albumName, mediaType: 'photo'}
        )

        if (assetsAlbum === undefined || assetsAlbum == null)
            return null;

        const assets = assetsAlbum['assets']
        const galleryAssets: GalleryAsset[] = []

        for(let i=0; i < assets.length; i++){
            const galleryAsset = await getAssetInfo(assets[i].id);

            if (galleryAsset.localUri === "") continue;
            galleryAssets.push(galleryAsset)
        }

        return galleryAssets;
    }

    async function getAssetInfo(id: string) {
        let res = await MediaLibrary.getAssetInfoAsync(id)

        let asset: GalleryAsset ={
            localUri: res['localUri'] ?? "",
        }

        return asset
    }

    return {galleryAssets, isPhotosPermission}
}
