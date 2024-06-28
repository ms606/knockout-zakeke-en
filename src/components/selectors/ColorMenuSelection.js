import React from "react";
import { useZakeke } from 'zakeke-configurator-react';

export const ColorMenuSeleciton = ({
  productCode,
  updateActiveColorOption,
  activeColorOption,
  selectedGroupName,
  currentAttributes,
  fitlerAttributesName
}) => {

  const { publicTranslations } = useZakeke();
	const staticsVals = publicTranslations?.statics; 
  const dynamicsVals  = publicTranslations?.dynamics;

  return (
    <div style={{ width: "100%" }}>
      <div className="colsgrid">
        <div
          data-sel="plain"
          className={(activeColorOption === "plain" && (
          fitlerAttributesName === "METALLIC" ||
          fitlerAttributesName === "FLUORESCENT" ||
          fitlerAttributesName === "NORMAL" ||
          fitlerAttributesName === "MATTE") 
          ) ? "active" : ""}
          onClick={() => updateActiveColorOption("plain")}
        >
         {currentAttributes.length === 1 ?   currentAttributes[0].name : dynamicsVals?.get('PLAIN') ?? 'Plain'}  

        </div>                   
       {(productCode != '8427833459022' && productCode != '8427835162958') && 
       <>
        <div
          data-sel="metallic"
          className={activeColorOption === "metallic" && (
            fitlerAttributesName === "METALLIC" ||
            fitlerAttributesName === "FLUORESCENT" ||
            fitlerAttributesName === "NORMAL" ||
            fitlerAttributesName === "MATTE")  ? "active" : ""}
          onClick={() => updateActiveColorOption("metallic")}
        >
         {dynamicsVals?.get('METALLIC') ?? 'Metallic'}   
        </div>
        <div
          data-sel="matte"
          className={activeColorOption === "matte"  && (
            fitlerAttributesName === "METALLIC" ||
            fitlerAttributesName === "FLUORESCENT" ||
            fitlerAttributesName === "NORMAL" ||
            fitlerAttributesName === "MATTE")  ? "active" : ""}
          onClick={() => updateActiveColorOption("matte")}
        >
         {dynamicsVals?.get('MATTE') ?? 'Matte'}   
        </div>
        <div
          data-sel="fluorescent"
          className={activeColorOption === "fluorescent"  && (
            fitlerAttributesName === "METALLIC" ||
            fitlerAttributesName === "FLUORESCENT" ||
            fitlerAttributesName === "NORMAL" ||
            fitlerAttributesName === "MATTE") ? "active" : ""}
          onClick={() => updateActiveColorOption("fluorescent")}
        >
          {dynamicsVals?.get('FLUORESCENT') ?? 'Fluorescent'}   
        </div>
       </> 
       } 

        {productCode === "8870692454734" && (selectedGroupName?.name.toUpperCase() === 'PALMA BACK' || 
        selectedGroupName?.name === 'INCHEIETURA EXTERIOR' || 
        selectedGroupName?.name === 'CUREA' || 
        selectedGroupName?.name === 'DEGET MARE EXTERIOR' || 
        selectedGroupName?.name === 'DEGET MARE INTERIOR' || 
        selectedGroupName?.name === 'PALMA INTERIOR'
        ) && <div
          data-sel="knockX"
          className={activeColorOption === "knockX" || (
            fitlerAttributesName !== "METALIZAT" &&
            fitlerAttributesName !== "FLUORESCENT" &&
            fitlerAttributesName !== "NORMAL" &&
            fitlerAttributesName !== "MAT" 
            ) ? "active" : ""}
          onClick={() => updateActiveColorOption("knockX")}
        >
         {dynamicsVals?.get('KNOCK-X') ?? 'Knock-X'}  
        </div>}
      </div>
    </div>
  );
};
