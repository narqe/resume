
import useCoverPhoto from '@hooks/useCoverPhoto';

const FeaturedImage = ({ img }) => {
    const { coverPhoto } = useCoverPhoto(img);
    
    return (
        <img
            className="w-full object-cover h-96"
            src={coverPhoto} 
            height={100} 
            width={100}
        />
    )
}

export default FeaturedImage;