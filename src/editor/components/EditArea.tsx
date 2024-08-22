import React, {ReactNode, useCallback, useEffect} from 'react';
import {type Component, useComponentStore} from "../../store/editorStore.ts";
import {useComponentConfigStore} from "../../store/component-config.ts";

function EditArea() {
    const {components: componentsInfo, addComponent} = useComponentStore()
    const {componentConfig} = useComponentConfigStore()
    // useEffect(() => {
    //     console.log('执行力')
    //     addComponent({
    //         id: 222,
    //         name: 'Container',
    //         props: {},
    //         children: [{
    //             id: 2,
    //             name: 'Button',
    //             props: [],
    //             children: [],
    //             desc: '测试按钮'
    //         }],
    //         desc: '这是测试描述'
    //     }, 1);
    // }, []);
    const renderComponents = useCallback((componets: Component[]): ReactNode => {
        return componets.map((item: Component) => {
            const config = componentConfig[item.name]
            if (!config.component) {
                return null
            }
            return React.createElement(
                config.component,
                {
                    key: item.id,
                    id: item.id,
                    name: item.name,
                    ...config.defaultProps,
                    ...item.props
                },
                renderComponents(item.children || [])
            )
        })
    }, [])
    return (
        <div className='h-[100%]'>
            {/*这是编辑区域*/}
            {/*<pre style={{textWrap: 'wrap'}}>*/}
            {/*    {JSON.stringify(componentsInfo)}*/}
            {/*</pre>*/}
            {renderComponents(componentsInfo)}
        </div>
    );
}

export default EditArea;