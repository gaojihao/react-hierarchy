import React, { useState, useRef } from 'react';
import { Modal } from 'antd';

type AnyFunction = (...params: any[]) => any;

export interface IModalFragmentProps<T> {
    delegate: {
        record: T;
        refreshPage?: AnyFunction;
        onSubmit?: AnyFunction;
        setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
        submitRef?: React.RefObject<HTMLElement>;
    };
}

export interface IModalProps<T> extends IModalFragmentProps<T> {
    button: React.ReactFragment;
    Fragment: React.FC<IModalFragmentProps<T>>;
    title: string
}

export interface IRecordType {
    name: string;
    id: number;
}

export const ButtonDelegateModal: React.FC<IModalProps<any>> = <T extends IRecordType>(props: IModalProps<T>) => {

    const { Fragment, title, button } = props;
    const [visible, setVisible] = useState(false);
    const submitRef = useRef<HTMLElement>(null);

    props.delegate.setVisible = setVisible;
    props.delegate.submitRef = submitRef;
    props.delegate.onSubmit = () => props.delegate.submitRef?.current?.click();

    return (
        <React.Fragment>
            <span onClick={(e) => setVisible(true)}>
                {button}
            </span>
            <Modal
                title={title}
                visible={visible}
                onCancel={() => setVisible(false)}
                onOk={props.delegate.refreshPage ? props.delegate.onSubmit : () => setVisible(false)}
            >
                <Fragment delegate={props.delegate} />
            </Modal>
        </React.Fragment>
    );
};



