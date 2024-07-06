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


  console.log(activeColorOption,selectedGroupName,fitlerAttributesName,'selectedGroupName selectedGroupName');
  return (
    <div style={{ width: "100%" }}>
      <div className="colsgrid">
        <div
          data-sel="plain"
          className={(activeColorOption === "plain" && (
          fitlerAttributesName.toUpperCase() === "METALLIC" ||
          fitlerAttributesName.toUpperCase() === "FLUORESCENT" ||
          fitlerAttributesName.toUpperCase() === "NORMAL" ||
          fitlerAttributesName.toUpperCase() === "MATTE") 
          ) ? "active" : ""}
          onClick={() => updateActiveColorOption("plain")}
        >
         {currentAttributes.length === 1 ?   currentAttributes[0].name : dynamicsVals?.get('PLAIN') ?? 'Plain'}  

        </div>                   
       {(productCode != "9266869076293" && productCode != '8427835162958') && 
       <>
        <div
          data-sel="metallic"
          className={activeColorOption === "metallic" && (
            fitlerAttributesName.toUpperCase() === "METALLIC" ||
            fitlerAttributesName.toUpperCase() === "FLUORESCENT" ||
            fitlerAttributesName.toUpperCase() === "NORMAL" ||
            fitlerAttributesName.toUpperCase() === "MATTE")  ? "active" : ""}
          onClick={() => updateActiveColorOption("metallic")}
        >
         {dynamicsVals?.get('METALLIC') ?? 'Metallic'}   
        </div>
        <div
          data-sel="matte"
          className={activeColorOption === "matte"  && (
            fitlerAttributesName.toUpperCase() === "METALLIC" ||
            fitlerAttributesName.toUpperCase() === "FLUORESCENT" ||
            fitlerAttributesName.toUpperCase() === "NORMAL" ||
            fitlerAttributesName.toUpperCase() === "MATTE")  ? "active" : ""}
          onClick={() => updateActiveColorOption("matte")}
        >
         {dynamicsVals?.get('MATTE') ?? 'Matte'}   
        </div>
        <div
          data-sel="fluorescent"
          className={activeColorOption === "fluorescent"  && (
            fitlerAttributesName.toUpperCase() === "METALLIC" ||
            fitlerAttributesName.toUpperCase() === "FLUORESCENT" ||
            fitlerAttributesName.toUpperCase() === "NORMAL" ||
            fitlerAttributesName.toUpperCase() === "MATTE") ? "active" : ""}
          onClick={() => updateActiveColorOption("fluorescent")}
        >
          {dynamicsVals?.get('FLUORESCENT') ?? 'Fluorescent'}   
        </div>
       </> 
       } 

        {productCode === "9266869076293" && (selectedGroupName?.name.toUpperCase() === 'PALM BACK' || 
        selectedGroupName?.name === 'INCHEIETURA EXTERIOR' || 
        selectedGroupName?.name === 'CUREA' || 
        selectedGroupName?.name === 'DEGET MARE EXTERIOR' || 
        selectedGroupName?.name === 'DEGET MARE INTERIOR' || 
        selectedGroupName?.name === 'PALMA INTERIOR'
        ) && <div
          data-sel="knockX"
          className={activeColorOption === "knockX" || (
            fitlerAttributesName !== "METALLIC" &&
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
