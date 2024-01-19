import React, { useState } from 'react'

export const ColorMenuSeleciton = ({updateActiveColorOption,activeColorOption}) => {
    // const [activeColorOption, setActiveColorOption] = useState('');

    return(
        <div>
            <div className="colsgrid">
              <div data-sel="plain" className={activeColorOption === 'plain' ? 'active':''} onClick={() => updateActiveColorOption('plain')}>Plain</div>
              <div data-sel="metallic" className={activeColorOption === 'metallic' ? 'active' : ''} onClick={() => updateActiveColorOption('metallic')}>Metallic</div>
              <div data-sel="matte" className={activeColorOption === 'matte' ? 'active' : ''} onClick={() => updateActiveColorOption('matte')}>Matte</div>
              <div data-sel="fluorescent" className={activeColorOption === 'fluorescent' ? 'active' : ''} onClick={() => updateActiveColorOption('fluorescent')}>Fluoro</div>
            </div>

        </div>
    )
}

