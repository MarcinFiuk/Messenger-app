import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyARH12IANs_sTbIRv36LXKG9G0Li-y87e0',
    authDomain: 'chat-app-bd02c.firebaseapp.com',
    projectId: 'chat-app-bd02c',
    storageBucket: 'chat-app-bd02c.appspot.com',
    messagingSenderId: '830604640033',
    appId: '1:830604640033:web:d5d453cf413aea8594c860',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
