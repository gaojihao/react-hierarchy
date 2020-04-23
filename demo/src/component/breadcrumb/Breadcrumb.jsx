import React from 'react';
import { Breadcrumb, Divider } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import routes from '../../router/router';

const ZLBreadcrumb = () => {
    let location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);
    return (
        <Breadcrumb separator={<Divider type="vertical" />}>
            {pathSnippets.map((pathName, index) => {
                const pathIndex = location.pathname.indexOf(pathName);
                const pathString = location.pathname.substring(0, pathIndex + pathName.length);
                const currentPath = routes.filter(item => item.path === pathString)[0]

                console.log(`pathIndex====${pathIndex} pathString====${pathString} currentPath====${currentPath}`);

                if (currentPath && currentPath.breadcrumbName) {
                    return (
                        <Breadcrumb.Item key={index}>
                            <Link to={currentPath.breadcrumbPath}>{currentPath.breadcrumbName}</Link>
                        </Breadcrumb.Item>
                    );
                } else {
                    return ""
                }

            })}
        </Breadcrumb>
    );
};


export default ZLBreadcrumb;