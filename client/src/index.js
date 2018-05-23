import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';

import { ThemeSwitcher } from 'react-bootstrap-theme-switcher';

import App from './App';

//ServiceWorker fucks up the routing, so that you can't link/open an image directly
//i.e. http://example.com/api/files/testing/123.png
//with serviceworker this ends up in an empty route within React-Router
import { unregister } from './registerServiceWorker';

ReactDOM.render((
    <ThemeSwitcher defaultTheme="cyborg" storeThemeKey="iconstashtheme" >

    <BrowserRouter>
        <App />
    </BrowserRouter>

    </ThemeSwitcher>
), document.getElementById('root'));
unregister();
