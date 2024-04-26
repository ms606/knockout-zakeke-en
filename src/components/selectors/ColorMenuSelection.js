import React from "react";
import { useZakeke } from 'zakeke-configurator-react';

export const ColorMenuSeleciton = ({
  productCode,
  updateActiveColorOption,
  activeColorOption,
  selectedGroupName,
  currentAttributes
}) => {

  const { publicTranslations } = useZakeke();
	const staticsVals = publicTranslations?.statics; 
  const dynamicsVals  = publicTranslations?.dynamics;


  return (
    <div style={{ width: "100%" }}>
      <div className="colsgrid">
        <div
          data-sel="plain"
          className={(activeColorOption === "plain") ? "active" : ""}
          onClick={() => updateActiveColorOption("plain")}
        >
         {currentAttributes.length === 1 ?   currentAttributes[0].name : dynamicsVals?.get('PLAIN') ?? 'Plain'}  

        </div>                   
       {(productCode != '8427833459022' && productCode != '8427835162958') && 
       <>
        <div
          data-sel="metallic"
          className={activeColorOption === "metallic" ? "active" : ""}
          onClick={() => updateActiveColorOption("metallic")}
        >
         {dynamicsVals?.get('METALLIC') ?? 'Metallic'}   
        </div>
        <div
          data-sel="matte"
          className={activeColorOption === "matte" ? "active" : ""}
          onClick={() => updateActiveColorOption("matte")}
        >
         {dynamicsVals?.get('MATTE') ?? 'Matte'}   
        </div>
        <div
          data-sel="fluorescent"
          className={activeColorOption === "fluorescent" ? "active" : ""}
          onClick={() => updateActiveColorOption("fluorescent")}
        >
          {dynamicsVals?.get('FLUORESCENT') ?? 'Fluorescent'}   
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
         {dynamicsVals?.get('KNOCK-X') ?? 'Knock-X'}  
        </div>}
      </div>
    </div>
  );
};
