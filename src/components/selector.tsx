import "./selector.css";
import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useZakeke } from "zakeke-configurator-react";
import {
  List,
  ListX,
  ListItem,
  ListItemX,
  ListItemX_,
  ListItemColor,
  ListItemImage,
  ListItemImageX,
  ListItemImageNoCarousel,
} from "./list";
import { PreviewContainer, BlurOverlay } from "./previewContainer";
import Tray from "./Tray";

import ProgressBarLoadingOverlay from "./widgets/ProgressBarLoadingOverlay";
import Designer from "./layouts/Designer";
import DesignerSignature from "./layouts/DesignerSignature";
import DesignerLogo from "./layouts/DesignerLogo";
import { GroupItem, GroupIcon } from "./layouts/LayoutStyled";
import useStore from "../Store";
import { makeFirstLetterCaps, T, useActualGroups } from "../Helpers";
import Footer from "./layouts/Footer";
import FooterMobile from "./layouts/FooterMobile";

import "./selectors/colsgrid.css";
import { ColorMenuSeleciton } from "./selectors/ColorMenuSelection";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";



const dialogsPortal = document.getElementById("dialogs-portal")!;

interface TrayPreviewOpenButton3DProps {
  trayPreviewOpenButton3DFunc: (data: any) => void;
}

