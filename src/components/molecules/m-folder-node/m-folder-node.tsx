import React, { useState } from 'react';
import cx from 'classnames';

import Style from './m-folder-node.module.scss';

import AEditNode from '../../atoms/a-edit-node';
import AButton from "../../atoms/a-button";

export interface Props {
    item?: any,
    render?: any,
    className?: string,
    children?: any,
    onChange: (value: any) => void,
    onDelete: (value: any) => void,
    onAdd: (value: any) => void,
}

const MFolderNode: React.FC<Props> = (props) => {
    const { onAdd, onChange, onDelete, item, children, className = '' } = props;
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const itemChildren = item.children as Array<any>;
    const isChildrenExist = Boolean(itemChildren?.length);
    const deepIcon = isOpen ? '🔽' : '🔼';
    const icon = isChildrenExist ? deepIcon : '';

    const ctxClass = cx(Style['m-folder-node'], className);

    function onClick() {
        setIsOpen(!isOpen);
    }

    return (
        <div className={ ctxClass }>
            <div className={cx(Style['folder-node__title'])}>
                { isChildrenExist &&
                    <div
                        className={cx(Style['folder-node__icon'])}
                        onClick={onClick}
                    >
                        { icon }
                    </div>
                }
                <AEditNode
                    defaultValue={item.name}
                    onChange={onChange}
                    onDelete={onDelete}
                />
                <AButton
                    label="➕"
                    onClick={onAdd}
                />
            </div>
            { isOpen && children }
        </div>
    );
}

export default MFolderNode;