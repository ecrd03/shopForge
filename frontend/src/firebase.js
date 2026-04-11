import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA2HYNoDMXnqdKp6ZRRK8fOJMLEoNcXoNA",
  authDomain: "shopforge-efa99.firebaseapp.com",
  projectId: "shopforge-efa99",
  storageBucket: "shopforge-efa99.firebasestorage.app",
  messagingSenderId: "861790205587",
  appId: "1:861790205587:web:488e89e0451d0fa7b13f66"
}

const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)