import "./selector.css";
import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as SearchPlusSolid } from "../assets/icons/search-plus-solid.svg";
import { ReactComponent as SearchMinusSolid } from "../assets/icons/search-minus-solid.svg";
import { useZakeke } from "zakeke-configurator-react";
import { List, ListItem, ListItemColor, ListItemImageNoCarousel } from "./list";
import { PreviewContainer, BlurOverlay } from "./previewContainer";
import Tray from "./Tray";
import TrayPreviewOpenButton from "./TrayPreviewOpenButton";
import MenuTriggerButton from "./MenuTriggerButton";
import ProgressBarLoadingOverlay from "./widgets/ProgressBarLoadingOverlay";
import Designer from "./layouts/Designer";
import { GroupItem, GroupIcon } from "./layouts/LayoutStyled";
import { createPortal } from "react-dom";
import useStore from "../Store";
import { makeFirstLetterCaps, T } from "../Helpers";
import Footer from "./layouts/Footer";
import FooterMobile from "./layouts/FooterMobile";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ReactComponent as AngleLeftSolid } from "../assets/icons/angle-left-solid.svg";
import { ReactComponent as AngleRightSolid } from "../assets/icons/angle-right-solid.svg";

import './selectors/colsgrid.css'
import { ColorMenuSeleciton } from "./selectors/ColorMenuSelection";


const dialogsPortal = document.getElementById("dialogs-portal")!;

interface TrayPreviewOpenButton3DProps {
  trayPreviewOpenButton3DFunc: (data: any) => void;
}

