import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';

// 组件渲染步骤  组件主体函数 -> 组件渲染(useMemo) ->渲染完毕 -> useEffect

// useCallback 返回一个函数，只有在依赖项发生变化的时候才会更新（返回一个新的函数）
// useMemo 返回一个值，只有在依赖项发生改变的时候，才会重新调用此函数，返回一个新的值


const HookPage = () => {
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);

    const increase = () => {
        setCount(count + 1);
        // 以当前值计算，多次修改state最后一个有效
        // setCount(count + 1);
    }

    const decrease = useCallback(() => {
        setCount(count - 1);
    },[count]);

    console.log('init', count);

    useEffect(() => {
        console.log('useEffect', count);
    },[count])

    const num = useMemo(() => {
        let num = 0;
        for (let index = 0; index <= count; index++) {
            num += index;
        }
        console.log('useMemo', count);
        return num;
      },[count]);

    return (
        <div style={{margin:'10px',display:'flex', alignContent:'center', justifyContent:'center'}}>
            <div style={{width:'40px', height:'40px', display:'flex', alignContent:'center', justifyContent:'center'}} onClick={() => decrease()}>-</div>
            <div style={{width:'40px', height:'40px', display:'flex', alignContent:'center', justifyContent:'center'}}>
                <span>{count}</span>
            </div>
            <div style={{width:'40px', height:'40px', display:'flex', alignContent:'center', justifyContent:'center'}} onClick={() => increase()}>+</div>
            <div>累加值:{num}</div>
        </div>
    );
};

export default HookPage;