import {
    GET,
    endpoints,
    screens
} from '@app/constants';
import Config from '@app/utils/config';
import types from "@app/screens/menu/menu/menuAction/types";
import moment from "moment";
import i18next from 'i18next';
import store from '@app/store';
import { increaseDecreaseBasketQuantity } from '@screen/basket/basketAction/basketAction';
import * as NavigationService from "@navigation/navigation-service";
import authTypes from '@screen/auth/authAction/types';
import basketTypes from '@screen/basket/basketAction/types';

export const fetchMenuList = () => {
    return async (dispatch: any) => {
        GET(`${Config().accesspoint}${endpoints.menuLink}`, {}).then(
            (result) => {
                if (result.status) {
                    //getting selected date index => default is 0 (i.e first in menuList)
                    var selectDateIndex = store.getState().menuReducer.selectedDateIndex

                    var menuList = result.data.dayMenus
                    //Iterating over the menulist
                    menuList.map(async (item: any, index: number) => {
                        if (index === selectDateIndex) {
                            let selectedFirst = false;
                            let tempDeliverySlot = item.deliverySlots;
                            const basketList = store.getState().basketReducer.basketList;
                            const basketSelectedDatedProduct = basketList.find((basket: any) =>
                                moment(basket.date).isSame(item.date)
                            )

                            const slotIndexWithBasket = !!basketSelectedDatedProduct ? basketSelectedDatedProduct.deliverySlots.findIndex((slots: any) => basketSelectedDatedProduct.deliverySlot === slots.name) : -1
                            const indexWithBasketSlot = slotIndexWithBasket > -1 ? slotIndexWithBasket : 0
                            let checkIfAnySlotIsPassedOrSold = false;
                            tempDeliverySlot.map((item: any, index: number) => {
                                const currentTime = moment(new Date())
                                const cutOffInMoment = moment(item.cutoff)
                                const seconds = Math.round(moment.duration(cutOffInMoment.diff(currentTime)).asSeconds())
                                if (seconds < 0 || item?.limitedAvailability === 0) {
                                    checkIfAnySlotIsPassedOrSold = true
                                }
                            })

                            tempDeliverySlot.map((item: any, index: number) => {
                                const currentTime = moment(new Date())
                                const cutOffInMoment = moment(item.cutoff)
                                const seconds = Math.round(moment.duration(cutOffInMoment.diff(currentTime)).asSeconds())

                                if (checkIfAnySlotIsPassedOrSold) {
                                    if (index === 0 && item?.limitedAvailability !== 0 && seconds > 0) {
                                        item.isSelected = true
                                        selectedFirst = true
                                    } else if (index === 1 && seconds > 0 && item?.limitedAvailability !== 0) {
                                        if (selectedFirst) {
                                            item.isSelected = false
                                        } else {
                                            item.isSelected = true
                                        }
                                    } else {
                                        item.isSelected = false
                                    }
                                } else {
                                    if (index === 0 && item?.limitedAvailability !== 0 && seconds > 0 && indexWithBasketSlot === 0) {
                                        item.isSelected = true
                                        selectedFirst = true
                                    } else if (index === 1 && seconds > 0 && item?.limitedAvailability !== 0 && indexWithBasketSlot === 1) {
                                        if (selectedFirst) {
                                            item.isSelected = false
                                        } else {
                                            item.isSelected = true
                                        }
                                    } else {
                                        item.isSelected = false
                                    }
                                }

                                if (seconds > 0) {
                                    item.isvalidNow = true
                                } else {
                                    item.isvalidNow = false
                                }
                                if (slotIndexWithBasket === index) {
                                    item.isProductInBasket = true
                                } else {
                                    item.isProductInBasket = false
                                }
                            })
                        } else {
                            item.deliverySlots.map((item: any) => {
                                item.isProductInBasket = false
                                item.isSelected = false
                                item.isvalidNow = false
                            })
                        }

                        //getting basket data to sync with menuList
                        const basketList = store.getState().basketReducer.basketList

                        item.products.map((product: any) => {
                            //matching basket data with same date of product
                            const basketDatedProduct = basketList.findIndex((basket: any) =>
                                moment(basket.date).isSame(item.date)
                            )

                            if (basketDatedProduct > -1) {

                                //verifying if id of both product are same.
                                const currentProductId = basketList[basketDatedProduct].items.findIndex((basketItem: any) => {
                                    return product.id === basketItem.product.id
                                })

                                //assigning updated basket count to the individual product in menuList
                                if (currentProductId > -1) {
                                    product.count = basketList[basketDatedProduct].items[currentProductId].count
                                } else {
                                    product.count = 0
                                }
                            } else {
                                product.count = 0
                            }
                        })

                    })
                    setTimeout(() => {

                        const tempMenuList = menuList
                        // JSON.parse(JSON.stringify(menuList))
                        const selectedDateItem = tempMenuList[selectDateIndex];

                        let selectedTimeSlotIndex: number = -1;

                        let checkIfAnySlotIsPassedOrSold = false;
                        selectedDateItem.deliverySlots.map((item: any, index: number) => {
                            const currentTime = moment(new Date())
                            const cutOffInMoment = moment(item.cutoff)
                            const seconds = Math.round(moment.duration(cutOffInMoment.diff(currentTime)).asSeconds())
                            if (seconds < 0 || item?.limitedAvailability === 0) {
                                checkIfAnySlotIsPassedOrSold = true
                            }
                        })
                        if (checkIfAnySlotIsPassedOrSold) {
                            const indexWithBasket = selectedDateItem.deliverySlots.findIndex((item: any) => item.isProductInBasket)
                            const checkIfBathSlotPassed = selectedDateItem.deliverySlots.findIndex((item: any) => item?.limitedAvailability !== 0 && item.isvalidNow)
                            if (indexWithBasket > -1) {
                                if (checkIfBathSlotPassed > -1) {
                                    selectedTimeSlotIndex = indexWithBasket;
                                } else {
                                    selectedTimeSlotIndex = -1;
                                }
                            } else {
                                selectedTimeSlotIndex = selectedDateItem.deliverySlots.findIndex((item: any) => item.isvalidNow && item.isSelected && item?.limitedAvailability !== 0)
                            }
                        } else {
                            selectedTimeSlotIndex = selectedDateItem.deliverySlots.findIndex((item: any) => item.isvalidNow && item.isSelected && item?.limitedAvailability !== 0)
                        }
                        const tempSelectedDeliverySlot = selectedDateItem.deliverySlots[selectedTimeSlotIndex]
                        //deciding whether slot is passed or not
                        const selectedTimeSlot = selectedTimeSlotIndex > -1 ? `${tempSelectedDeliverySlot.start.split("+")[0]}-${tempSelectedDeliverySlot.end.split("+")[0]}` : `${i18next.t("passed")} ${i18next.t("slots")}`
                        //current selected time slot
                        const currentDeliverySlotName = store.getState().menuReducer.selectedDeliverySlotName
                        const selectedDeliverySlotName = currentDeliverySlotName ? currentDeliverySlotName : selectedTimeSlotIndex > -1 ? tempSelectedDeliverySlot.name : `${i18next.t("passed")} ${i18next.t("slots")}`
                        //Order before
                        const orderBefore = selectedTimeSlotIndex > -1 ? moment(tempSelectedDeliverySlot.cutoff).format("dddd HH:mm") : "";

                        //dispatching all the data to reducer
                        dispatch({
                            type: types.MENU_LIST,
                            menuList: tempMenuList,
                            selectedDayDeliverySlots: selectedDateItem.deliverySlots,
                            selectedDayProducts: selectedDateItem.products,
                            selectedTimeSlot: selectedTimeSlot,
                            selectedDeliverySlotName: selectedDeliverySlotName,
                            orderBefore: orderBefore
                        })
                        dispatch({
                            type: basketTypes.HANLDE_LOADER_ADD_REMOVE_BASKET,
                            isLoading: false
                        })
                    }, 300);
                    setTimeout(() => {
                        dispatch({
                            type: types.PULL_ON_REFRESH_LOADER,
                            pullOnRefreshLoader: false
                        })
                    }, 500);

                }
            }
        ).catch(err => {
            console.log("err if internet off", err, err.response);

            dispatch({
                type: authTypes.TURN_OFF_ALL_LOADER,
                isLoading: false
            })
            dispatch({
                type: types.PULL_ON_REFRESH_LOADER,
                pullOnRefreshLoader: false
            })
        })
    }
}

