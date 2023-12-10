import '../App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react'
import axios from 'axios'

function ChatApp() {
  const [messages, setMessages] = useState();
  const [username, setUsername] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    if (!token || !username) {
      toast.error('You must be logged in to view this page!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: true,
      })

      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    }

    setUsername(username);
    let messages = [];
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/messages/' + username + '?token=' + token,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    axios.request(config)
      .then((response) => {
        messages = response.data;
        setMessages(messages);
        setLoading(false);
      })
      .catch(() => {
        setMessages(messages);
      });
  }, []);

  return (
    <div className="chatwindow">
      <div className="ca-body">
        <div className="ca-chat">
          <header className="App-header">
                <h1> {username}&apos;s IRC messages</h1>
          </header>
          <div className="ca-chat-messages">
            {loading ? (
              <div className="ca-chat-message">
                <div className="ca-chat-message">
                  <p>Loading...</p>
                </div>
              </div>
            ) : (
              messages?.map((message, index) => {
                return (
                  <div className="ca-chat-message" key={index}>
                    <div className="ca-chat-message">
                      <p>{message.by}: {message.msg}</p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
          <div className="ca-chat-input">
            <input type="text" placeholder="Type a message..." />
          </div>
          <div className="ca-chat-send">
            <button disabled={true}>Send</button>
          </div>
        </div>
      </div>
      <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    </div>
  );
}

export default ChatApp;
