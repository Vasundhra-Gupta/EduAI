import { createRoot } from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router-dom';
import { router } from './Router';

import {
    UserContextProvider,
    PopupContextProvider,
    SocketContextProvider,
} from './contexts';

function Root() {
    return (
        <UserContextProvider>
            <PopupContextProvider>
                <SocketContextProvider>
                    <RouterProvider router={router} />
                </SocketContextProvider>
            </PopupContextProvider>
        </UserContextProvider>
    );
}

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <Root />
    // </StrictMode>,
);
