import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
    loadTranslations, setLocale, syncTranslationWithStore, i18nReducer,
} from 'react-redux-i18n';
import './sass/app.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';


import fr from './i18n/fr';

const store = createStore(
    combineReducers({
        i18n: i18nReducer,
    }),
    applyMiddleware(thunk),
);
syncTranslationWithStore(store);
store.dispatch(loadTranslations({ fr }));
store.dispatch(setLocale('fr'));

function wrapApp(RootComponent) {
    return (
            <BrowserRouter basename="/">
                <Switch>
                    <Route path="/" component={RootComponent} />
                </Switch>
            </BrowserRouter>
    );
}

ReactDOM.render(wrapApp(App), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
