import { useEffect, useState } from "react";

const useCoverPhoto = (content) => {
    const [coverPhoto, setCoverPhoto] = useState();

    useEffect(() => {
        const expression = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
        const matches = content && content.match(expression);

        if (matches && matches.length) {
            setCoverPhoto(matches[0])
        }
    }, [content])

    return {
        coverPhoto
    }
}

export default useCoverPhoto