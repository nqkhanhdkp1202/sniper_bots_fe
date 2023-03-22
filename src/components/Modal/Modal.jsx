import { useEffect } from 'react'
import PropTypes from 'prop-types'

export default function Modal({ title, isVisible, onCloseModal, children }) {
  const modalForm = document.querySelector('#modal-form')
  const modalBackdrop = document.querySelector('.modal-backdrop')
  const body = document.querySelector('body')

  useEffect(() => {
    if (modalForm) {
      if (isVisible) {
        modalForm.style.display = 'block'
        modalBackdrop.style.display = 'block'
        modalForm.style.display = 'block'
        body.style.overflow = 'hidden'
      } else {
        modalForm.style.display = 'none'
        modalBackdrop.style.display = 'none'
        modalForm.style.display = 'none'
        body.style.overflow = 'auto'
      }
    }
  }, [isVisible, modalBackdrop, modalForm, body])

  const handleCloseModal = () => {
    onCloseModal()
  }

  return (
    <div
      className="modal fade show"
      id="modal-form"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="modal-form"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-md"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-body p-0">
            <div className="card card-plain">
              <div className="card-header pb-0 text-left">
                <h3 className="font-weight-bolder text-info text-gradient text-center text-uppercase">
                  {title}
                </h3>
              </div>
              <div
                className="card-body overflow-auto"
                style={{ maxHeight: '700px' }}
              >
                {children}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn bg-gradient-secondary"
              data-bs-dismiss="modal"
              onClick={handleCloseModal}
            >
              Đóng
            </button>
            <button
              type="submit"
              form="hook-form"
              className="btn bg-gradient-primary"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  isVisible: PropTypes.bool,
  onCloseModal: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}
