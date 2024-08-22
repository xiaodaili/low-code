import React, {PropsWithChildren, useMemo} from 'react';
import {useComponentConfigStore} from "../../store/component-config.ts";
import MaterialItem from "./MaterialItem.tsx";

function Material({children}: PropsWithChildren) {
    const {componentConfig} = useComponentConfigStore()

    const components = useMemo(() => {
        return Object.values(componentConfig)
    }, [componentConfig])

    return (
        <div>
            {
                components.map((item, index) => {
                    return <MaterialItem name={item.name} key={item.name + index}/>
                })
            }
        </div>
    );
}

export default Material;