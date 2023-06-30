import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ArticleItemAPI } from '@features/articleItem/types';
import { Category } from '@features/categories/types';
import { IPartnerArticle } from '@features/partnersArticles/types';
import { NewsAPI } from '@features/articlesList/types';
import { RelatedArticlesAPI } from '@features/relatedNews/types';
import { Source } from '@features/sources/types';

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

export const getMainPartnerArticle = async (): Promise<IPartnerArticle | null> => {
  const db = getFirestore();
  let article = null;

  try {
    const q = query(collection(db, partnersPostsCollection), orderBy('created', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<IPartnerArticle, 'id'>;

      article = {
        id: doc.id,
        ...data,
      };
    });
  } catch (error) {
    return Promise.reject(error);
  }

  return article;
};
export const apiFetchNews = (lang: string): Promise<NewsAPI> => {
  return fetch(`https://frontend.karpovcourses.net/api/v2/${lang}/news`).then((response) => response.json());
};

export const apiFetchTrends = (lang: string): Promise<NewsAPI> => {
  return fetch(`https://frontend.karpovcourses.net/api/v2/${lang}/trends`).then((response) => response.json());
};

export const apiFetchCategory = (lang: string, id: number): Promise<NewsAPI> => {
  return fetch(`https://frontend.karpovcourses.net/api/v2/${lang}/news/${id}`).then((response) => response.json());
};

export const apiFetchCategories = (): Promise<Category[]> => {
  return fetch('https://frontend.karpovcourses.net/api/v2/categories').then((response) => response.json());
};

export const apiFetchSources = (): Promise<Source[]> => {
  return fetch('https://frontend.karpovcourses.net/api/v2/sources').then((response) => response.json());
};

export const apiFetchRelatedArticles = (id: number): Promise<RelatedArticlesAPI> => {
  return fetch(`https://frontend.karpovcourses.net/api/v2/news/related/${id}?count=9`).then((response) =>
    response.json()
  );
};

export const apiFetchArticleItem = (id: number): Promise<ArticleItemAPI> => {
  return fetch(`https://frontend.karpovcourses.net/api/v2/news/full/${id}`).then((response) => response.json());
};
