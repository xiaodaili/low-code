import {create} from "zustand";

export type Component = {
    id: number,
    name: string,
    props: any,
    desc?: string,
    children?: Component[],
    parentId?: number,
}

type State = {
    components: Component[];
}

interface Action {
    addComponent: (component: Component, parentId?: number) => void;
    deleteComponent: (componentId: number) => void;
    updateComponentProps: (componentId: number, props?: any) => void;
}

export const useComponentStore = create<State & Action>(
    ((set, get) => ({
            components: [
                {
                    id: 1,
                    name: 'Page',
                    props: {},
                    desc: '页面',
                }
            ],
            addComponent: (component, parentId) =>
                set((state) => {
                    console.log(component, parentId, '===>')
                    if (parentId) {
                        const parentComponent = getComponentById(
                            parentId,
                            state.components
                        );

                        if (parentComponent) {
                            if (parentComponent.children) {
                                parentComponent.children.push(component);
                            } else {
                                parentComponent.children = [component];
                            }
                        }

                        component.parentId = parentId;
                        return {components: [...state.components]};
                    }
                    return {components: [...state.components, component]};
                }),
            deleteComponent: (componentId) => {
                if (!componentId) return;

                const component = getComponentById(componentId, get().components);
                if (component?.parentId) {
                    const parentComponent = getComponentById(
                        component.parentId,
                        get().components
                    );

                    if (parentComponent) {
                        parentComponent.children = parentComponent?.children?.filter(
                            (item) => item.id !== +componentId
                        );

                        set({components: [...get().components]});
                    }
                }
            },
            updateComponentProps: (componentId, props) =>
                set((state) => {
                    const component = getComponentById(componentId, state.components);
                    if (component) {
                        component.props = {...component.props, ...props};

                        return {components: [...state.components]};
                    }

                    return {components: [...state.components]};
                }),
        })
    )
);

export function getComponentById(
    id: number | null,
    components: Component[]
): Component | null {
    if (!id) return null;

    for (const component of components) {
        if (component.id == id) return component;
        if (component.children && component.children.length > 0) {
            const result = getComponentById(id, component.children);
            if (result !== null) return result;
        }
    }
    return null;
}