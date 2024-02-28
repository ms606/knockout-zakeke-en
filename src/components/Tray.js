import React, { useState } from "react";
import "./Tray.css";
import {DesignerHelper, DesignerSignature, DesignerLogo} from './tray/DesignerHelper';
import {
  Image,
  ImageItem,
  Item,
  ProductArea,
  TemplateArea,
  TextItem,
  ZakekeDesigner,
  useZakeke,
} from "zakeke-configurator-react";

const Tray = ({ groupNameList, filteredAreas, toggleFunc, UpdateGroupId }) => {
  //  const [isOpen, setIsOpen] = useState(false);

  const {
    setItemTextOnPath,
    addItemText,
    fonts,
    defaultColor 
  } = useZakeke();

  const templates =  DesignerSignature();
  const templatesLogo =  DesignerLogo();
  // console.log(templates,'items');


  const handleMultipleClicks = (event) => {
    UpdateGroupId(event.target.id);
    toggleFunc('colors');
  };

 const handleTextItem = (actualAreaId) => {
   const itemText ={
     guid: '',
     name: '',
     text: "Enter your name",
     fillColor: defaultColor,
     fontFamily: fonts[0].name,
     fontSize: 48,
     fontWeight: 'normal normal',
     isTextOnPath: false,
     constraints: null,  
     placeholder: 'Input your text here',
     backgroundColor: 'rgb(235, 237, 242)'
 }
 
   console.log(itemText,actualAreaId,'add text');
   addItemText(itemText, actualAreaId);
   toggleFunc('signature');
 }

 const handleImageItem = (actualAreaId) => {
  toggleFunc('logos');

 }

  return (
    <div style={{transition: "all 0.6s cubic-bezier(0.075, 0.82, 0.165, 1) 0s"}}>
      {groupNameList && (
        <div>
           <div className="full-tray">
            
            {/* <div className="tray-container"> */}
            <div className="tray-mc-header">
              {/* class="d-sm-flx flx-ai-sm-c flx-jc-sm-c css-154hl8z" */}
              <button
                className="tray-trigger-close-button"
                onClick={toggleFunc}
              >
               Close 
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 25 25"
                  role="img"
                  width="25px"
                  height="25px"
                  fill="none"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="1.5"
                    d="M18.973 5.027L5.028 18.972M5.027 5.027l13.945 13.945"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="tray-mc-content">
              <div className="tray-mc-list-wrapper">
                {/* class="headline-3 css-4j0u2k" */}
                <div className="mc-list-title">
                  Select Colors
                </div>
                <div className="tray-mc-grid">
                  {groupNameList.map((groupName, i) => {
                    return (
                      <div
                        className="heading"
                        id={groupName.name}
                      >
                        <div
                          className="sitems"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            flexGrow: 1,
                            justifyContent: "flex-start",
                          }}
                          onClick={handleMultipleClicks}
                          id={groupName.id}
                        >
                          <img className="tray-image" id={groupName.id} style={{width: '69px', height: '76px', borderRadius: '4px 4px 0px 0px'}} src={groupName.imageUrl}/>
                          <div id={groupName.id} className="slabel">
                           <span id={groupName.id} style={{fontSize: '9px', position: 'absolute', top: '50%',
                                     left: '50%', transform: 'translate(-50%, -50%)'}}>{groupName.name}</span> 
                          </div>
                          </div>
                      </div>
                    );
                  })}     
                </div>
              </div>
            </div>

            {/* SIGNATURE */}
            <div className="tray-mc-content signature">
              <div className="tray-mc-list-wrapper">
                {/* class="headline-3 css-4j0u2k" */}
                <div className="mc-list-title">
                  Select Signature
                </div>
                <div className="tray-mc-grid">
                  {templates.map((template, i) => {
                    return (
                      <div
                        className="heading"
                        id={template.id}
                      >
                        <div
                          className="sitems"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            flexGrow: 1,
                            justifyContent: "flex-start",
                          }}
                          onClick={() => handleTextItem(template.id)}
                          id={template.id}
                        >
                          {/* <img id={template.id} style={{width: '68.750px', height: '76px', borderRadius: '4px 4px 0px 0px'}} src={groupName.imageUrl}/> */}
                          <div id={template.id} className="slabel">
                           <span id={template.id} style={{fontSize: '9px', position: 'absolute', top: '50%',
                                     left: '50%', transform: 'translate(-50%, -50%)'}}>{template.name}</span> 
                          </div>
                          </div>
                      </div>
                    );
                  })}     
                </div>
              </div>
            </div>


            {/* LOGOS */}
            <div className="tray-mc-content logos">
            <div className="tray-mc-list-wrapper">
              {/* class="headline-3 css-4j0u2k" */}
              <div className="mc-list-title">
                Select Logos
              </div>
              <div className="tray-mc-grid">
                {templatesLogo.map((template, i) => {
                  return (
                    <div
                      className="heading"
                      id={template.id}
                    >
                      <div
                        className="sitems"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          flexGrow: 1,
                          justifyContent: "flex-start",
                        }}
                        onClick={() => handleImageItem(template.id)}
                        id={template.id}
                      >
                        {/* <img id={template.id} style={{width: '68.750px', height: '76px', borderRadius: '4px 4px 0px 0px'}} src={groupName.imageUrl}/> */}
                        <div id={template.id} className="slabel">
                          <span id={template.id} style={{fontSize: '9px', position: 'absolute', top: '50%',
                                     left: '50%', transform: 'translate(-50%, -50%)'}}>{template.name}</span> 
                        </div>
                        </div>
                    </div>
                  );
                })}     
              </div>
            </div>
          </div>

          </div>
        </div>
      )}
    </div>
  );
};
export default Tray;
