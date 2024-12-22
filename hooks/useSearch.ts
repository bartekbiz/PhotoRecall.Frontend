import {usePhotos} from "@/context/PhotosContext";
import useDetectionClasses from "@/hooks/useDetectionClasses";


export default function useSearch() {
    const {galleryAssets} = usePhotos()
    const {detectionClasses} = useDetectionClasses();

    async function getSearchResult(phrase: string) {
        let result = await getBasicSearchResult(phrase)
            .catch(error => {console.log(error)});

        if (result === undefined || result.length === 0) {
            result = await getExtendedSearchResult(phrase);
        }

        if (result === undefined) {
            return [];
        }

        return result;
    }

    async function getBasicSearchResult(phrase: string) {
        if (detectionClasses === undefined) return;

        let result: number[] = [];

        for (let i = 0; i < detectionClasses.length; i++) {
            if (detectionClasses[i].name.trim().toLowerCase() === phrase.trim().toLowerCase()) {
                result.push(detectionClasses[i].class);
            }
        }

        return result;
    }

    async function getExtendedSearchResult(phrase: string): Promise<number[]> {
        const requestOptions: RequestInit = {
            method: "GET",
            redirect: "follow"
        };

        return await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Search/GetYoloClassesAsync?` +
            new URLSearchParams({phrase: phrase}), requestOptions)
            .then((response) => response.text())
            .then((result) => {
                return JSON.parse(result);
            })
            .catch((error) => console.error(error));
    }

    return {getSearchResult}
}