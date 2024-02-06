import React, { useState } from "react";
import "./Tray.css";
import DesignerHelper from './tray/DesignerHelper';

const Tray = ({ groupNameList, filteredAreas, toggleFunc, UpdateGroupId }) => {
  //  const [isOpen, setIsOpen] = useState(false);

  const templates =  DesignerHelper();
  console.log(templates,'items');
  const handleMultipleClicks = (event) => {

    console.log(event, 'eventtttt');
    UpdateGroupId(event.target.id);
    toggleFunc();
  };
 
  return (
    <div>
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
                          <img id={groupName.id} style={{width: '68.750px', height: '76px', borderRadius: '4px 4px 0px 0px'}} src={groupName.imageUrl}/>
                          <div id={groupName.id} className="slabel">
                           <span id={groupName.id} style={{fontSize: '9px'}}>{groupName.name}</span> 
                          </div>
                          </div>
                      </div>
                    );
                  })}     
                </div>
              </div>
            </div>

            {/* LOGOS */}
            <div className="tray-mc-content">
              <div className="tray-mc-list-wrapper">
                {/* class="headline-3 css-4j0u2k" */}
                <div className="mc-list-title">
                  Select Logos
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
                          onClick={handleMultipleClicks}
                          id={template.id}
                        >
                          {/* <img id={template.id} style={{width: '68.750px', height: '76px', borderRadius: '4px 4px 0px 0px'}} src={groupName.imageUrl}/> */}
                          <div id={template.id} className="slabel">
                           <span id={template.id} style={{fontSize: '9px'}}>{template.name}</span> 
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
