import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router} from 'react-router-dom'
import App from './App';
import { Slide, ToastContainer } from 'react-toastify';
import { AuthProvider } from "./contexts/AuthContext";
import { ReactNode } from 'react';
import { ProfileProvider } from './contexts/ProfileContext';
import { PopupProvider } from './contexts/PopupContext';
import { ChatProvider } from './contexts/ChatContext';
import { LeftDivWidthProvider } from './contexts/LeftDivWidthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Providers>
        <Router>
            <App/>
            <ToastContainer
                position="bottom-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Slide}
            />
        </Router>
    </Providers>
)

function Providers({children}: {children: ReactNode}) {
    return (
        <AuthProvider>
            <ProfileProvider>
                <PopupProvider>
                    <ChatProvider>
                        <LeftDivWidthProvider>
                            {children}
                        </LeftDivWidthProvider>
                    </ChatProvider>
                </PopupProvider>
            </ProfileProvider>
        </AuthProvider>
    )
}