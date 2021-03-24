import React, { useState } from 'react';
import cx from 'classnames';

import Style from './a-edit-node.module.scss';

import AButton from '../a-button';
import AInput from '../a-input';

export interface Props {
    defaultValue: string,
    render?: any,
    className?: string,
    children?: JSX.Element[] | JSX.Element,
    onChange: (value: any) => void,
    onDelete: (value: any) => void,
}

const AEditNode: React.FC<Props> = (props) => {
    const { defaultValue, onChange, onDelete, className = '' } = props;
    const [isEditMode, setIsEditMode] = useState(false);
    const [name, setName] = useState(defaultValue);

    const ctxClass = cx(Style['a-edit-node'], className);

    const deleteIcon = '❌';
    const closeIcon = '✅️';

    function toggleEditMode() {
        setIsEditMode(!isEditMode);
    }

    function onChangeHandler(value: string) {
        setName(value);
        onChange(value);
    }

    function onDeleteHandler() {
        onDelete(true);
    }

    return (
        <div className={ ctxClass }>
            <div>
                { isEditMode
                    ? (
                        <AInput
                            defaultValue={name}
                            onChange={onChangeHandler}
                            onBlur={toggleEditMode}
                        />
                    )
                    : (
                        <span onClick={toggleEditMode}>
                            { name }
                        </span>
                    )
                }

            </div>
            { isEditMode && (
                <div>
                    <AButton
                        label={deleteIcon}
                        onClick={onDeleteHandler}
                    />
                    <AButton
                        label={closeIcon}
                        onClick={toggleEditMode}
                    />
                </div>
            ) }
        </div>
    );
}

export default AEditNode;