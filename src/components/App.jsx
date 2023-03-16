import SearchBar from './SearchBar/SearchBar';
import { Notify } from 'notiflix';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { useToggle } from 'hooks/useToggle';
import { useState } from 'react';

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const { isOpen, toggle } = useToggle();
  const [modalImage, setModalImage] = useState(false);
  const onSubmitForm = value => {
    if (value.trim() !== '') {
      setSearchValue(value.toLowerCase());
    } else {
      Notify.failure('Input something!');
    }
  };

  const onModal = img => {
    setModalImage(img);
    toggle();
  };

  return (
    <>
      <SearchBar onSubmit={onSubmitForm} />
      <ImageGallery searchValue={searchValue} setModalImage={onModal} />
      {isOpen && (
        <Modal onToggleModal={onModal}>
          <img src={modalImage} alt="" />
        </Modal>
      )}
    </>
  );
}
