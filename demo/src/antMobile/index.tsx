import React from 'react';
import { Tabs } from 'antd-mobile';

const tabs = [{ title: '首页' }, { title: '我发布的' }];

export default () => {
    return (
        <>
            <Tabs tabBarUnderlineStyle={{backgroundColor:'red'}} tabs={tabs} swipeable={false} initialPage={0} />
        </>
    );
}