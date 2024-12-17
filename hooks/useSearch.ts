

export default function useSearch() {

    async function getSearchResult(phrase: string): Promise<number[]> {
        const requestOptions: RequestInit = {
            method: "GET",
            redirect: "follow"
        };

        return await fetch("http://dev.bartekbiz.net:8080/api/Search/GetYoloClassesAsync?" +
            new URLSearchParams({phrase: phrase}), requestOptions)
            .then((response) => response.text())
            .then((result) => {
                return JSON.parse(result);
            })
            .catch((error) => console.error(error));
    }

    return {getSearchResult}
}