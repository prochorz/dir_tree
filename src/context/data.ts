import { createContext, useState, useEffect } from 'react';

import { foldersRef } from '../firebaseApp';

export const useData = () => {
    const [data, setLocalData] = useState<any>([]);

    const updateItemById = (id: number, name: string) => {
        function updateData(list: Array<any>) {
            return list.map(item => {
                let localItem = item;
                const isChildrenExist = item.children?.length;

                if (item.id === id) {
                    localItem = {
                        ...item,
                        name
                    }
                } else if(isChildrenExist) {
                    localItem = {
                        ...item,
                        children: updateData(item.children)
                    }
                }

                return localItem;
            });
        }

        setData(updateData(data));
    }

    const deleteItemById = (id: number) => {
        function deleteData(list: Array<any>) {
            return list.map(item => {
                let localItem = item;
                const isChildrenExist = item.children?.length;

                if (item.id === id) {
                    localItem = null
                } else if(isChildrenExist) {
                    localItem = {
                        ...item,
                        children: deleteData(item.children)
                    }
                }

                return localItem;
            }).filter(Boolean);
        }

        setData(deleteData(data));
    }

    const addItemById = (id: number) => {
        function addData(list: Array<any>) {
            return list.map(item => {
                let isNewItemExist = false;
                let localItem = item;
                const isChildrenExist = item.children?.length;

                if (item.id === id) {
                    isNewItemExist = true;
                } else if(isChildrenExist) {
                    localItem = {
                        ...item,
                        children: addData(item.children)
                    }
                }

                if (isNewItemExist) {
                    const newItem = {
                        name: 'New item',
                        id: Date.now()
                    };

                    if (isChildrenExist) {
                        localItem.children.push(newItem)
                    } else {
                        localItem.children = [newItem];
                    }
                }

                return localItem;
            });
        }

        setData(addData(data));
    }

    function subscribeData() {
        foldersRef.on('value', snapshot => {
            setLocalData(snapshot.val());
        })
    }

    function setData(updateData: any) {
        foldersRef.set(updateData);
    }

    useEffect(subscribeData, []);

    return {
        data,
        updateItemById,
        deleteItemById,
        addItemById
    };
};

export const dataContext = createContext<any>({});