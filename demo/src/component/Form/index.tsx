import React from 'react';
import { Form as AntForm, Button } from 'antd';
import { FormProps, Rule } from 'antd/lib/form';


type AnyFunction = (...params: any[]) => any;

export interface IFormList {
    label: string;
    variableName: string;
    Component: JSX.Element;
    rules?: Rule[];
    format?: (value: any) => any;
}


export interface IFormProps extends FormProps {
    list: IFormList[];
    layout?: any;
    submitHandler?: (values: any) => void;
    showSubmitButton?: boolean;
    submitButtonRef?: React.RefObject<HTMLElement>;
    resetHandler?: AnyFunction;
    isButtonsMiddle?: boolean;
}

export const Form = (formProps: IFormProps) => {
    const resetHandler = () => {
        formProps.form?.resetFields();
        formProps.resetHandler?.();
    };
    const formatter: {
        [key: string]: any;
    } = {};

    const layout = formProps.layout ? formProps.layout : { layout: 'inline' };

    const Fields = formProps.list.map((item:IFormList) => {

        formatter[item.variableName] = item.format;
        return (
            <React.Fragment key={item.variableName}>
                <AntForm.Item label={item.label || ' '} name={item.variableName} rules={item.rules} >
                    {item.Component}
                </AntForm.Item>
            </React.Fragment>
        );
    });

    const onFinish = (values: {}) => {

        if (formProps.submitHandler) {
            formProps.submitHandler!(
                Object.entries(values).reduce(
                    (acc, crr) => {
                        if (formatter[crr[0]]) acc[crr[0]] = formatter[crr[0]](crr[1]);
                        else acc[crr[0]] = crr[1];
                        return acc;
                    },
                    {} as any,
                ),
            );
        }
    };

    const onFinishFailed = () => {

    };

    return (
        <AntForm
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            {...layout}
        >
            {Fields}
            <div
                style={{
                    display: Fields.length > 0 ? 'flex' : 'none',
                }}
            >
                <div
                    style={{
                        display: formProps.showSubmitButton === false ? 'none' : undefined,
                    }}
                >
                    <Button type='primary' htmlType='submit'>
                        <span ref={formProps.submitButtonRef}>确定</span>
                    </Button>
                    <Button onClick={resetHandler}>重置</Button>
                </div>
            </div>
        </AntForm>
    );
};



