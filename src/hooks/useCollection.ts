// collectin 에 데이터들을 가져와서 출력
import { useState, useEffect } from 'react';
import { appFireStore } from '../fb/fbconfig';
import {
  onSnapshot,
  collection,
  FirestoreError,
  QuerySnapshot,
  query,
  Query,
  orderBy,
} from 'firebase/firestore';

interface Document {
  id: string;
  [key: string]: any;
}

export const useColletion = (transaction: string) => {
  const [documents, setDocuments] = useState<Document[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // FB 쿼리 만들기
    // query(컬렉션참조 , 원하는 명령어 쿼리)
    const q: Query = query(
      collection(appFireStore, transaction),
      orderBy('createdTime', 'desc'),
    );

    const unsubscribe = onSnapshot(
      // 실시간으로 목록을 가져오기
      //collection(appFireStore, transaction),
      q,
      (snapshot: QuerySnapshot) => {
        let result: Document[] = [];
        console.log(snapshot);
        console.log(snapshot.docs);
        snapshot.docs.forEach(doc => {
          result.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(result);
        setError(null);
      },
      error => {
        setError(error.message);
      },
    );

    return unsubscribe;
  }, [transaction]);

  return { documents, error };
};
