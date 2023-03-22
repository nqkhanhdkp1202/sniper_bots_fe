import { useForm } from 'react-hook-form'
import Modal from '../../components/Modal/Modal'

function ModalLogout({ isVisible, onCloseModal, onCreate, titleModal }) {
  const { handleSubmit } = useForm()

  const onSubmit = data => {
    onCreate(data)
    onCloseModal()
  }

  const handleCloseModal = () => {
    onCloseModal()
  }

  return (
    <Modal
      title={titleModal}
      isVisible={isVisible}
      onCloseModal={handleCloseModal}
    >
      <form id="hook-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <h6 className="text-center">{`Bạn có chắc muốn đăng xuất ??`}</h6>
      </form>
    </Modal>
  )
}

export default ModalLogout
