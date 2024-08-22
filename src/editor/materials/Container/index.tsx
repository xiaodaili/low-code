import React, {PropsWithChildren} from 'react';
import {useMaterailDrop} from "../../../hooks/useMaterialDrop.ts";

interface ContainerProps extends PropsWithChildren {
    id: number;
    name: string,

    [key: string]: any
}

function Container({children, id, name}: ContainerProps) {
    const {canDrop, drop} = useMaterailDrop(['Button', 'Container'], id);
    return (
        <div ref={drop}
             className='border-[1px] border-[#000] p-[20px] min-h-[100px]:'
        >
            {children}
        </div>
    );
}

export default Container;