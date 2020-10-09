import React, { Component } from 'react';


// 装饰器是一个对类进行处理的函数。装饰器函数的第一个参数，就是所要装饰的目标类
const testable = (isTestable: boolean) => (target: any) => {
    target.prototype.isTestable = isTestable;
}

function dec(id: number) {
    console.log('evaluate', id);
    /**
     * target: 类的实例
     * property: 修饰的方法名称
     * descriptor: {writable: true, enumerable: false, configurable: true, value: ƒ} 
     */
    return (target: any, property: any, descriptor: any) => {
        console.log(`executed:${id}`);
    };
}


const wrapper = (Comp: any) => (props: Readonly<{count: number}>) => <div>
    B component{props.count}
    <hr />
    <Comp />
</div>

@testable(true)
// @wrapper
export default class DecoratorPage extends Component {

    @dec(1)
    render() {
        return <div>A component</div>
    }
};