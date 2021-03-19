import { createContext, useState } from 'react';

import testData from '../assets/testData.json';

export const useData = () => {
    const [data, setData] = useState(testData);

    const updateItemById = (id: number, name: string) => {
        function updateData(list: Array<any>) {
            return list.map(item => {
                let localItem = item;
                const isChildrenExist = item.children?.length;

                if (item._id === id) {
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

                if (item._id === id) {
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

                if (item._id === id) {
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
                        _id: Date.now()
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

    return {
        data,
        updateItemById,
        deleteItemById,
        addItemById
    };
};

export const dataContext = createContext<any>({});