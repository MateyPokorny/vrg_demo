import React from 'react';

interface InfoPanelProps {
    panelName: string;
    children: React.ReactNode;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ panelName, children }) => {
    return (
        <div className='bg-slate-900 flex-1'>
            <h2 className='bg-slate-950 text-xl font-semibold p-2 text-center'>{panelName}</h2>
            <div className='mt-2 p-4'>
                {children}
            </div>
        </div>
    );
};

export default InfoPanel