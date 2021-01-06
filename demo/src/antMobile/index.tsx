import React from 'react';
import { Tabs } from 'antd-mobile';
import List from './ListView';

const tabs = [{ title: '首页' }, { title: '我发布的' }];


export default () => {
    return (
        <>
            <Tabs tabBarUnderlineStyle={{backgroundColor:'red'}} tabs={tabs} swipeable={false} initialPage={0} >
                <List />
                <div>
                    Content of second tab
                </div>  
            </Tabs>
        </>
    );
}