import FileIcon from '../icons/posts/files';
import ReactFileReader from 'react-file-reader';




function PostFooter({content, image, setImages}) {

  const handleFiles = files => {
    setImages(files.base64)
  }

  return (
    <div className='w-full pt-3 flex items-center justify-between'>
      <div className='flex w-[8%] justify-between'>
        <div>
          <button disabled={image === null ? false : true} className={image === null ? "opacity-100" : "opacity-50"}>
            <ReactFileReader handleFiles={handleFiles} multipleFiles={false} base64={true}>
              <FileIcon />
            </ReactFileReader>
          </button>
        </div>
      </div>
      <div>
          <button type="button" class={"text-white text-sm font-medium rounded-full transition duration-300 py-0.5 px-5 " + (content === "" && image === null ? "bg-[#1d9bf0]/[.5]" : "bg-[#1d9bf0]/[.9]")} disabled={content === "" && image === null ? true : false}>Post</button>
      </div>
    </div>
  );
}

export default PostFooter;