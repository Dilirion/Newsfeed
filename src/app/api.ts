import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { IPartnerArticle } from '@features/partnersArticles/types';

export const initializeAPI = (): FirebaseApp => {
  const firebaseApp = initializeApp({
    apiKey: 'AIzaSyDbnbrtLn7gyZU11tSpjvdN6F81aNJuYnQ',
    authDomain: 'krom-karpov-news.firebaseapp.com',
    projectId: 'krom-karpov-news',
    storageBucket: 'krom-karpov-news.appspot.com',
    messagingSenderId: '862108373621',
    appId: '1:862108373621:web:ba9132dc3128ff6a62de3c',
  });

  getAuth(firebaseApp);
  getFirestore(firebaseApp);
  getStorage(firebaseApp);

  return firebaseApp;
};

const partnersPostsCollection = 'partners-posts';

export const getPartnersArticles = async (): Promise<IPartnerArticle[]> => {
  const db = getFirestore();
  const querySnapshot = await getDocs(collection(db, partnersPostsCollection));
  const articles: IPartnerArticle[] = [];

  try {
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<IPartnerArticle, 'id'>;

      articles.push({
        id: doc.id,
        ...data,
      });
    });
  } catch (error) {
    return Promise.reject(error);
  }

  return articles;
};

export const createPartnerArticle = async (data: Omit<IPartnerArticle, 'id' | 'created'>): Promise<any> => {
  const db = getFirestore();

  try {
    await addDoc(collection(db, partnersPostsCollection), data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updatePartnerArticle = async (id: string, data: Omit<IPartnerArticle, 'id' | 'created'>): Promise<any> => {
  const db = getFirestore();

  const ref = doc(db, partnersPostsCollection, id);

  try {
    await updateDoc(ref, data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deletePartnerArticle = async (id: string): Promise<any> => {
  const db = getFirestore();

  const ref = doc(db, partnersPostsCollection, id);

  try {
    await deleteDoc(ref);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getPartnerArticle = async (id: string): Promise<IPartnerArticle> => {
  const db = getFirestore();
  const docRef = doc(db, partnersPostsCollection, id);
  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Omit<IPartnerArticle, 'id'>;

      return {
        id: docSnap.id,
        ...data,
      };
    } else {
      throw Error('Такой статьи нет');
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadFile = async (file: File): Promise<string> => {
  const storage = getStorage();
  const storageRef = ref(storage, `${file.name}-${Date.now()}`);

  try {
    const shapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(shapshot.ref);

    return url;
  } catch (error) {
    return Promise.reject(error);
  }
};
