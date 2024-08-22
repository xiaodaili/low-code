import React from 'react';
import {Allotment} from "allotment";
import 'allotment/dist/style.css'
import Header from "./components/Header.tsx";
import Material from "./components/Material.tsx";
import EditArea from "./components/EditArea.tsx";

function LowCodeEditor() {
    return (
        <div className='h-[100vh] flex flex-col'>
            <Header title='这是测试的标题' className={'h-[60px] flex items-center border-b-[1px] border-[#000]'}/>
            <Allotment>
                <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
                    <Material/>
                </Allotment.Pane>
                <Allotment.Pane>
                  <EditArea/>
                </Allotment.Pane>
                <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
                    Setting
                </Allotment.Pane>
            </Allotment>
        </div>
    );
}

export default LowCodeEditor;