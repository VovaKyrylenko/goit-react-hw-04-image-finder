import { useEffect, useState } from 'react';
import { getImages } from 'services/pixabay-api';
import { ImageList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader, Relative } from 'components/Loader/Loader.styled';
import { Button } from 'components/Button/Button';

export function ImageGallery({ searchValue, setModalImage }) {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('wait');
  const [page, setPage] = useState(1);
  const [isLast, setIsLast] = useState(false);

  useEffect(() => {
    if (searchValue === '') return;
    async function setParams() {
      const newImages = await getImages(searchValue, page);
      setImages(images => [...images, ...newImages.hits]);
      if ([...images, ...newImages.hits].length === newImages.totalHits)
        setIsLast(true);
    }
    setParams();
  }, [page, images, searchValue]);

  useEffect(() => {
    if (searchValue === '') return;
    async function setParams() {
      setStatus('load');
      setPage(1);
      setIsLast(false);
      setImages((await getImages(searchValue, 1)).hits);
      setStatus('ready');
    }
    setParams();
  }, [searchValue]);

  const onClickImage = id => {
    setModalImage(
      images.find(img => Number(img.id) === Number(id)).largeImageURL
    );
  };

  const incrementPage = () => {
    setPage(page => page + 1);
  };

  switch (status) {
    case 'wait':
      return (
        <Relative>
          <p>Search something</p>
        </Relative>
      );
    case 'load':
      return (
        <Relative>
          <Loader />
        </Relative>
      );
    case 'ready':
      return (
        <>
          <ImageList>
            {images.map(({ id, webformatURL }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                id={id}
                onClick={onClickImage}
              />
            ))}
          </ImageList>
          {!isLast && <Button onClick={incrementPage} />}
        </>
      );
    default:
      console.log('Something went wrong');
  }
}
