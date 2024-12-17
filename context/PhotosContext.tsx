import {createContext, useContext, useEffect, useState} from "react";
import useUserPhotos from "@/hooks/useUserPhotos";
import usePhotosAI from "@/hooks/usePhotosAI";
import {useSettings} from "@/context/SettingsContext";
import {GalleryAsset} from "@/constants/Types";

interface IPhotosContext {
    galleryAssets: GalleryAsset[],
    isPhotosPermission: boolean,
}

export const PhotosContext = createContext<IPhotosContext>({} as IPhotosContext);

export const usePhotos = () => {
    return useContext(PhotosContext);
};

export const PhotosProvider = ({children}: { children: React.ReactNode; }) => {
    const {models, refreshAssets, setRefreshAssets} = useSettings()

    const {refreshGalleryAssets, finishedRefreshing,
        galleryAssets, setGalleryAssets, isPhotosPermission} = useUserPhotos();

    const [selectedModels, setSelectedModels] = useState<string[]>(["yolo11x.pt"])

    usePhotosAI({galleryAssets, updateSingleGalleryAsset, setAssetProcessed, selectedModels, finishedRefreshing});

    useEffect(() => {
        if (!refreshAssets) return;
        console.log("Assets refreshed!");
        refreshGalleryAssets();
        setRefreshAssets(false);
    }, [refreshAssets]);

    useEffect(() => {
        setSelectedModels(models
            .filter(f => f.selected)
            .map(m => m.value));
    }, [models]);

    function updateSingleGalleryAsset(updatedAsset: GalleryAsset) {
        setGalleryAssets(current => {
            if (current === undefined) return;

            return current
                .map(a => {
                    if (a.localUri === updatedAsset.localUri)
                        return updatedAsset;
                    return a;
                })
        });
    }

    function setAssetProcessed(localUri: string, isProcessed: boolean) {
        setGalleryAssets(current => {
            if (current === undefined) return;

            return current.map(a => {
                if (a.localUri === localUri)
                    a.isProcessed = isProcessed;
                return a;
            });
        })
    }

    const value = {
        galleryAssets,
        isPhotosPermission,
    };

    return (
        //@ts-ignore
        <PhotosContext.Provider value={value}>
            {children}
        </PhotosContext.Provider>
    );
};
