import React, { useState } from "react";

export const ColorMenuSeleciton = ({
  productCode,
  updateActiveColorOption,
  activeColorOption,
  selectedGroupName
}) => {
  // const [activeColorOption, setActiveColorOption] = useState('');

  // console.log(productCode, selectedGroupName,'selectedGroup');
  return (
    <div style={{ width: "100%" }}>
      <div className="colsgrid">
        <div
          data-sel="plain"
          className={activeColorOption === "plain" ? "active" : ""}
          onClick={() => updateActiveColorOption("plain")}
        >
          Plain
        </div>           
       {(productCode != '8427833459022' && productCode != '8427835162958') && 
       <>
        <div
          data-sel="metallic"
          className={activeColorOption === "metallic" ? "active" : ""}
          onClick={() => updateActiveColorOption("metallic")}
        >
          Metallic
        </div>
        <div
          data-sel="matte"
          className={activeColorOption === "matte" ? "active" : ""}
          onClick={() => updateActiveColorOption("matte")}
        >
          Matte
        </div>
        <div
          data-sel="fluorescent"
          className={activeColorOption === "fluorescent" ? "active" : ""}
          onClick={() => updateActiveColorOption("fluorescent")}
        >
          Fluoro
        </div>
       </> 
       } 

        {productCode === "8713902948686" && (selectedGroupName?.name === 'PALMA EXTERIOR' || 
        selectedGroupName?.name === 'INCHEIETURA EXTERIOR' || 
        selectedGroupName?.name === 'CUREA' || 
        selectedGroupName?.name === 'DEGET MARE EXTERIOR' || 
        selectedGroupName?.name === 'DEGET MARE INTERIOR' || 
        selectedGroupName?.name === 'PALMA INTERIOR'

        
        ) && <div
          data-sel="knockX"
          className={activeColorOption === "knockX" ? "active" : ""}
          onClick={() => updateActiveColorOption("knockX")}
        >
          Knock X
        </div>}
      </div>
    </div>
  );
};
