import { useEffect, useState, React } from 'react'
import { db } from '../../FirebaseConfig/FirebaseConfig'
import {  getDocs, collection, onSnapshot } from 'firebase/firestore'

const useGetOrder = () => {
    const [data, setData] = useState([])
    const collectionRef = collection(db, "Orders")

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

export default useGetOrder