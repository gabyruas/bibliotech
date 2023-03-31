import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Chaves de acesso ao firebase
const firebaseConfig = {
  apiKey: "AIzaSyDFeIbZWt0skyijj4D_oxalcbwL-_dUw_8",
  authDomain: "bibliotech-gaby.firebaseapp.com",
  projectId: "bibliotech-gaby",
  storageBucket: "bibliotech-gaby.appspot.com",
  messagingSenderId: "351852942822",
  appId: "1:351852942822:web:e97b72a18c53bc63b5f227"
};

// Inicializa o app com base nas configurações acima
export const app = initializeApp(firebaseConfig);
// Configurando o Authentication e seus recursos login/cadastro
export const auth = getAuth(app);
// Configura o Firestore e seus recursos de banco de dados
export const db = getFirestore(app);
// Configura o Storage e seus recursos de Upload
export const storage = getStorage(app);