export const setSelectedDayDeliverySlot = (selectedIndex: any) => {
    return async (dispatch: any) => {
        const menuList = store.getState().menuReducer.menuList
        const selectedDateItem = menuList[selectedIndex]

        const tempDeliverySlot = selectedDateItem.deliverySlots;
        const anyPreselectedIndex = tempDeliverySlot.findIndex((item: any) => item.isSelected)
        const updatedAnyPreselectedIndex = anyPreselectedIndex > -1 ? anyPreselectedIndex : 0

        let selectedFirst = false;

        const basketList = store.getState().basketReducer.basketList;
        const basketSelectedDatedProduct = basketList.find((basket: any) =>
            moment(basket.date).isSame(selectedDateItem.date)
        )
        const slotIndexWithBasket = !!basketSelectedDatedProduct ? basketSelectedDatedProduct.deliverySlots.findIndex((slots: any) => basketSelectedDatedProduct.deliverySlot === slots.name) : -1
        const indexWithBasketSlot = slotIndexWithBasket > -1 ? slotIndexWithBasket : 0
        let checkIfAnySlotIsPassedOrSold = false;
        tempDeliverySlot.map((item: any, index: number) => {

            const currentTime = moment(new Date())
            const cutOffInMoment = moment(item.cutoff)
            const seconds = Math.round(moment.duration(cutOffInMoment.diff(currentTime)).asSeconds())
            if (seconds < 0 || item?.limitedAvailability === 0) {
                checkIfAnySlotIsPassedOrSold = true
            }
        })
        tempDeliverySlot.map((item: any, index: number) => {
            const currentTime = moment(new Date())
            const cutOffInMoment = moment(item.cutoff)
            const seconds = Math.round(moment.duration(cutOffInMoment.diff(currentTime)).asSeconds())

            if (checkIfAnySlotIsPassedOrSold) {
                if (index === 0 && item?.limitedAvailability !== 0 && seconds > 0) {
                    item.isSelected = true
                    selectedFirst = true
                } else if (index === 1 && seconds > 0 && item?.limitedAvailability !== 0) {
                    if (selectedFirst) {
                        item.isSelected = false
                    } else {
                        item.isSelected = true
                    }
                } else {
                    item.isSelected = false
                }
            } else {
                if (slotIndexWithBasket > -1) {
                    if (index === 0 && item?.limitedAvailability !== 0 && seconds > 0 && indexWithBasketSlot === 0) {
                        item.isSelected = true
                        selectedFirst = true
                    } else if (index === 1 && seconds > 0 && item?.limitedAvailability !== 0 && indexWithBasketSlot === 1) {
                        if (selectedFirst) {
                            item.isSelected = false
                        } else {
                            item.isSelected = true
                        }
                    } else {
                        item.isSelected = false
                    }
                } else {
                    if (index === 0 && item?.limitedAvailability !== 0 && seconds > 0 && updatedAnyPreselectedIndex === 0) {
                        item.isSelected = true
                        selectedFirst = true
                    } else if (index === 1 && seconds > 0 && item?.limitedAvailability !== 0 && updatedAnyPreselectedIndex === 1) {
                        if (selectedFirst) {
                            item.isSelected = false
                        } else {
                            item.isSelected = true
                        }
                    } else {
                        item.isSelected = false
                    }
                }
            }

            if (seconds > 0) {
                item.isvalidNow = true
            } else {
                item.isvalidNow = false
            }
            if (slotIndexWithBasket === index) {
                item.isProductInBasket = true
            } else {
                item.isProductInBasket = false
            }
        })
        let selectedTimeSlotIndex: number = -1;

        if (checkIfAnySlotIsPassedOrSold) {
            const indexWithBasket = selectedDateItem.deliverySlots.findIndex((item: any) => item.isProductInBasket)
            const checkIfBathSlotPassed = selectedDateItem.deliverySlots.findIndex((item: any) => item?.limitedAvailability !== 0 && item.isvalidNow)
            if (indexWithBasket > -1) {
                if (checkIfBathSlotPassed > -1) {
                    selectedTimeSlotIndex = indexWithBasket;
                } else {
                    selectedTimeSlotIndex = -1;
                }
            } else {
                selectedTimeSlotIndex = selectedDateItem.deliverySlots.findIndex((item: any) => item.isvalidNow && item.isSelected && item?.limitedAvailability !== 0)
            }
        } else {
            selectedTimeSlotIndex = selectedDateItem.deliverySlots.findIndex((item: any) => item.isvalidNow && item.isSelected && item?.limitedAvailability !== 0)
        }
        const tempSelectedDeliverySlot = tempDeliverySlot[selectedTimeSlotIndex]
        const selectedTimeSlot: string = !!tempSelectedDeliverySlot ? `${tempSelectedDeliverySlot.start.split("+")[0]}-${tempSelectedDeliverySlot.end.split("+")[0]}` : `${i18next.t("passed")} ${i18next.t("slots")}`
        //Order before
        const orderBefore = !!tempSelectedDeliverySlot ? moment(tempSelectedDeliverySlot.cutoff).format("dddd HH:mm") : "";

        dispatch({
            type: types.SET_SELECTED_DAY_SLOT_AND_PRODUCT,
            selectedDayDeliverySlots: tempDeliverySlot,
            selectedDayProducts: menuList[selectedIndex].products,
            selectedTimeSlot: selectedTimeSlot,
            selectedDeliverySlotName: tempSelectedDeliverySlot ? tempSelectedDeliverySlot.name : `${i18next.t("passed")} ${i18next.t("slots")}`,
            selectedDateIndex: selectedIndex,
            orderBefore: orderBefore,
            selectedSlotIndex: !!tempSelectedDeliverySlot ? tempSelectedDeliverySlot : 0
        })
    }
}

