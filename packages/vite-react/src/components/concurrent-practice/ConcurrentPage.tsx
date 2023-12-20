import { useDeferredValue, useEffect, useState, useTransition } from 'react'
import TabButton from './TabButton'
import AboutTab from './AboutTab'
import PostsTab from './PostTab'
import ContactTab from './ContactTab'
import SlowList from './SlowList'

export default function ConcurrentPage() {
  const [text, setText] = useState('')
  const deferredText = useDeferredValue(text)

  return (
    <div>
      <h2>동시성 이해하기</h2>
      <h3>일반적인 코드 상황</h3>
      {/* <h3>useDeferredValue가 적용된 코드 상황</h3> */}

      <input value={text} onChange={(e) => setText(e.target.value)} />
      <SlowList text={deferredText} />

      {/* <input
        type="text"
        onChange={(e) =>
          startTransition(() => {
            setText(e.target.value)
          })
        }
      /> */}
      {/* <h3>startTransition이 적용된 코드 상황</h3>
      <TabButton isActive={tab === 'about'} onClick={() => selectTab('about')}>
        About
      </TabButton>
      <TabButton isActive={tab === 'posts'} onClick={() => selectTab('posts')}>
        Posts (slow)
      </TabButton>
      <TabButton isActive={tab === 'contact'} onClick={() => selectTab('contact')}>
        Contact
      </TabButton>
      {isPending && <div>Pending...</div>}

      {tab === 'about' && <AboutTab />}
      {tab === 'posts' && <PostsTab />}
      {tab === 'contact' && <ContactTab />} */}
    </div>
  )
}
