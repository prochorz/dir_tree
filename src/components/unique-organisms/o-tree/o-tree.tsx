import React from 'react';
import cx from 'classnames';

import Style from './o-tree.module.scss';

import OTreeNode from '../o-tree-node';

import { dataContext, useData } from '../../../context/data';

import { firebaseApp } from '../../../firebaseApp';

export interface Props {
    render?: any,
    className?: string,
    children?: JSX.Element[] | JSX.Element
}

const OTree: React.FC<Props> = (props) => {
    const { className = '' } = props;
    const context = useData();

    const ctxClass = cx(Style['o-tree'], className);

    firebaseApp.auth().signInWithEmailAndPassword('root@test.com', '123456');

    return (
        <dataContext.Provider value={context}>
            <div className={ ctxClass }>
                { context.data.map(item => (
                    <OTreeNode
                        key={item._id}
                        item={item}
                    />
                )) }
            </div>
        </dataContext.Provider>
    );
}

export default OTree;