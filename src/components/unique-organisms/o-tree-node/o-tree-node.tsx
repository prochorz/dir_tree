import React, { useContext } from 'react';
import cx from 'classnames';

import Style from './o-tree-node.module.scss';

import MFolderNode from '../../molecules/m-folder-node';

import { dataContext } from '../../../context/data';

export interface Props {
    item?: any,
    render?: any,
    className?: string,
    children?: JSX.Element[] | JSX.Element
}

const OTreeNode: React.FC<Props> = (props) => {
    const { item, className = '' } = props;
    const { updateItemById, deleteItemById, addItemById } = useContext(dataContext);

    const itemChildren = item.children as Array<any>;
    const isChildrenExist = Boolean(itemChildren?.length);

    const ctxClass = cx(Style['o-tree-node'], className);

    function onChangeHandler(value: string) {
        updateItemById(item.id, value);
    }

    function onDeleteHandler() {
        deleteItemById(item.id);
    }

    function onAddHandler() {
        addItemById(item.id);
    }

    return (
        <div className={ ctxClass }>
            <MFolderNode
                item={item}
                onChange={onChangeHandler}
                onDelete={onDeleteHandler}
                onAdd={onAddHandler}
            >
                { isChildrenExist &&
                    <div>
                        { itemChildren.map(childItem => (
                            <OTreeNode
                                key={childItem.id}
                                item={childItem}
                            />
                        )) }
                    </div>
                }
            </MFolderNode>
        </div>
    );
}

export default OTreeNode;