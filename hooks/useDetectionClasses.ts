import {useEffect, useState} from "react";
import {DetectionClass} from "@/constants/Types";


export default function useDetectionClasses() {
    const [detectionClasses, setDetectionClasses] = useState<DetectionClass[]>();

    useEffect(() => {
        getAllYoloClasses().then();
    }, []);

    async function getAllYoloClasses() {
        const requestOptions: RequestInit = {
            method: "GET",
            redirect: "follow"
        };

        let classes: DetectionClass[] = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/Info/GetAllYoloClasses`,
            requestOptions)
            .then((response) => response.text())
            .then((result) => {
                return JSON.parse(result);
            })
            .catch((error) => console.error(error));

        if (classes === undefined) return;
        setDetectionClasses(classes);
    }

    return {detectionClasses}
}