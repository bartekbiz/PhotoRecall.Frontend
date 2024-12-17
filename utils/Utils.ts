export function ToTitleCase(str: string): string {
    return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

export function CompareArrays(arrayA: any[], arrayB: any[], sort?: boolean) {
    if (sort) {
        arrayA = arrayA.sort();
        arrayB = arrayB.sort();
    }

    return arrayA.length === arrayB.length &&
    arrayA.every((element, index) => element === arrayB[index]);
}

