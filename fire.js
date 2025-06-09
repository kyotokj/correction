import { initializeApp } from 'firebase/app'
import { getFirestore,collection,addDoc,query,orderBy,onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

const firebaseConfig = {
  // Placez ici vos identifiants Firebase (SDK) - Cf. diapos 14 et 15
  apiKey: "AIzaSyBIonIMfJFxjfFtozmsA5L3rio6R278V94",
  authDomain: "mon-blog-1705f.firebaseapp.com",
  projectId: "mon-blog-1705f",
  storageBucket: "mon-blog-1705f.firebasestorage.app",
  messagingSenderId: "505434246818",
  appId: "1:505434246818:web:814fac4304d21f891411fb",
  measurementId: "G-W3CQLBRS56"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const getArticles = callback => {
  const q = query(collection(db, 'articles'), orderBy('title', 'asc'))
  onSnapshot(q, snapshot => {
    let articles = []
    snapshot.forEach(doc => {
      articles.push({ id: doc.id, ...doc.data() })
    })
    callback(articles)
  })
}

export async function addArticle(article) {
  await addDoc(collection(db, "articles"), article);
}

export const updateArticle = async (article) => {
  await updateDoc(doc(db, 'articles', article.id), article);
};

export const deleteArticle = async id => {
  await deleteDoc(doc(db, 'articles', id));
}


