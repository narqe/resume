
const SkillImage = ({ imgSrc, label }: { imgSrc: string, label?: string }) => (
    <img 
        src={`img/skills/${imgSrc}.png`} 
        alt={label} 
        title={label.toUpperCase()}   
        width="32"
        height="32"
        className="rounded-image"
    />
);

export default SkillImage;