const Selector: FunctionComponent<TrayPreviewOpenButton3DProps> = ({
  trayPreviewOpenButton3DFunc,
}) => {
  const {
    isSceneLoading,
    loadComposition,
    isAddToCartLoading,
    isAreaVisible,
    price,
    groups,
    product,
    selectOption,
    addToCart,
    templates,
    setTemplate,
    setCamera,
    productName,
    zoomIn,
    zoomOut,
    items,
    getOnlineScreenshot
  } = useZakeke();
  
  const { setIsLoading, isMobile } = useStore();
//  console.log(useZakeke(),'gsddfdalfkdaklsjfdjadsfjdslj');

  // Keep saved the ID and not the refereces, they will change on each update
  const [selectedGroupId, selectGroup] = useState<number | null>(null);
  const [selectedStepId, selectStep] = useState<number | null>(null);
  const [selectedAttributeId, selectAttribute] = useState<number | null>(null);
  const [selectedOptionId, selectOptionId] = useState<number | null>(null);
  const [selectedOptionName, selectOptionName] = useState<string | null>(null);

  const [selectedColorName, selectColorName] = useState<any | null>(null);
  const [hasTypeZero, setHasTypeZero] = useState<boolean | null>(null);
  const [stitchTypeGroup, setStitchTypeGroup] = useState<any | null>(null);

  // Get a list of all group names so we can populate on the tray
  const [selectedGroupList, selectGroupList] = useState<any | null>(null);

  // Open tray for menu
  const [isTrayOpen, setIsTrayOpen] = useState<any | null>(false);

  // Get the id of the selected group from the tray
  const [selectedGroupIdFromTray, selectGroupIdFromTray] = useState<
    number | null
  >(null);

  // Update tray preview open button
  const [selectedTrayPreviewOpenButton, selectTrayPreviewOpenButton] =
    useState<boolean>(false);


  // Selection of colours 
  const [activeColorOption, setActiveColorOption] = useState('');

  const updateActiveColorOption = (label:any) => {
    setActiveColorOption(label)
  }
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const [width, setWidth] = useState(window.innerWidth);

  const selectedGroup = groups.find((group) => group.id === selectedGroupId);
  const selectedStep = selectedGroup
    ? selectedGroup.steps.find((step) => step.id === selectedStepId)
    : null;

  const [selectedPersonalize, setSelectedPersonalize] = useState<any | null>(
    false
  );
  

  // Filter logos and signature for tray 
  const filteredAreas = null;
  // product?.areas.filter((area) => isAreaVisible(area.id)) ?? [];

  // Attributes can be in both groups and steps, so show the attributes of step or in a group based on selection
  const attributes = useMemo(
    () => (selectedStep || selectedGroup)?.attributes ?? [],
    [selectedGroup, selectedStep]
    );
    
    const selectedAttribute = attributes.find(
      (attribute) => attribute.id === selectedAttributeId
    );

  let indexToRemove = groups.findIndex((obj) => obj.id === -1);
  if (indexToRemove !== -1) {
    groups.splice(indexToRemove, 1);
  }

  useEffect(() => {
    const itemAvailable = items?.filter((item) => item.type === 0).length > 0;

    // console.log(itemAvailable, "itemAvailable", hasTypeZero);
    if (items && !itemAvailable) {
      // console.log("a");

      //console.log(currentIndex, hasTypeZero,groups, groupToSave,'stats');
      //  console.log(groups[groups.length -1], items, hasTypeZero);

      if (groups[groups.length - 1]?.name === "MODALITATE IMPRIMARE") {
        setStitchTypeGroup(groups[groups.length - 1]);
      }

      if (
        hasTypeZero == false ||
        items.filter((item) => item.type === 0).length === 0
      ) {
        const indexToDel = groups.findIndex(
          (obj) => obj.name === "MODALITATE IMPRIMARE"
        );
        // console.log(indexToDel, 'index to delete');

        // if (hasTypeZero == false && indexToDel > 0) groups?.splice(groups.length -1, 1);
        for (let i = 0; i < groups.length; i++) {
          // if (hasTypeZero){
          // console.log(selectedOptionName,'selectedOptionId');
          if (
            selectedOptionName !== "PRINTAT" &&
            selectedOptionName !== "BRODAT"
          ) {
            if (groups[i]?.name === "MODALITATE IMPRIMARE") groups.splice(i, 1);
          }
          //  }
        }
      }
    }

    if (items && itemAvailable) {
      if (items.filter((item) => item.type === 1)) {
        if (groups[groups.length - 1]?.name != "MODALITATE IMPRIMARE") {
          groups.push(stitchTypeGroup);
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }
  }, [hasTypeZero, groups, items]);

  const dialogsPortal = document.getElementById("dialogs-portal");


  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      //   setHeight(window.innerHeight);
    };

    //window.addEventListener('resize', handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [items]);

  // Open the first group and the first step when loaded
  useEffect(() => {
    // console.log("loading in the first group");

    if (items?.some((obj) => obj.type === 0)) {
      setHasTypeZero(items?.some((obj) => obj.type === 0));
    } else {
      setHasTypeZero(false);
    }

    if (!selectedGroup && groups.length > 0) {
      selectGroup(groups[0].id);

      if (groups[0].steps.length > 0) selectStep(groups[0].steps[0].id);

      if (selectedStep){
        if (activeColorOption === 'fluorescent'){
          // console.log(selectedStep.attributes[3].id,'sdfdsfsdfs');
          selectAttribute(selectedStep.attributes[3].id);
          // selectStep(selectedStep.attributes[1].id);
          
        }
      };
      
      if (templates.length > 0) setTemplate(templates[0].id);
    }

    if (groups.length > 0) {
      var groupRec: { id: number, name: string, imageUrl: string | null | undefined}[] = [];
      groups.map((group) => {
        groupRec.push({id: group.id, name: group.name, imageUrl: group.imageUrl});
      });
      selectGroupList(groupRec);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroup, groups]);


  // Select attribute first time
  useEffect(() => {
   
    // console.log(selectedGroup, selectedStep, selectedAttribute,'Select attribute first time');

    if (!selectedAttribute && attributes.length > 0) selectAttribute(attributes[0].id);

      if (selectedStep){
        if (activeColorOption === 'plain'){
          selectAttribute(selectedStep.attributes[0].id);          
        }
        if (activeColorOption === 'metallic'){
          selectAttribute(selectedStep.attributes[1].id);          
        }
        if (activeColorOption === 'matte'){
          selectAttribute(selectedStep.attributes[2].id);          
        }
        if (activeColorOption === 'fluorescent'){
          selectAttribute(selectedStep.attributes[3].id);          
        }
      };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAttribute, attributes, activeColorOption]);

  useEffect(() => {
    // setCamera('2324', false)
    
    if (selectedGroup) {
      const camera = selectedGroup.cameraLocationId;
      if (camera) setCamera(camera);
    }

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroupId]);

  

  if (isSceneLoading || !groups || groups.length === 0)
    return (
      <PreviewContainer>
        <BlurOverlay>
          {/* <span>Loading scene...</span>; */}
          <ProgressBarLoadingOverlay />
        </BlurOverlay>
      </PreviewContainer>
    );

  // groups
  // -- attributes
  // -- -- options
  // -- steps
  // -- -- attributes
  // -- -- -- options



  const handleLeftClick = () => {
    selectColorName("");
    setCurrentIndex((currentIndex - 1 + groups.length) % groups.length);
    selectGroup(groups[(currentIndex - 1 + groups.length) % groups.length].id);

    if (items.filter((item) => item.type === 0).length === 0) {
      if (groups[groups.length - 1].name === "MODALITATE IMPRIMARE")
        if (items?.filter((item) => item.type === 0)) {
          groups.splice(groups.length - 1, 1);
        }
    }
  };

  async function downloadImage(url:any) {
    try {
      // Replace the URL with your actual image URL
      const imageUrl = url;
  
      // Fetch the image as a blob
      const response = await fetch(imageUrl);//, { responseType: 'blob' });
      const imageBlob = await response.blob();
  
      // Create a Blob URL
      const blobUrl = URL.createObjectURL(imageBlob);
  
      // Create an anchor element
      const link = document.createElement('a');
      link.href = blobUrl;
  
      // Set the download attribute with the desired file name
      link.download = 'yourImage.jpg';
  
      // Append the anchor element to the document
      document.body.appendChild(link);
  
      // Trigger a click on the anchor element
      link.click();
  
      // Remove the anchor element and revoke the Blob URL
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  }


  const handleScreenShotClick = async () => {

		try {
      const url = await getOnlineScreenshot(800,800);
      // console.log(url.originalUrl);
      if (url) downloadImage(url.originalUrl)
    
			// setIsLoading(true);
			// setPdfIsLoading(true);
			// const url = await getPDF();
			// showDialog('pdf', <PdfDialog url={url} onCloseClick={() => closeDialog('pdf')} />);
		} catch (ex) {
			console.error(ex);
			// showError(T._('Failed PDF generation', 'Composer'));
		} finally {
			// setPdfIsLoading(false);
		// 	setIsLoading(false);
		}
	};

  const handleRightClick = () => {
    selectColorName("");
    setCurrentIndex((currentIndex + 1) % groups.length);
    selectGroup(groups[(currentIndex + 1) % groups.length].id);

    if (items.filter((item) => item.type === 0).length === 0) {
      if (groups[groups.length - 1].name === "MODALITATE IMPRIMARE")
        if (items?.filter((item) => item.type === 0)) {
          groups.splice(groups.length - 1, 1);
        }
    }
  };

  const toggleTray = () => {
    if (selectedTrayPreviewOpenButton) {
      selectTrayPreviewOpenButton(!selectedTrayPreviewOpenButton);
    }
    // trayPreviewOpenButton();
    setIsTrayOpen(!isTrayOpen);
  };

  const trayPreviewOpenButton = () => {
    selectTrayPreviewOpenButton(!selectedTrayPreviewOpenButton);

    //trayPreviewOpenButton3DFunc(selectedTrayPreviewOpenButton);
    trayPreviewOpenButton3DFunc(selectedTrayPreviewOpenButton);
  };

  const groupIdFromFunc = (data: number) => {
    // console.log(data,groups,'filteredArrayfilteredArray');
    
    const filteredArray = groups.filter((group) => group.id == data);
    // console.log(filteredArray,'filteredArray');

    const filteredArrayId = groups.filter((i: any, index: number) => {
      return i.id == data;
    });

    // console.log(filteredArray,filteredArrayId);
    
    if (filteredArrayId.length > 0) {
      const foundItem = filteredArrayId[0];
      const foundItemIndex = groups.indexOf(foundItem);
      setCurrentIndex(foundItemIndex);
    }

    // console.log(filteredArray,'filteredArray');
    
    // selectGroup(data);
    // selectGroupIdFromTray(data);
    selectGroup(filteredArray[0].id);
     selectGroupIdFromTray(filteredArray[0].id);
  };

  const togglePersonalize = () => {
    setSelectedPersonalize(!selectedPersonalize);
  };

  const containerStyles = {
    // overflow: "auto",
    width: "100%",
    // height: !selectedTrayPreviewOpenButton ? "13rem" : "70px",
  };

  let groupNameText = makeFirstLetterCaps(groups[currentIndex]?.name);

  return (
    <>
      <div className="top-nav">
        <div className="body-3" id="product-info">
          {productName}
          {/* <span>LEI {price}</span> */}
        </div>

        <div className="top-right-controls">
        <div id="savepic" data-hasqtip="98" title="" aria-describedby="qtip-98" onClick={() => handleScreenShotClick()}>
          <i className="fa fa-camera" style={{color: 'rgb(54, 179, 237)'}}></i>
        </div>
         
        </div>
      </div>

  
      {/* Personalize A */}
      {!isMobile && (
        <div
          className="iHdtWA group-item selected"
          style={{
            position: "absolute",
            top: "5%",
            right: "1%",
            cursor: "pointer",
            marginLeft: "20px",
            width: "30vw",
          }}
        >
          <div
            className="button-53"
            onClick={() => setSelectedPersonalize(!selectedPersonalize)}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "7px",
              }}
            >
              {T._("Personalizează", "Composer")}
            </span>
          </div>
          {selectedPersonalize ? (
            <Designer togglePersonalize={togglePersonalize} />
          ) : (
            ""
          )}
        </div>    
      )}

      <div className="animate-wrapper-0">
     
        <div style={containerStyles}>
          {/* {groups[currentIndex].name === "MODALITATE IMPRIMARE" && (!hasTypeZero) ? null : ( */}

            {/* Closed on request of Paul */}
            {/* <MenuTriggerButton width={width} toggleTray={toggleTray} /> */}

          <div className="tray-header">
            {/* <TrayPreviewOpenButton
              width={width}
              trayPreviewOpenButton={trayPreviewOpenButton}
              selectedTrayPreviewOpenButton={selectedTrayPreviewOpenButton}
              selectTrayPreviewOpenButton={selectTrayPreviewOpenButton}
            /> */}

            <div
              style={{
                display: "flex",
                width: "100%",
                height: "auto",
                margin: "0px auto",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="tray-header-1">
                <div
                  style={{
                    // position: "absolute",
                    // padding: "0px",
                    width: "100%",
                  }}
                >
                  <div className="active-marketing-component-name" onClick={()=> toggleTray()}>
                    <span
                      style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        lineHeight: "28px",
                        paddingRight: '15px'
                      }}
                    >
                      {groupNameText}
                
                    </span>
                    <div className="arrd">
                      <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        // xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 36 36"
                      //  style="enable-background:new 0 0 36 36;"
                        // xml:space="preserve"
                      >
                        <path
                          fill="#ffffff"
                          d="M16.1,26.54l-9.29-9.29c-1.05-1.05-1.05-2.75,0-3.8l0,0c1.05-1.05,2.75-1.05,3.8,0L18,20.85l7.39-7.39
											c1.05-1.05,2.75-1.05,3.8,0l0,0c1.05,1.05,1.05,2.75,0,3.8l-9.29,9.29C18.85,27.59,17.15,27.59,16.1,26.54z"
                        ></path>
                      </svg>
                    </div>

                    <div className="gimg">
                      {groups[currentIndex]?.imageUrl !== null && (
                        <img
                          src={groups[currentIndex]?.imageUrl!}
                          alt="Group Image"
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <br />


          <div className={`animate-wrapper${isTrayOpen ? "-2 show" : ""}`}>
            {isTrayOpen && !selectedTrayPreviewOpenButton && (
              <Tray
                groupNameList={selectedGroupList}
                filteredAreas={filteredAreas}
                toggleFunc={toggleTray}
                UpdateGroupId={groupIdFromFunc}
              />
            )}

           <ColorMenuSeleciton updateActiveColorOption={updateActiveColorOption} activeColorOption={activeColorOption}/>

            {/* <div className="colsgrid">
              <div data-sel="plain" className="active">Plain</div>
              <div data-sel="metallic" className="">Metallic</div>
              <div data-sel="matte" className="">Matte</div>
              <div data-sel="fluorescent" className="">Fluoro</div>
            </div> */}


            {selectedGroup &&
              !selectedTrayPreviewOpenButton &&
              selectedGroup.steps.length > 0 &&
              !isTrayOpen && (
                <List>
                  {selectedGroup.steps.map((step) => {
                    return (
                      <ListItem
                        key={step.id}
                        onClick={() => selectStep(step.id)}
                        selected={selectedStep === step}
                      >
                        {step.name}
                      </ListItem>
                    );
                  })}
                </List>
              )}

            {!selectedTrayPreviewOpenButton && (
              <div style={{ width: "100%", 
                  background:  '0% 0% / 4px 4px rgba(255, 255, 255, 0.5)',
    borderRadius: '0px 0px 3px 3px',
    padding: '10px 10px 5px',
    borderTop: 'none'
    
    }}>
                
                {width > 400 && (
                  <List>
                    {!selectedTrayPreviewOpenButton &&
                      selectedAttribute &&
                      !isTrayOpen &&
                      selectedAttribute.options.map((option) => {
                        return (
                          <ListItemColor
                            key={option.id}
                            onClick={() => {
                            //  console.log(selectedAttribute, option, option.id);

                              {
                                if (
                                  option.name === "BRODAT" ||
                                  option.name === "TIPARIT" ||
                                  option.name === "PRINTAT"
                                ) {
                
                                  const indexForGroupTip = groups.findIndex(
                                    (obj) => obj.name === "MODALITATE IMPRIMARE"
                                  );
                                  if (indexForGroupTip > 0) {
                                    selectGroup(groups[indexForGroupTip].id);
                                    if (
                                      groups[groups?.length - 1].attributes[0]
                                        .code === "MODALITATE IMPRIMARE"
                                    ) {
                                      //          console.log(option,'selectOption(option.id);selectOption(option.id);');

                                      selectOption(option.id);
                                    }
                                    // selectOption(option.id);
                                    selectOptionId(option.id);
                                    selectOptionName(option.name);
                                  }
                                } else {
                                  selectOption(option.id);
                                  selectOptionId(option.id);
                                  selectOptionName(option.name);
                                }
                              }
                            }}
                            selected={option.selected}
                            selectedColor={selectedColorName}
                          >
                            {option.imageUrl && (
                              <ListItemImageNoCarousel
                                src={option.imageUrl}
                                onClick={() => selectColorName(option.name)}
                                selected={option.selected}
                              />
                            )}
                            {/* Shows the color name but we dont need it now  */}
                            {/* <div style={{ position: "absolute", top: "120%" }}>
                              {option.id === selectedOptionId
                                ? option.name
                                : ""}
                            </div> */}
                          </ListItemColor>
                        );
                      })}
                  
                  </List>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="gbuts">
          {/* <button className="previous-customization" onClick={handleLeftClick}> */}
            <div id='gprev' className="mc-prev" onClick={handleLeftClick}>
              Back
            </div>
          {/* </button> */}
          {/* <button className="next-customization" onClick={handleRightClick}> */}
            <div id='gnext' className="mc-next" onClick={handleRightClick}>
              Next
            </div>
          {/* </button> */}
        </div>
      </div>
    </>
  );
};

export default Selector;
