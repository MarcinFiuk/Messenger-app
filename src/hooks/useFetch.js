import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './../firebase';

const useFetchData = (collectionName, key, condition, value) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const colRef = collection(db, collectionName);

        //

        const fetchData = async (link) => {
            const arrWithFetchResults = [];

            const querySnapshot = await getDocs(link);

            querySnapshot.forEach((doc) => {
                const singleElement = { ...doc.data(), id: doc.id };
                arrWithFetchResults.push(singleElement);
            });

            setData(arrWithFetchResults);
        };

        if (!key && !condition && !value) {
            fetchData(colRef);
            return;
        }
        if (key && condition && value) {
            const q = query(colRef, where(key, condition, value));
            fetchData(q);
            return;
        }
        return;
    }, [collectionName, key, condition, value]);

    return data;
};

export default useFetchData;
