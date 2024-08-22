import {ReactNode} from "react";
import {create} from "zustand";

import Container from "../editor/materials/Container";
import Button from "../editor/materials/Button";
import Page from "../editor/materials/Page";


export interface ComponentConfig {
    name: string,
    defaultProps: Record<string, string>,
    component: any
}

interface State {
    componentConfig: { [key: string]: ComponentConfig }
}

interface Action {
    registerComponent(name: string, component: ComponentConfig): void;
}

export const useComponentConfigStore = create<State & Action>(
    ((set,get) => {
        return {
            componentConfig: {
                Container: {
                    name: 'Container',
                    defaultProps: {},
                    component: Container
                },
                Button: {
                    name: 'Button',
                    defaultProps: {
                        type: 'primary',
                        text: '按钮'
                    },
                    component: Button
                },
                Page: {
                    name: 'Page',
                    defaultProps: {},
                    component: Page
                }
            },
            registerComponent: (name, componentConfig) => set(state => {
                return {
                    ...state,
                    componentConfig: {
                        ...state.componentConfig,
                        [name]: componentConfig
                    }
                }
            })
        }
    }))