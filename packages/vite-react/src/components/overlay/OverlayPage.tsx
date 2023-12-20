import { useOverlay } from '@toss/use-overlay'
import Modal from './Modal'

export default function OverlayPage() {
  const overlay = useOverlay()
  const overlayTest = useOverlay()

  return (
    <div>
      <h1>Overlay Practice</h1>
      <div>
        <button
          onClick={() => {
            overlay.open(({ isOpen, close }) => {
              return <Modal open={isOpen} onClose={close} />
            })
          }}
        >
          이걸 누르면 새로 등장!
        </button>
      </div>

      <div>
        <button onClick={() => overlayTest.open(() => <div>종길종길</div>)}>
          나는 또 다른 모달 오픈!!!
        </button>
        <button onClick={() => overlay.close()}>종길종길 닫기</button>
      </div>
    </div>
  )
}
