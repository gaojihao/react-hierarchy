import React from 'react';
import { ListView } from 'antd-mobile';

const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];

const List: React.FC = () => {

    const dataSource = new ListView.DataSource({
        rowHasChanged: (row1: any, row2: any) => row1 !== row2,
    });

    
    const row = (rowData: {title: string; img: string; des: string}) => {
        return (
            <div style={{ padding: '0 15px' }}>
                <div
                    style={{
                        lineHeight: '50px',
                        color: '#888',
                        fontSize: 18,
                        borderBottom: '1px solid #F6F6F6',
                    }}
                >{rowData.title}</div>
                <div style={{ display: '-webkit-box', padding: '15px 0' }}>
                    <img style={{ height: '64px', marginRight: '15px' }} src={rowData.img} alt="" />
                    <div style={{ lineHeight: 1 }}>
                        <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{rowData.des}</div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <ListView
                dataSource={dataSource.cloneWithRows(data)}
                renderRow={row}
                style={{
                    overflow: 'auto',
                    height:'100vh',
                    marginTop:'20px',
                    marginBottom:'20px',
                }}
                pageSize={4}
                onScroll={() => { console.log('scroll'); }}
                scrollRenderAheadDistance={500}
                onEndReachedThreshold={10}
            />
    );
}

export default List;