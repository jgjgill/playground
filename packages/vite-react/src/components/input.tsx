import { Ref, forwardRef } from 'react'

type InputProps = {
  onChnage: () => void
}

const Input1 = forwardRef(function (props: InputProps, ref: Ref<HTMLInputElement>) {
  return <input {...props} ref={ref} type="text" />
})

const Input2 = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <input ref={ref} {...props} type="text" />
))

export { Input1, Input2 }
