import { useEffect, useState, React } from 'react'
import { db } from '../../FirebaseConfig/FirebaseConfig'
import {  getDocs, collection, onSnapshot } from 'firebase/firestore'

const useGetUser = () => {
    const [data, setData] = useState([])
    const collectionRef = collection(db, "users")

    useEffect(() => {
        const getData = async () => {
            await onSnapshot(collectionRef, (snapshot) => {
                setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            });
        }
        getData()
    }, [])


  return { data };
};

export default useGetUser