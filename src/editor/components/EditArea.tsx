import React, {MouseEventHandler, ReactNode, useCallback, useEffect, useState} from 'react';
import {type Component, useComponentStore} from "../../store/editorStore.ts";
import {useComponentConfigStore} from "../../store/component-config.ts";
import HoverMask from "./HoverMask.tsx";

function EditArea() {
    const {components: componentsInfo, addComponent} = useComponentStore()
    const {componentConfig} = useComponentConfigStore()
    const [hoverComponentId, setHoverComponentId] = useState<number>()

    //render
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

    // const handleMouseOver = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    //     const path = e.nativeEvent.composedPath()
    //     for (let i = 0; i < path.length; i++) {
    //         const element = path[i] as HTMLElement
    //         const componentId = element.dataset.componentId
    //         if (componentId) {
    //             setHoverComponentId(+componentId)
    //             return
    //         }
    //     }
    // }, [hoverComponentId])
    const handleMouseOver: MouseEventHandler = (e) => {
        const path = e.nativeEvent.composedPath();
        for (let i = 0; i < path.length; i += 1) {
            const ele = path[i] as HTMLElement;

            const componentId = ele.dataset?.componentId;
            if (componentId) {
                setHoverComponentId(+componentId);
                return;
            }
        }
    }

    return (
        <div className='h-[100%] edit-area' onMouseOver={handleMouseOver}
             onMouseLeave={() => setHoverComponentId(undefined)}>
            {/*这是编辑区域*/}
            {/*<pre style={{textWrap: 'wrap'}}>*/}
            {/*    {JSON.stringify(componentsInfo)}*/}
            {/*</pre>*/}
            {renderComponents(componentsInfo)}
            {
                hoverComponentId && (
                    <HoverMask containerClassName='edit-area' componentId={hoverComponentId}/>
                )
            }
        </div>
    );
}

export default EditArea;