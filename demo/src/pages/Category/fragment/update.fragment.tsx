import React from 'react';
import { Input } from 'antd';
import { IModalFragmentProps, IRecordType } from '../../../component/Modal/delegate.modal';
import { Form } from '../../../component/Form';
import { editCategory } from '../../../api/major';

const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 12 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


export const UpdateMajorFragment: React.FC<IModalFragmentProps<IRecordType>> = ({ delegate: {
    submitRef, record, refreshPage, setVisible
} }) => {

    const updateRequest = async(values: {}) => {

        const param =  {id:record.id, ...values};
        
        try {
            await editCategory(param);
            refreshPage?.();
            setVisible!(false);

        } catch (error) {
            setVisible!(false);
        }
    };

    return (
        <React.Fragment>
            <Form
                list={[{
                    label: '名称',
                    variableName: 'name',
                    Component: <Input value={record.name}/>,
                    rules: [{
                        required: true, 
                        message: '请输入名称'
                    }],
                }]}
                submitButtonRef={submitRef}
                showSubmitButton={false}
                submitHandler={updateRequest}
            />
        </React.Fragment>
    );
};