export const setSelectedTimeSlotForSelectedDeliverySlot = (selectedIndex: number) => {
    return async (dispatch: any) => {

        const tempSelectedDayDelivery = store.getState().menuReducer.selectedDayDeliverySlots
        const selectedDayDelivery = JSON.parse(JSON.stringify(tempSelectedDayDelivery))
        let selectedDeliverySlotName: string = ""
        selectedDayDelivery.map((item: any, index: number) => {
            selectedDeliverySlotName = item?.name
            if (index === selectedIndex) {
                item.isSelected = true
            } else {
                item.isSelected = false
            }
        })

        const selectedTimeSlotIndex = selectedDayDelivery.findIndex((item: any) => { return (item.isvalidNow && item.isSelected) })
        //Order before
        const orderBefore = selectedTimeSlotIndex > -1 ? moment(selectedDayDelivery[selectedTimeSlotIndex].cutoff).format("dddd HH:mm") : "";

        dispatch({
            type: types.SET_SELECTED_TIMESLOT,
            selectedDayDeliverySlots: selectedDayDelivery,
            selectedDeliverySlotName: selectedDeliverySlotName ? selectedDeliverySlotName : `${i18next.t("passed")} ${i18next.t("slots")}`,
            orderBefore: orderBefore
        })
    }
}

