import React, {useEffect, useState} from 'react';
import { Input, message, Select, InputNumber } from 'antd';
import { IModalFragmentProps, IRecordType } from '../../../component/Modal/delegate.modal';
import { Form } from '../../../component/Form';
import { addCourse } from '../../../api/course';
import { categoryList } from '../../../api/major';

/**
 * 
 * @param  title 标题
 * @param  summary 摘要
 * @param  course_desc 课程描述
 * @param  sub_title 子标题
 * @param  cover_image 封面url
 * @param  category 所属分类
 * @param  real_price 实际价格
 * @param  price 市场价格
 * @param  course_type 课程类型
 */


export const AddCourseFragment: React.FC<IModalFragmentProps<IRecordType>> = ({ delegate: {
    submitRef, refreshPage, setVisible
} }) => {

    const [list, setList] = useState([]);

  useEffect(() => {
    getMajorList();
  }, []);

  const getMajorList = () => {
    categoryList().then((res: any) => {
        setList(res);
    })
  };

    const onSubmit = async(values: {}) => {

        const param =  values;
        
        try {
            await addCourse(param);
            message.success('添加课程成功');
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
                    label: '标题',
                    variableName: 'title',
                    Component: <Input />,
                    rules: [{
                        required: true, 
                        message: '请输入标题'
                    }],
                },{
                    label: '子标题',
                    variableName: 'sub_title',
                    Component: <Input />,
                    rules: [{
                        required: true, 
                        message: '请输入子标题'
                    }],
                },{
                    label: '封面',
                    variableName: 'cover_image',
                    Component: <Input />,
                    rules: [{
                        required: true, 
                        message: '请输入课程封面'
                    }],
                }, {
                    label: '摘要',
                    variableName: 'summary',
                    Component: <Input />,
                    rules: [{
                        required: true, 
                        message: '请输入摘要'
                    }],
                },{
                    label: '课程描述',
                    variableName: 'course_desc',
                    Component: <Input />,
                    rules: [{
                        required: true, 
                        message: '请输入课程描述'
                    }],
                },{
                    label: '所属分类',
                    variableName: 'category',
                    Component: (
                        <Select style={{
                            width: '150px'
                        }}
                        >
                            {list.map((value:{id: number, name: string}) => 
                                <Select.Option key={value.id} value={value.id}>{value.name}</Select.Option>
                            )}
                        </Select>
                    ),
                    rules: [{
                        required: true, 
                        message: '请选择所属分类'
                    }],
                },{
                    label: '实际价格',
                    variableName: 'real_price',
                    Component: <InputNumber defaultValue={0} />,
                    rules: [{
                        required: true, 
                        message: '请输入课程价格'
                    }],
                },{
                    label: '市场价格',
                    variableName: 'price',
                    Component: <InputNumber defaultValue={0} />,
                    rules: [{
                        required: true, 
                        message: '请输入课程市场价格'
                    }],
                }]}
                submitButtonRef={submitRef}
                showSubmitButton={false}
                submitHandler={onSubmit}
            />
        </React.Fragment>
    );
};