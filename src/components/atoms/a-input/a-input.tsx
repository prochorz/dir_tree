import React, { useRef } from 'react';
import cx from 'classnames';

import Style from './a-input.module.scss';

export interface Props {
    defaultValue?: string;
    render?: any,
    className?: string,
    children?: JSX.Element[] | JSX.Element,
    onChange?: (value: any) => void,
    onBlur?: (value: any) => void
}

const AInput: React.FC<Props> = (props) => {
    const { defaultValue = '', onChange, onBlur, className = '' } = props;
    const inputRef = useRef<HTMLInputElement>();

    const ctxClass = cx(Style['a-input'], className);

    function refBuilder(r: HTMLInputElement) {
        inputRef.current = r;
    }

    function onChangeHandler() {
        if (onChange && inputRef.current) {
            onChange(inputRef.current.value);
        }
    }

    return (
        <div className={ ctxClass }>
            <input
                ref={refBuilder}
                defaultValue={defaultValue}
                type="text"
                onChange={onChangeHandler}
                onBlur={onBlur}
            />
        </div>
    );
}

export default AInput;