type ModalProps = {
  open: boolean
  onClose: () => void
}

export default function Modal({ open, onClose }: ModalProps) {
  if (!open) return null

  return (
    <div>
      <button onClick={onClose}>나는 닫기</button>
      나는 모달
    </div>
  )
}
