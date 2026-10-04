import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app: FirebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

/** Cargos permitidos no VIGA (por enquanto). */
export type Cargo = "lider" | "supervisor" | "gerente";

/** Perfil do usuário salvo em users/{uid}. */
export interface UserProfile {
  nome: string;
  email: string;
  cargo: Cargo;
  setor: string;
  linha: string;
  equipe: string;
  ativo: boolean;
}

/** Checagem em runtime — protege contra valores fora do union type. */
export function isCargoValido(valor: string): valor is Cargo {
  return valor === "lider" || valor === "supervisor" || valor === "gerente";
}