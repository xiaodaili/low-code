import React, {PropsWithChildren} from 'react';
import {useDrop} from "react-dnd";
import {message} from "antd";

import {useComponentStore} from "../../../store/editorStore.ts";
import {useComponentConfigStore} from "../../../store/component-config.ts";
import {useMaterailDrop} from "../../../hooks/useMaterialDrop.ts";

interface PageProps extends PropsWithChildren {
    id: number;
    name: string,
    [key: string]: any
}

function Page({children, id, name}: PageProps) {

    const {addComponent} = useComponentStore()
    const {componentConfig} = useComponentConfigStore()

    const {canDrop, drop } = useMaterailDrop(['Button', 'Container'], id);

    return (
        <div
            ref={drop}
            className='h-[100%] box-border p-[20px]'
            style={{border: canDrop ? '2px solid blue' : 'none'}}
        >
            {children}
        </div>
    );
}

export default Page;