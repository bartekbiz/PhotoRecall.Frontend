import {GalleryAsset, PredictionResult} from "@/constants/Types";
import {useEffect} from "react";

export type usePhotosAIProps = {
    galleryAssets: GalleryAsset[] | undefined;
    setGalleryAssets: React.Dispatch<React.SetStateAction<GalleryAsset[] | undefined>>;
    selectedModels: string[]
}

export default function usePhotosAI({galleryAssets, setGalleryAssets, selectedModels}: usePhotosAIProps) {
    useEffect(() => {
        if (galleryAssets === undefined) return;

        for (let i = 0; i < galleryAssets.length; i++) {
            if (galleryAssets[i].processedBy === selectedModels) {
                continue;
            }

            fetchPredictions(galleryAssets[i])
                .then((res) => {
                    //console.log(`Image name: ${res.name}, Detected classes: [${res.classes}], Processed: [${res.processedBy}]`);

                    setGalleryAssets(current => {
                        if (current === undefined) return;

                        return current
                            .map(a => {
                                if (a.localUri === res.localUri)
                                    a.classes = res.classes;
                                return a;
                            })
                    });
                })
        }
    }, [selectedModels]);

    async function fetchPredictions(galleryAsset: GalleryAsset) {
        let photo = await getFile(galleryAsset.localUri);

        const formData = new FormData();
        //@ts-ignore
        formData.append('Photo', {
            uri: galleryAsset.localUri,
            name: galleryAsset.name,
            type: photo.type,
        });

        // formData.append("AgreeRatio", "0.0");

        if (selectedModels.length > 0) {
            //console.log(`Selected models: ${selectedModels}`);
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