const Selector: FunctionComponent<TrayPreviewOpenButton3DProps> = ({
  trayPreviewOpenButton3DFunc,
}) => {
  const {
    isSceneLoading,
    groups,
    selectOption,
    templates,
    product,
    setTemplate,
    setCamera,
    productName,
    items,
    getOnlineScreenshot,
  } = useZakeke();


const { setIsLoading, isMobile } = useStore();
  
const useActualGroups_ = useActualGroups();


//   if (!isSceneLoading){
// const templatesSignature = DesignerSignature_();
//   const templatesLogo = DesignerLogo_();
//   }

  // Keep saved the ID and not the refereces, they will change on each update
  const [selectedGroupId, selectGroup] = useState<number | null>(null);
  const [selectedStepId, selectStep] = useState<number | null>(null);
  const [selectedStepName, selectStepName] = useState<string | null>(null);
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
  const [selectedTrayType, setSelectedTrayType] = useState<any | null>("");

  // Get the id of the selected group from the tray
  const [selectedGroupIdFromTray, selectGroupIdFromTray] = useState<
    number | null
  >(null);

  // Update tray preview open button
  const [selectedTrayPreviewOpenButton, selectTrayPreviewOpenButton] =
    useState<boolean>(false);

  // Selection of colours
  const [activeColorOption, setActiveColorOption] = useState("");

  const updateActiveColorOption = (label: any) => {
    setActiveColorOption(label);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const [width, setWidth] = useState(window.innerWidth);

  const selectedGroup = useActualGroups_.find((group) => group.id === selectedGroupId);

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

  // removed test
  // let indexToRemove = groups.findIndex((obj) => obj.id === -1);
  // if (indexToRemove !== -1) {
  //   groups.splice(indexToRemove, 1);
  // }

  useEffect(() => {
    const itemAvailable = items?.filter((item) => item.type === 0).length > 0;

    // removed test
    // if (items && !itemAvailable) {

    //   if (groups[groups.length - 1]?.name === "MODALITATE IMPRIMARE") {
    //     setStitchTypeGroup(groups[groups.length - 1]);
    //   }
    //   // removed test
    //   if (
    //     hasTypeZero == false ||
    //     items.filter((item) => item.type === 0).length === 0
    //   ) {
    //     const indexToDel = groups.findIndex(
    //       (obj) => obj.name === "MODALITATE IMPRIMARE"
    //     );

    //     for (let i = 0; i < groups.length; i++) {
    //       if (
    //         selectedOptionName !== "PRINTAT" &&
    //         selectedOptionName !== "BRODAT"
    //       ) {
    //         if (groups[i]?.name === "MODALITATE IMPRIMARE") groups.splice(i, 1);
    //       }
    //     }
    //   }
    // }

    // if (items && itemAvailable) {
    //   if (items.filter((item) => item.type === 1)) {
    //     if (groups[groups.length - 1]?.name != "MODALITATE IMPRIMARE") {
    //       groups.push(stitchTypeGroup);
    //     }
    //   }
    // }

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

    // if (items?.some((obj) => obj.type === 0)) {
    //   setHasTypeZero(items?.some((obj) => obj.type === 0));
    // } else {
    //   setHasTypeZero(false);
    // }

    if (!selectedGroup && useActualGroups_.length > 0) {
      selectGroup(groups[0].id);

      setActiveColorOption("plain");

      if (groups[0].steps.length > 0) selectStep(groups[0].steps[0].id);

      // if (selectedStep) {
      //   if (activeColorOption === "fluorescent") {
      //     selectAttribute(selectedStep.attributes[3].id);
      //   }
      // }

      if (templates.length > 0) setTemplate(templates[0].id);
    }

    if (useActualGroups_.length > 0) {
      var groupRec: {
        id: number;
        name: string;
        imageUrl: string | null | undefined;
      }[] = [];
      useActualGroups_.map((group) => {
        groupRec.push({
          id: group.id,
          name: group.name,
          imageUrl: group.imageUrl,
        });
      });
      selectGroupList(groupRec);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups]);

  // Select attribute first time
  useEffect(() => {
    if (!selectedAttribute && attributes.length > 0)
      selectAttribute(attributes[0].id);

    if (selectedGroup) {
      if (selectedGroup?.steps?.length > 0) {
        if (activeColorOption === "plain") {
          selectAttribute(selectedGroup.steps[0].attributes[0].id);
          if (selectedGroup) {
            selectStep(selectedGroup.steps[0].id);
            selectStepName(selectedGroup?.steps[0].name);
          }
        }
        if (activeColorOption === "metallic") {
          selectAttribute(selectedGroup.steps[0].attributes[1].id);
          if (selectedGroup) {
            selectStep(selectedGroup.steps[0].id);
            selectStepName(selectedGroup?.steps[0].name);
          }
        }
        if (activeColorOption === "matte") {
          selectAttribute(selectedGroup.steps[0].attributes[2].id);
          if (selectedGroup) {
            selectStep(selectedGroup.steps[0].id);
            selectStepName(selectedGroup?.steps[0].name);
          }
        }
        if (activeColorOption === "fluorescent") {
          selectAttribute(selectedGroup.steps[0].attributes[3].id);
          if (selectedGroup) {
            selectStep(selectedGroup.steps[0].id);
            selectStepName(selectedGroup?.steps[0].name);
          }
        }
        if (activeColorOption === "knockX") {
          //selectGroup(selectedGroup?.steps[1].id)
          if (selectedGroup) {
            selectStep(selectedGroup.steps[1].id);
            selectStepName(selectedGroup?.steps[1].name);
          }
          // selectAttribute(selectedStep.attributes[3].id);
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAttribute, attributes, activeColorOption]);

  useEffect(() => {
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
    setCurrentIndex((currentIndex - 1 + useActualGroups_.length) % useActualGroups_.length);
    selectGroup(useActualGroups_[(currentIndex - 1 + useActualGroups_.length) % useActualGroups_.length].id);
    if (selectedGroup?.steps) selectStep(selectedGroup?.steps[0]?.id);

    // if (items.filter((item) => item.type === 0).length === 0) {
    //   if (useActualGroups_[groups.length - 1].name === "MODALITATE IMPRIMARE")
    //     if (items?.filter((item) => item.type === 0)) {
    //       useActualGroups_.splice(groups.length - 1, 1);
    //     }
    // }
  };

  async function downloadImage(url: any) {
    try {
      // Replace the URL with your actual image URL
      const imageUrl = url;

      // Fetch the image as a blob
      const response = await fetch(imageUrl); //, { responseType: 'blob' });
      const imageBlob = await response.blob();

      // Create a Blob URL
      const blobUrl = URL.createObjectURL(imageBlob);

      // Create an anchor element
      const link = document.createElement("a");
      link.href = blobUrl;

      // Set the download attribute with the desired file name
      link.download = "yourImage.jpg";

      // Append the anchor element to the document
      document.body.appendChild(link);

      // Trigger a click on the anchor element
      link.click();

      // Remove the anchor element and revoke the Blob URL
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  }

  const handleScreenShotClick = async () => {
    try {
      const url = await getOnlineScreenshot(800, 800);
      // console.log(url.originalUrl);
      if (url) downloadImage(url.originalUrl);

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
      if (useActualGroups_[(currentIndex + 1) % useActualGroups_.length].direction == 0 ) {
        setSelectedTrayType('colors')
      }
      else if (useActualGroups_[(currentIndex + 1) % useActualGroups_.length].direction == 2) {
        setSelectedTrayType('signature')
      }
      else if (useActualGroups_[(currentIndex + 1) % useActualGroups_.length].direction == 3) {
        setSelectedTrayType('logos')
      }

    selectColorName("");
    setCurrentIndex((currentIndex + 1) % useActualGroups_.length);
    selectGroup(useActualGroups_[(currentIndex + 1) % useActualGroups_.length].id);
    if (selectedGroup?.steps)
      selectStep(useActualGroups_[(currentIndex + 1) % useActualGroups_.length].steps[0]?.id);

    if (items.filter((item) => item.type === 0).length === 0) {
      if (useActualGroups_[groups.length - 1].name === "MODALITATE IMPRIMARE")
        if (items?.filter((item) => item.type === 0)) {
          useActualGroups_.splice(useActualGroups_.length - 1, 1);
        }
    }
  };

  const toggleTray = (trayName: string) => {
    if (selectedTrayPreviewOpenButton) {
      selectTrayPreviewOpenButton(!selectedTrayPreviewOpenButton);
    }
    // trayPreviewOpenButton();
    setIsTrayOpen(!isTrayOpen);

    // set what tray type is selected e.g. colors, signature, logo
    setSelectedTrayType(trayName);

    // console.log(trayName);
  };

  const trayPreviewOpenButton = () => {
    selectTrayPreviewOpenButton(!selectedTrayPreviewOpenButton);

    //trayPreviewOpenButton3DFunc(selectedTrayPreviewOpenButton);
    trayPreviewOpenButton3DFunc(selectedTrayPreviewOpenButton);
  };

  // After selection of the element from the tray
  const groupIdFromFunc = (data: number) => {
    // console.log(data, groups, "filteredArrayfilteredArray");

    let filteredArray;

    groups.filter((element) => {
      return element;
    });

    filteredArray = groups.filter((group) => {
      if (group?.id) {
        return group.id == data;
      }
    });

    const filteredArrayId = groups.filter((i: any, index: number) => {
      return i.id == data;
    });

    if (filteredArrayId.length > 0) {
      const foundItem = filteredArrayId[0];
      const foundItemIndex = groups.indexOf(foundItem);
      setCurrentIndex(foundItemIndex);
    }

    // console.log(filteredArray,'filteredArray');

    // selectGroup(data);
    // selectGroupIdFromTray(data);
    if (filteredArray[0]?.id) {
      selectGroup(filteredArray[0].id);
      selectGroupIdFromTray(filteredArray[0].id);
    }
  };

  const togglePersonalize = () => {
    setSelectedPersonalize(!selectedPersonalize);
  };

  const containerStyles = {
    // overflow: "auto",
    width: "100%",
    // height: !selectedTrayPreviewOpenButton ? "13rem" : "70px",
  };

  let groupNameText = makeFirstLetterCaps(useActualGroups_[currentIndex]?.name);

  return (
    <>
      <div className="top-nav">
        <div className="body-3" id="product-info">
          {productName}
          {/* <span>LEI {price}</span> */}
        </div>

        <div className="top-right-controls">
          <div
            id="savepic"
            data-hasqtip="98"
            title=""
            aria-describedby="qtip-98"
            onClick={() => handleScreenShotClick()}
          >
            <i
              className="fa fa-camera"
              style={{ color: "rgb(54, 179, 237)" }}
            ></i>
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
            width: "270px",
          }}
        >
          {/* <div
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
          )} */}
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

            <div className="guide">
              <div className="tray-header-1">
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <div
                    className="active-marketing-component-name"
                    onClick={() => toggleTray("null")}
                  >
                    <div className="selectiontype">{groupNameText}</div>

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

          {(selectedTrayType === "" ||
            selectedTrayType === "null" ||
            selectedTrayType === "colors") && (
            <div className={`animate-wrapper${isTrayOpen ? "-2 show" : ""}`}>
              {isTrayOpen && !selectedTrayPreviewOpenButton && (
                <Tray
                  groupNameList={selectedGroupList}
                  filteredAreas={filteredAreas}
                  toggleFunc={toggleTray}
                  UpdateGroupId={groupIdFromFunc}
                />
              )}

              {!isTrayOpen && !selectedTrayPreviewOpenButton && (
                <ColorMenuSeleciton
                  updateActiveColorOption={updateActiveColorOption}
                  activeColorOption={activeColorOption}
                />
              )}

              {!selectedTrayPreviewOpenButton && (
                <div
                  style={{
                    width: "100%",
                    background: "0% 0% / 4px 4px rgba(255, 255, 255, 0.5)",
                    borderRadius: "0px 0px 3px 3px",
                    padding: "10px 10px 5px",
                    borderTop: "none",
                    boxShadow: "rgba(0, 64, 113, 0.1) 0px 3px 6px",
                    display: isTrayOpen ? "none" : "block",
                  }}
                >
                  {selectedStepName != "KNOCK-X" && (
                    <List>
                      {!selectedTrayPreviewOpenButton &&
                        selectedAttribute &&
                        !isTrayOpen &&
                        selectedAttribute.options.map((option) => {
                          return (
                            <ListItemColor
                              key={option.id}
                              onClick={() => {
                                {
                                  if (
                                    option.name === "BRODAT" ||
                                    option.name === "TIPARIT" ||
                                    option.name === "PRINTAT"
                                  ) {
                                    const indexForGroupTip = groups.findIndex(
                                      (obj) =>
                                        obj.name === "MODALITATE IMPRIMARE"
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

                  <div>
                    {/* <h1>Patters</h1> */}

                    {selectedStepName === "KNOCK-X" ? (
                      <div>
                        <div className="knockXlabel">SELECT DESIGN THEME</div>
                        <Swiper
                          spaceBetween={1}
                          slidesPerView={2}
                          navigation={true}
                          centeredSlides={true}
                          // modules={[Navigation]}
                          //onSlideChange={() => console.log('slide change')}
                          //onSwiper={(swiper) => console.log(swiper)}
                        >
                          {attributes.map((attribute) => {
                            return (
                              <SwiperSlide>
                                <ListItemX
                                  key={attribute.id}
                                  onClick={() => selectAttribute(attribute.id)}
                                  selected={selectedAttribute === attribute}
                                >
                                  <div className="scaler"></div>
                                  {attribute.name}
                                </ListItemX>
                              </SwiperSlide>
                            );
                          })}
                        </Swiper>

                        <br />
                        <div className="knockXlabel">SELECT COLOR THEME</div>
                        <ListX>
                          {selectedAttribute &&
                            selectedAttribute.options.map((option) => {
                              return (
                                <ListItemX_
                                  key={option.id}
                                  onClick={() => selectOption(option.id)}
                                  selected={option.selected}
                                >
                                  {option.imageUrl && (
                                    <ListItemImageX src={option.imageUrl} />
                                  )}
                                  {/* {option.name} */}
                                </ListItemX_>
                              );
                            })}
                        </ListX>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedTrayType === "signature" && (
            <DesignerSignature togglePersonalize={togglePersonalize} />
          )}

          {selectedTrayType === "logos" && (
            <DesignerLogo togglePersonalize={togglePersonalize} />
          )}
        </div>
        <div className="gbuts">
          {/* <button className="previous-customization" onClick={handleLeftClick}> */}
          <div id="gprev" className="mc-prev" onClick={handleLeftClick}>
            Back
          </div>
          {/* </button> */}
          {/* <button className="next-customization" onClick={handleRightClick}> */}
          <div id="gnext" className="mc-next" onClick={handleRightClick}>
            Next
          </div>
          {/* </button> */}
        </div>
      </div>
    </>
  );
};

export default Selector;
