import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useRef } from 'react';
import { useWindowSize } from './hooks/contentSize/useWindowSize';
import { LoginPage } from './pages/Login/LoginPage';
import { MainPage } from './pages/Home/MainPage';
import { useColors } from './hooks/useColors';
import { SignUpPage } from './pages/Login/SignUpPage';
import { VerificationPage } from './pages/Login/VerificationPage';
import { PopupContainer } from './components/PopupContainer';

export default function App() {
    const rootRef = useRef(document.getElementById('root')!)

    const {width, height} = useWindowSize()

    rootRef.current.style.width = width + 'px'
    rootRef.current.style.height = height + 'px'

    const COLORS = useColors()

    const { user, loading } = useAuth()

    if(loading) {
        return (
            <div 
                className="absolute w-full h-full top-0 left-0 flex justify-center items-center text-blue-50" 
                style={{backgroundColor: COLORS.BG_COLOR}}
            >
                <div className="loader"></div>
            </div>
        )
    }

    return (
        <div 
            className="absolute w-full h-full top-0 left-0 flex justify-center items-center text-blue-50" 
            style={{backgroundColor: COLORS.BG_COLOR}}
        >
            <Routes>
                <Route 
                    path='/'
                    element={user ? <Navigate to='/home' /> : <Navigate to='/login' />}
                />
                <Route
                    path='/home'
                    element={user ? <MainPage/> : <Navigate to='/login' />}
                />
                <Route
                    path='/login'
                    element={user ? <Navigate to='/home' /> : <LoginPage/>}
                />
                <Route
                    path='/signup'
                    element={<SignUpPage />}
                />
                <Route
                    path='/verification'
                    element={<VerificationPage />}
                />
            </Routes>
            {<PopupContainer/>}
        </div>
    )
}