export const setUpdatedTimeSlotForSelectedDay = (updatedDeliverySlots: any, selectedIndex: number) => {
    return async (dispatch: any) => {
        const menuList = store.getState().menuReducer.menuList
        const selectedDayDeliverySlots = updatedDeliverySlots
        menuList[selectedIndex].deliverySlots = selectedDayDeliverySlots

        const selectedTimeSlotIndex: number = selectedDayDeliverySlots.findIndex((item: any) =>
            item.isSelected === true
        )

        const selectedTimeSlot: string = selectedTimeSlotIndex > -1 ? `${selectedDayDeliverySlots[selectedTimeSlotIndex].start.split("+")[0]}-${selectedDayDeliverySlots[selectedTimeSlotIndex].end.split("+")[0]}` : `${i18next.t("passed")} ${i18next.t("slots")}`
        dispatch({
            type: types.SET_SELECTED_DELIVERY_AND_SLOT,
            menuList: menuList,
            selectedTimeSlot: selectedTimeSlot,
            selectedDeliverySlotName: selectedDayDeliverySlots[selectedTimeSlotIndex]?.name ? selectedDayDeliverySlots[selectedTimeSlotIndex].name : `${i18next.t("passed")} ${i18next.t("slots")}`,
            selectedSlotIndex: selectedTimeSlotIndex > -1 ? selectedTimeSlotIndex : 0
        })
        const data = {
            date: menuList[store.getState().menuReducer.selectedDateIndex].date,
            deliverySlot: store.getState().menuReducer.selectedDeliverySlotName,
            basketScreen: true
        }
        const ifHaveAnyItemInBasket = menuList[store.getState().menuReducer.selectedDateIndex].products.findIndex((item: any) => item.count > 0)
        if (ifHaveAnyItemInBasket > -1) {
            dispatch(increaseDecreaseBasketQuantity(data))
        }
    }
}

export const increaseDecreaseProductBasketQuantity = (data: any) => {
    return async (dispatch: any) => {
        const selectedDayMenuList = store.getState().menuReducer.menuList[data.selectedDayIndex]
        let basketQuantity: number = 0
        selectedDayMenuList.products.forEach((item: any) => {
            if (data.id === item.id) {
                item.count = data.increment ? item.count + 1 : item.count - 1;
                basketQuantity = item.count
            }
        });
        const payloadForBasketQuantity = {
            date: selectedDayMenuList.date,
            deliverySlot: store.getState().menuReducer.selectedDeliverySlotName,
            productId: data.id,
            variant: data.variant,
            count: basketQuantity,
            basketScreen: true
        }
        store.dispatch(increaseDecreaseBasketQuantity(payloadForBasketQuantity))
    }
}

export const setMealOverViewData = (meal: any) => {
    return async (dispatch: any) => {
        dispatch({
            type: types.SET_MEAL_OVERVIEW_DATA,
            selectedMeal: meal
        })
        NavigationService.navigate(screens.menu.mealOverview.name, {})
    }
}
