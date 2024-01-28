import React, { useState } from 'react'

export const ColorMenuSeleciton = ({updateActiveColorOption,activeColorOption}) => {
    // const [activeColorOption, setActiveColorOption] = useState('');

    return(
        <div style={{width: '100%'}}>
            <div className="colsgrid">
              <div data-sel="plain" className={activeColorOption === 'plain' ? 'active':''} onClick={() => updateActiveColorOption('plain')}>Plain</div>
              <div data-sel="metallic" className={activeColorOption === 'metallic' ? 'active' : ''} onClick={() => updateActiveColorOption('metallic')}>Metallic</div>
              <div data-sel="matte" className={activeColorOption === 'matte' ? 'active' : ''} onClick={() => updateActiveColorOption('matte')}>Matte</div>
              <div data-sel="fluorescent" className={activeColorOption === 'fluorescent' ? 'active' : ''} onClick={() => updateActiveColorOption('fluorescent')}>Fluoro</div>
              <div data-sel="knockX" className={activeColorOption === 'knockX' ? 'active' : ''} onClick={() => updateActiveColorOption('knockX')}>Knock X</div>
            </div>
        </div>
    )
}

