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

const dialogsPortal = document.getElementById("dialogs-portal")!;
// const Container = styled.div`
// overflow: auto;
// width: 100%;
// ${!selectedTrayPreviewOpenButton
//     ? css`
//         height: 230px;
//       `
//     : css`
//         height: 70px;
//       `}
// `;

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
    price,
    groups,
    selectOption,
    addToCart,
    templates,
    setTemplate,
    setCamera,
    productName,
    zoomIn,
    zoomOut,
    items,
  } = useZakeke();

  const { setIsLoading, isMobile } = useStore();

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

  const [currentIndex, setCurrentIndex] = useState(0);

  const [width, setWidth] = useState(window.innerWidth);

  const selectedGroup = groups.find((group) => group.id === selectedGroupId);
  const selectedStep = selectedGroup
    ? selectedGroup.steps.find((step) => step.id === selectedStepId)
    : null;

  const [selectedPersonalize, setSelectedPersonalize] = useState<any | null>(
    false
  );

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

      if (templates.length > 0) setTemplate(templates[0].id);
    }

    if (groups.length > 0) {
      var groupRec: string[] = [];
      groups.map((group) => {
        groupRec.push(group.name);
      });
      selectGroupList(groupRec);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroup, groups]);

  // useEffect(() => {
  // 	const textItems = items.filter((item) => item.type === 0) // as TextItem[];
  // 	//const newItems = textItems.filter((item) => !prevItems.some((prevItem) => prevItem.guid === item.guid));
  // 	// newItems.forEach((item) => {
  // 	// 	if (item.isTemplateElement) setItemText(item.guid, T._d(item.text));
  // 	// });
  // 	// setPrevItems(textItems);

  //   textItems.map((item) => {
  //     setItemText(item.guid,'first tezzt')
  //   })

  // 	// eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [items]);

  // Select attribute first time
  useEffect(() => {
    if (!selectedAttribute && attributes.length > 0)
      selectAttribute(attributes[0].id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAttribute, attributes]);

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
    setCurrentIndex((currentIndex - 1 + groups.length) % groups.length);
    selectGroup(groups[(currentIndex - 1 + groups.length) % groups.length].id);

    if (items.filter((item) => item.type === 0).length === 0) {
      if (groups[groups.length - 1].name === "MODALITATE IMPRIMARE")
        if (items?.filter((item) => item.type === 0)) {
          groups.splice(groups.length - 1, 1);
        }
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

  const groupIdFromFunc = (data: any) => {
    //console.log('ayyy',groups,data);
    const filteredArray = groups.filter((group) => group.name === data);
    // const filteredArrayId = groups.filter((group) => group.name === data);

    //  console.log(filteredArrayId, 'sddfasfdafdsf');

    const filteredArrayId = groups.filter((i: any, index: number) => {
      // Perform the desired comparison
      return i.name === data;
    });

    if (filteredArrayId.length > 0) {
      const foundItem = filteredArrayId[0];
      const foundItemIndex = groups.indexOf(foundItem);
      setCurrentIndex(foundItemIndex);
    }

    selectGroup(filteredArray[0].id);
    selectGroupIdFromTray(filteredArray[0].id);
  };

  const togglePersonalize = () => {
    setSelectedPersonalize(!selectedPersonalize);
  };

  const containerStyles = {
    overflow: "auto",
    width: "100%",
    height: !selectedTrayPreviewOpenButton ? "13rem" : "70px",
  };

  let groupNameText = makeFirstLetterCaps(groups[currentIndex]?.name);

  return (
    <>
      <div className="top-nav">
        <div className="body-3" id="product-info">
          <span>{productName}</span>
          <span>LEI {price}</span>
        </div>
      </div>

      {/* {!isMobile && !isTrayOpen ? (
        <div style={{ position: "absolute", top: "36%", bottom: "45%" }}>
          <div className="dgqSKi" onClick={zoomIn}>
            <SearchPlusSolid />
          </div>

          <div className="gwevdV" onClick={zoomOut}>
            <SearchMinusSolid />
          </div>
        </div>
      ) : (
        ""
      )} */}

      {/* <GroupItem   */}

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
        {/* Personalize A */}

        <div style={containerStyles}>
          {/* {groups[currentIndex].name === "MODALITATE IMPRIMARE" && (!hasTypeZero) ? null : ( */}
          <div className="tray-header">
            <TrayPreviewOpenButton
              width={width}
              trayPreviewOpenButton={trayPreviewOpenButton}
              selectedTrayPreviewOpenButton={selectedTrayPreviewOpenButton}
              selectTrayPreviewOpenButton={selectTrayPreviewOpenButton}
            />

            <div
              style={{
                display: "flex",
                width: "420px",
                top: "50%",
                left: "50%",
                height: "auto",
                margin: "0px auto",
                position: "absolute",
                transform: "translate(-50%, -50%)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="tray-header-1">
                <div
                  style={{
                    position: "absolute",
                    padding: "0px",
                    width: "100%",
                  }}
                >
                  <div className="active-marketing-component-name">
                    <span
                      style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        lineHeight: "28px",
                      }}
                    >
                      {groupNameText}
                      {/* {groups[currentIndex]?.name}                       */}
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
            {/* {!isMobile && <Footer />} */}

            {/* Closed on request of Paul */}
            {/* <MenuTriggerButton width={width} toggleTray={toggleTray} /> */}
          </div>
          {/* )} */}
          <br />

          {/* <List>
            {groups.map(group => {
                return <ListItem key={group.id} onClick={() => {
                    selectGroup(group.id)
                }} selected={selectedGroup === group}> {group.id === -1 ? 'Other' : group.name}</ListItem>;
            })}
        </List> */}

          <div className={`animate-wrapper${isTrayOpen ? "-2 show" : ""}`}>
            {isTrayOpen && !selectedTrayPreviewOpenButton && (
              <Tray
                groupNameList={selectedGroupList}
                toggleFunc={toggleTray}
                UpdateGroupId={groupIdFromFunc}
              />
            )}
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
              <div style={{ width: "100%" }}>
                <List>
                  {/* {width > 400 &&
                    attributes &&
                    !isTrayOpen &&
                    attributes.map((attribute) => {
                      return (
                        <ListItem
                          key={attribute.id}
                          onClick={() => selectAttribute(attribute.id)}
                          selected={selectedAttribute === attribute}
                        >
                          {attribute.name}
                        </ListItem>
                      );
                    })} */}

                  {/* Swiper For mobile */}
                  {/* {width <= 400 && attributes && !isTrayOpen && attributes.length > 3 ? (
                    <Swiper
                      spaceBetween={80}
                      slidesPerView={2}
                      navigation={true}
                      centeredSlides={true}
                      modules={[Navigation]}
                      //onSlideChange={() => console.log('slide change')}
                      //onSwiper={(swiper) => console.log(swiper)}
                    >
                      {attributes.map((attribute) => {
                        return (
                          <SwiperSlide>
                            <ListItem
                              key={attribute.id}
                              onClick={() => selectAttribute(attribute.id)}
                              selected={selectedAttribute === attribute}
                            >
                              {attribute.name}
                            </ListItem>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  ) : 
                  (attributes && attributes.map((attribute) => {
                    return (
                      <ListItem
                        key={attribute.id}
                        onClick={() => selectAttribute(attribute.id)}
                        selected={selectedAttribute === attribute}
                      >
                        {attribute.name}
                      </ListItem>
                    );
                  }))                  
                  } */}
                </List>

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
                              console.log(selectedAttribute, option, option.id);

                              {
                                if (
                                  option.name === "BRODAT" ||
                                  option.name === "TIPARIT" ||
                                  option.name === "PRINTAT"
                                ) {
                                  // const indexForGroupTip = groups.findIndex(
                                  //   (obj) => obj.name === 'MODALITATE IMPRIMARE'
                                  // );

                                  // if(indexForGroupTip > 0 ){
                                  // console.log(
                                  //   "update group",

                                  //   option.id,
                                  //   selectedOptionId
                                  // );

                                  // {groups[groups?.length -1].attributes[0].options?[0].id == option.id &&
                                  // console.log(option.id)
                                  // }

                                  // console.log(groups[groups?.length -1].attributes[0].code);

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

                            <div style={{ position: "absolute", top: "120%" }}>
                              {option.id === selectedOptionId
                                ? option.name
                                : ""}
                            </div>
                          </ListItemColor>
                        );
                      })}
                    {/* {selectedColorName}   */}
                  </List>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="gbuts">
          <button className="previous-customization" onClick={handleLeftClick}>
            <div className="mc-prev">
              Back
              {/* <AngleLeftSolid /> */}
            </div>
          </button>
          <button className="next-customization" onClick={handleRightClick}>
            <div className="mc-next">
              Next
              {/* <AngleRightSolid /> */}
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Selector;
