export const chunkArrayItems = <T,>(array: T[] | null, size: number): T[][] => {
    const chunk: T[][] = [];

    if (!array) return chunk;

    for (let i = 0; i < array.length; i += size) {
        chunk.push(array.slice(i, i + size));
    }
    return chunk;
};