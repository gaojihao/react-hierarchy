import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';

const HookPage = () => {
    const [count, setCount] = useState(0);

    const increase = () => {
        setCount(count + 1);
        console.log('count==', count);
        
    }

    const decrease = useCallback(() => {
        setCount(count - 1);
        console.log('count==', count);
    },[count]);

    const accumulation = () => {
        let xxx = 0;
        for (let index = 0; index <= count; index++) {
            xxx += index;
        }

        return <div>{xxx}</div>
    }

    return (
        <div style={{margin:'10px'}}>
            <div style={{width:'40px', height:'40px', display:'flex', alignContent:'center', justifyContent:'center'}} onClick={() => decrease()}>-</div>
            <div style={{width:'40px', height:'40px', display:'flex', alignContent:'center', justifyContent:'center'}}>
                <span>{count}</span>
            </div>
            <div style={{width:'40px', height:'40px', display:'flex', alignContent:'center', justifyContent:'center'}} onClick={() => increase()}>+</div>
            {
                accumulation()
            }
        </div>
    );
};

export default HookPage;