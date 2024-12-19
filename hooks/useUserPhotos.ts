import * as MediaLibrary from 'expo-media-library';
import {useEffect, useState} from "react";
import {useStorage} from "@/hooks/useStorage";
import {GalleryAsset} from "@/constants/Types";


export default function useUserPhotos() {
    const albumName: string = 'PhotoRecall';
    const storageKey: string = 'assets';
    const {storeDataJSON, getDataJSON} = useStorage();

    const [isPhotosPermission, requestPermission] = MediaLibrary.usePermissions();
    const [galleryAssets, setGalleryAssets] = useState<GalleryAsset[]>();
    const [finishedRefreshing, setFinishedRefreshing] = useState<boolean>(false);

    useEffect(() => {
        refreshGalleryAssets().then()
    }, []);

    useEffect(() => {
        if (galleryAssets !== null && galleryAssets !== undefined) {
            storeDataJSON(storageKey, galleryAssets).then();
        }
    }, [galleryAssets]);

    async function refreshGalleryAssets() {
        if (!isPhotosPermission) {
            await requestPermission().then(() => getGalleryAssets());
        }
        else {
            await getGalleryAssets();
        }

        setFinishedRefreshing(true);
    }

    async function getGalleryAssets() {
        setFinishedRefreshing(false);

        let storedAssets: GalleryAsset[] | null = await getDataJSON(storageKey);
        let userAssets = await getAssets(albumName);

        if (storedAssets === null) {
            if (userAssets !== null) setGalleryAssets(userAssets);
            return;
        }

        if (userAssets === null) {
            setGalleryAssets([]);
            return;
        }

        let newAssets: GalleryAsset[] = [];
        for (let i = 0; i < userAssets.length; i++) {
            let foundIndex = storedAssets.findIndex(f => f.localUri === userAssets[i].localUri);

            if (foundIndex !== -1) {
                newAssets.push(storedAssets[foundIndex]);
                continue;
            }

            newAssets.push(userAssets[i]);
        }
        setGalleryAssets(newAssets);
    }

    async function getAssets(albumName: string) {
        let album = await MediaLibrary.getAlbumAsync(albumName)

        const assetsAlbum = await MediaLibrary.getAssetsAsync(
            {album: album, mediaType: 'photo'}
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

        let localUri = res['localUri'] ?? "";
        let photoName = localUri.split("/").at(-1) ?? "";

        let asset: GalleryAsset = {
            name: photoName,
            localUri: localUri,
            classes: [],
            classNames: [],
            processedBy: [],
            isProcessed: false,
        };

        return asset;
    }

    return {refreshGalleryAssets, finishedRefreshing, galleryAssets, setGalleryAssets, isPhotosPermission}
}
