import {GalleryAsset, PredictionResult} from "@/constants/Types";
import {useEffect} from "react";
import {CompareArrays} from "@/utils/Utils";

export type usePhotosAIProps = {
    galleryAssets: GalleryAsset[] | undefined;
    updateSingleGalleryAsset: (updatedAsset: GalleryAsset) => void;
    setAssetProcessed: (localUri: string, isProcessed: boolean) => void;
    selectedModels: string[],
    finishedRefreshing: boolean;
    agreeRatio: number
}

export default function usePhotosAI({galleryAssets,
        updateSingleGalleryAsset, setAssetProcessed,
        selectedModels, finishedRefreshing, agreeRatio}: usePhotosAIProps) {

    useEffect(() => {
        if (!finishedRefreshing) return;
        processAssets().then()
    }, [finishedRefreshing]);

    async function processAssets() {
        if (galleryAssets === undefined) return;
        console.log("AI processing triggered!");

        for (let i = 0; i < galleryAssets.length; i++) {
            if (CompareArrays(galleryAssets[i].processedBy, selectedModels, true) ||
                galleryAssets[i].isProcessed) {
                continue;
            }

            setAssetProcessed(galleryAssets[i].localUri, true);

            fetchPredictions(galleryAssets[i])
                .then((res) => {
                    console.log(`${i}. Detected classes: [${res.classes}], Processed: [${res.processedBy}]`);

                    updateSingleGalleryAsset(res);
                })

            setAssetProcessed(galleryAssets[i].localUri, false);
        }
    }

    async function fetchPredictions(galleryAsset: GalleryAsset) {
        let photo = await getFile(galleryAsset.localUri);

        const formData = new FormData();
        //@ts-ignore
        formData.append('Photo', {
            uri: galleryAsset.localUri,
            name: galleryAsset.name,
            type: photo.type,
        });

        formData.append("AgreeRatio", `${agreeRatio}`);

        if (selectedModels.length > 0) {
            formData.append("YoloModels", JSON.stringify(selectedModels));
        }

        const requestOptions: RequestInit = {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'multipart/form-data'
            },
            redirect: "follow"
        };

        let result = galleryAsset;

        await fetch("http://dev.bartekbiz.net:8080/api/Predictions/GetPredictionsAllDetectedAsync", requestOptions)
            .then((response) => response.text())
            .then((body) => {
                try {
                    let object: PredictionResult[] = JSON.parse(body);
                    galleryAsset.classes = object.map((p) => p.class);

                    galleryAsset.processedBy = selectedModels.length === 0 ? ["all"] : selectedModels;
                }
                catch {
                    throw Error(body);
                }
            })
            .catch((error) => console.error(error));

        return result;
    }

    async function getFile(uri: string) {
        return fetch(uri)
            .then(res => res.blob())
    }
}
