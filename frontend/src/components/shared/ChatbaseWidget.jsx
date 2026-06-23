import { useEffect } from 'react'

export function ChatbaseWidget() {
  useEffect(() => {
    // Inject Chatbase embed script exactly as provided
    if (!window.chatbase || window.chatbase('getState') !== 'initialized') {
      window.chatbase = (...args) => {
        if (!window.chatbase.q) window.chatbase.q = []
        window.chatbase.q.push(args)
      }
      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === 'q') return target.q
          return (...args) => target(prop, ...args)
        }
      })
    }

    const onLoad = () => {
      if (document.getElementById('Qo13UNSzDfdfBox_SN8YJ')) return // prevent duplicate
      const script = document.createElement('script')
      script.src = 'https://www.chatbase.co/embed.min.js'
      script.id = 'Qo13UNSzDfdfBox_SN8YJ'
      script.domain = 'www.chatbase.co'
      document.body.appendChild(script)
    }

    if (document.readyState === 'complete') {
      onLoad()
    } else {
      window.addEventListener('load', onLoad)
    }

    return () => {
      window.removeEventListener('load', onLoad)
    }
  }, [])

  return null // The chatbase script injects its own floating button UI
}
