// FB Collection 관리 : 폴더이름
// Collection 을 미리 안만들어도 됨.
// FB 연동시 성공/실패 관리
import { appFireStore, timeStamp } from '@/fb/fbconfig';
import {
  DocumentReference,
  FirestoreError,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { Reducer, useReducer } from 'react';

// 상태 interface 만들기
interface State {
  document: DocumentReference | null;
  isPending: boolean | false;
  error: string | null;
  success: boolean;
}
// 액션 type 만들기
type Action =
  | { type: 'isPending' }
  | { type: 'addDoc'; payload: DocumentReference }
  | { type: 'error'; payload: string }
  | { type: 'deleteDoc' }
  | { type: 'editDoc' };

// State 인터페이스 활용하기
const initState: State = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const storeReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'isPending':
      return {
        ...state,
        isPending: true,
        document: null,
        success: false,
        error: null,
      };
    case 'addDoc':
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'error':
      return {
        ...state,
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    case 'deleteDoc':
      return {
        ...state,
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case 'editDoc':
      return {
        ...state,
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    default:
      return state;
  }
};

export const useFirebase = (transaction: string) => {
  const [response, dispatch] = useReducer(storeReducer, initState);
  const colRef = collection(appFireStore, transaction);

  // 내용 등록 함수
  const addDocument = async (doc: any) => {
    dispatch({ type: 'isPending' });
    try {
      const createdTime = timeStamp.fromDate(new Date());

      const docRef = await addDoc(colRef, { ...doc, createdTime });
      console.log(docRef);
      dispatch({ type: 'addDoc', payload: docRef });
    } catch (error) {
      dispatch({ type: 'error', payload: (error as FirestoreError).message });
    }
  };

  // Document 삭제
  const deleteDocument = async (id: string) => {
    dispatch({ type: 'isPending' });
    try {
      const docRef = await deleteDoc(doc(colRef, id));
      dispatch({ type: 'deleteDoc' });
    } catch (error) {
      dispatch({ type: 'error', payload: (error as FirestoreError).message });
    }
  };

  // Document 업데이트
  const editDocument = async (id: string, data: any) => {
    dispatch({ type: 'isPending' });
    try {
      const docRef = doc(appFireStore, transaction, id);
      await updateDoc(docRef, data);
      dispatch({ type: 'editDoc' });
    } catch (error) {
      dispatch({ type: 'error', payload: (error as FirestoreError).message });
    }
  };

  return { response, addDocument, deleteDocument, editDocument };
};
