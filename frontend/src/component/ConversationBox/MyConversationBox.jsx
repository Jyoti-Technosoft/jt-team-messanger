import { useEffect, useState } from 'react';

import { Emoji, EmojiStyle } from 'emoji-picker-react';

import './ConversationBox.scss';

function MyConversationBox(props) {

    const [isEmoji, setIsEmoji] = useState(false);
    
    useEffect(()=>{
        const regex = /^\p{Extended_Pictographic}{1,2}$/ug;          
        const userMsg = props?.message;

        const typeOfMsg = regex.test(userMsg);
        // console.log(typeOfMsg);

        if(typeOfMsg){
            setIsEmoji(true);
        }
        
    },[])

    return (
        <>
        <div className="my-box-container d-flex justify-content-end">
            <div className={`${ isEmoji ? 'emoji-my-msg-box border-0' : 'card my-message-box border-0' }`}>
                <div className={`${ isEmoji ? 'emoji-my-message' : 'card-body my-message' } `}>
                    <p className={`${ isEmoji ? 'emoji-my-message-text' : 'card-text my-message-text' }`} > 
                    { props?.message }
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}

export default MyConversationBox;