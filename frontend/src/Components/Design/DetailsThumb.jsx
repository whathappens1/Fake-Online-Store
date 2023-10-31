const DetailsThumb = ({myRef,images, tab }) => {
  return (
    <div className="thumb" ref={myRef}>
        {
        images.map((img, index) =>(
            <img src={img} alt="thumbImgs" className="thumbImgs" key={index} 
            onClick={() => tab(index)}
            />
        ))
        }
    </div>
)
}

export default DetailsThumb;