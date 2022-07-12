export const selectImageVariant = (minPixels: number, pictureSizes: any) => {
    let selected = 0;
    for (const size of Object.keys(pictureSizes)) {
        if (selected < minPixels && +size > selected)
            selected = +size;
        else if (selected > minPixels && +size >= minPixels && +size < selected)
            selected = +size;
    }
    return pictureSizes[selected].url;
}