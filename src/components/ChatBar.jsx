import React, { useEffect, useRef, useState } from "react";
import emojiData from '../data/emojiData.json'
import { connect } from "react-redux";
import { sendMessage, setInput } from "../redux/actions/mainActions";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faPaperPlane)

function ChatBar({ main, setInput, sendMessage }) {
    const REGEX = /^(:)([A-Z_0-9]){2,}$/gim
    const inputRef = useRef()
    const [selectedWord, setSelectedWord] = useState("")
    const [showingEmojiPallete, setShowingEmojiPallete] = useState(false)

    const handleInputChange = (event) => {

        setInput(event.target.value)
        setShowingEmojiPallete(false)
    }
    const searchEmoji = (emojiList, emojiToFind) => {

        let search = Object.values(emojiList).map(category => {
            //console.log(category);
            return category.emojis.filter((emoji, index) => {
                //console.log(emoji[index].slug, selectedWord.match(/[^:]+/)[0]);
                return emoji.slug === emojiToFind.match(/[^:]+/)[0]
            })
        }).filter(filteredCategory => filteredCategory.length !== 0).map(a => a)
        search = search.length === 0 ? undefined : search[0][0]

        return search
    }
    const replaceEmoji = (emoji) => {
        let start = inputRef.current.selectionStart;
        let end = inputRef.current.selectionStart;

        while (start > 0 && !/\s/.test(main.input[start - 1])) {
            start--;
        }
        return main.input.substring(0, start) + emoji + main.input.substring(end)

    }
    const addMessage = () => {
        sendMessage(main.input)

    }
    const hadleSendMessageShortCut = (event) => {
        if (event.key === 'Enter') {
            addMessage()
        }
    }

    const handleEmojiPalleteClick = (event) => {
        const input = inputRef.current
        const caretPosition = input.selectionStart;
        setInput(main.input.substring(0, input.selectionStart) + event.target.textContent + main.input.substring(input.selectionStart, main.input.length));
        input.focus()
        setShowingEmojiPallete(false)
    }
    const getSelectedWord = (event) => {
        const input = event.target
        const caretPosition = input.selectionStart;
        const inputValue = input.value;
        let start = caretPosition;
        let end = caretPosition;

        while (start > 0 && !/\s/.test(inputValue[start - 1])) {
            start--;
        }
        while (end < main.input.length && !/\s/.test(main.input[end - 1])) {
            end++;
        }
        let word = main.input.substring(start, caretPosition)

        setSelectedWord(word)
    }
    const handleAutocompleteEmojiClick = (emoji) => {
        setInput(replaceEmoji(emoji.emoji)); setSelectedWord("") 
        inputRef.current.focus()
        console.log(inputRef.current.selectionStart);
        
        console.log(inputRef.current.selectionStart);
    }
    const toogleEmojiPalleteDisplay = () => {
        if (showingEmojiPallete) {
            setShowingEmojiPallete(false)
        } else {
            setShowingEmojiPallete(true)
        }
    }

    useEffect(() => {
        /*if (fullEmojiRegex.test(selectedWord)) {

            const search = searchEmoji(emojiData, selectedWord)
            if (search) {
                setInput(replaceEmoji(search.emoji))
            }
            console.log(main.input.match(/[:][a-z_]+[:]/gi));
        }*/
        if (main.input.match(/[:][a-z_0-9]{2,}[:]/g)) {
            console.log(main.input.match(/[:][a-z_0-9]{2,}[:]/g));
            const a = main.input.match(/[:][a-z_0-9]{2,}[:]/g);
            
            a.map((emoji, index) => {
                const search = searchEmoji(emojiData, a[index])
                if (search) {

                    setInput(main.input.replace(a[index], search.emoji))
                    
                    console.log(search);
                }
                
            })
            
            //console.log(main.input);
        }
    }, [selectedWord])


    return (
        <div id="chat-bar">
            <div id="message-area">
                {REGEX.test(selectedWord) && showingEmojiPallete === false ? <div id="emoji-list">
                    <div id="search-info">
                        <p> SEARCHING FOR <span>{selectedWord.match(/[^:]/gi)}</span></p>
                    </div>
                    <div id="emojis">
                        {Object.values(emojiData).map((category, catIndex) => {
                            return category.emojis.map(emoji => {
                                return emoji
                            }).filter((emoji) => {
                                return emoji.slug.includes(selectedWord.match(/[^:]+/)[0])
                            }).map((filteredEmoji, index, map) => {
                                return (
                                    <div key={index} className='emoji-item'>
                                        <button ref={index && index == 0 ? firstEmojiBtnRef : undefined} onClick={() => handleAutocompleteEmojiClick(filteredEmoji)}>
                                            <div>
                                                {filteredEmoji.emoji}
                                            </div>
                                            <p>
                                                {filteredEmoji.slug}
                                            </p>
                                        </button>
                                    </div>
                                )
                            })
                        })

                        }
                    </div>

                </div> : undefined}
                {showingEmojiPallete ? <div id="emoji-pallete">
                    <div id="emoji-pallete-categories">
                        {Object.keys(emojiData).map((category, index) => {
                            return (
                                <div key={index} className="emoji-pallete-category">
                                    <a title={category} href={"#" + category}>
                                        <div>
                                            {emojiData[category].emoji}
                                        </div>
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                    <div id="emoji-pallete-emojis">
                        {Object.keys(emojiData).map((category, index) => {
                            return (
                                <div id={category} key={index} className="emoji-pallete-emojis">
                                    <div id="emoji-pallete-emojis-title">
                                        {category}</div>
                                    <div id="emojis-pallete-emojis-emojis">
                                        {emojiData[category].emojis.map((emoji, index) => {
                                            return (
                                                <div key={index} id="emoji-pallete-emoji">
                                                    <button onClick={handleEmojiPalleteClick}>
                                                        {emoji.emoji}
                                                    </button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div> : undefined}
                <div id="send-message-form">
                    <input onFocus={() => {
                        setShowingEmojiPallete(false)
                    }} ref={inputRef} onSelect={getSelectedWord} onKeyDown={hadleSendMessageShortCut} placeholder='Send message' onChange={handleInputChange} value={main.input} id="send-message-input" type="text" />
                    <button onClick={addMessage} id="send-message-btn"><FontAwesomeIcon icon={faPaperPlane} /></button>
                    <button id="emojiPalleteToggler" onClick={() => toogleEmojiPalleteDisplay()}>😀</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        main: state.mainReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setInput: (input) => dispatch(setInput(input)),
        sendMessage: (message) => dispatch(sendMessage(message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBar)