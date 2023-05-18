import React, { useState } from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import emojiData from './data/emojiData.json'
import './index.scss'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import ChatBar from './components/ChatBar'
import MessageArea from './components/MessageArea'
library.add(faPaperPlane)

function App() {
  const REGEX = /^(:)([A-Z_0-9]){2,}$/gim
  const replaceEmoji = (emoji) => {
    const newStr = input.split(" ")
    newStr[input.split(" ").length - 1] = emoji
    setInput(newStr.join(" "))
    //setInput()
  }
  return (
    <>
      <Provider store={store}>
        <MessageArea />
        
        <ChatBar />
      </Provider>

    </>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)