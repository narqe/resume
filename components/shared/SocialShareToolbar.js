import React from 'react';
import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon
} from 'next-share'

const SocialShareToolbar = ({ styles, url, size = 32 }) => {
    return (
        <>
            <div className={styles}>
                <FacebookShareButton url={url}>
                    <FacebookIcon size={size} round />
                </FacebookShareButton>

                <LinkedinShareButton url={url}>
                    <LinkedinIcon size={size} round />
                </LinkedinShareButton>

                <TwitterShareButton url={url}>
                    <TwitterIcon size={size} round />
                </TwitterShareButton>
            </div>
        </>
    )
}

export default SocialShareToolbar