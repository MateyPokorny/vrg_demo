"use client";

import React from 'react';
import LayoutStyle from '../MainMap/types';


interface HeaderBarProps {
    isDrawing: boolean;
    layoutStyle: LayoutStyle;
    toggleDrawInteraction: () => void;
    toggleLayout: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ isDrawing, toggleDrawInteraction, toggleLayout, layoutStyle}) => {
    return (
        <div className='flex justify-end'>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition m-2" onClick={toggleDrawInteraction}>
          {isDrawing ? 'Zastavit měření' : 'Spustit měření'}
        </button>

        <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition m-2" onClick={toggleLayout}>
          {layoutStyle === LayoutStyle.PANELS_RIGHT ? 'Layout 1' : 'Layout 2'}
        </button>
      </div>
    );
};

export default HeaderBar;