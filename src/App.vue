<template>
  <div id="app">
    <HeaderElems
      :arrDaysOfWeek="arrDaysOfWeek"
      :dateTitle="dateTitle"
      :onArrowBtns="onArrowBtns"
      :onClickTodayWeek="onTodayButton"
      :onShowForm="showFormOnCreateButton"
    />
    <MainBars
      :arrDaysOfWeek="arrDaysOfWeek"
      :onShowForm="showFormOnClickOnField"
      :arrayOfEventsForRender="arrayOfEventsForRender"
      :onShowFormOnEditing="showFormOnEditing"
      :positionOfRedLine="positionOfRedLine"
    />
    <ModalWindow
      :isOpen="isOpen"
      :onHideForm="hideForm"
      :tempObj="tempObj"
      :onCreateEvent="onFormSubmit"
      :isEditing="isEditing"
      :onDeleteEvent="onDeleteEvent"
      :onValidate="onValidate"
      :validateText="validateText"
      :onLateEditing="onLateEditing"
    />
  </div>
</template>

<script>
import MainBars from "./components/main/MainBars";
import HeaderElems from "./components/header/HeaderElems";
import ModalWindow from "./components/modalWindow/ModalWindow";
import {
  onRenderTitleDate,
  firstDayForCurrentOfWeek,
  onGenerateAnotherfirstDayOfWeek,
  generateArrayOfCurrentWeek,
} from "./helpers/funcsForRenderCommonElems";
import { forObjCreateBtn } from "./helpers/forObjOnCreateBtn";
import { forObjectOnClickOnField } from "./helpers/forObjectOnClickOnField";
import { forChangingEventsArray } from "./helpers/funcForRenderEvents";
import { forObjectOnClickOnEvent } from "./helpers/forObjectOnClickOnEvent";
import { getPosOfRedLine } from "./helpers/onPositionOfRedLine";
import {
  onInputValidate,
  onClickValidate,
  onCheckLateEffortOfDeleteOrEdite,
} from "./helpers/validate";
import {
  onCreateEventAfterSubmit,
  onChangeEventAfterSubmit,
  onDeleteEventInArray,
  fetchForGetData,
} from "./helpers/eventsGateway";
import { onFormObject } from "./helpers/onFormObject";
import "./index.scss";

export default {
  name: "App",
  components: {
    MainBars,
    HeaderElems,
    ModalWindow,
  },
  data() {
    return {
      firstDayOfWeek: firstDayForCurrentOfWeek(),
      isOpen: false,
      arrayOfEvents: [],
      isEditing: false,
      positionOfRedLine: getPosOfRedLine(),
      validateText: "",
      onLateEditing: false,
      interval: null,
      tempObj: null,
      arrayOfEventsForRender: [],
    };
  },
  created() {
    this.interval = setInterval(() => {
      this.positionOfRedLine = getPosOfRedLine();
    }, 1000);
    this.onRenderAfterGetData();
  },
  unmounted() {
    clearInterval(this.interval);
  },
  computed: {
    // arrayOfEventsForRender() {
    //   // return forChangingEventsArray(this.arrayOfEvents);
    //   return [];
    // },
    arrDaysOfWeek() {
      return generateArrayOfCurrentWeek(this.firstDayOfWeek);
    },
    dateTitle() {
      return onRenderTitleDate(this.arrDaysOfWeek);
    },
  },
  methods: {
    onRenderAfterGetData() {
      fetchForGetData()
        .then((array) => {
          this.arrayOfEvents = array;
          this.arrayOfEventsForRender = forChangingEventsArray(array);
        })
        .catch(() => alert("Internal Server Error. Can`t display events"));
    },
    onTodayButton() {
      this.firstDayOfWeek = firstDayForCurrentOfWeek();
    },
    onArrowBtns(event) {
      this.firstDayOfWeek = onGenerateAnotherfirstDayOfWeek(
        event,
        this.firstDayOfWeek
      );
    },
    hideForm() {
      this.isOpen = false;
      this.isEditing = false;
      this.onLateEditing = false;
      this.validateText = "";
      this.tempObj = null;
    },
    showFormOnCreateButton() {
      this.tempObj = forObjCreateBtn();
      this.isOpen = true;
      this.validateText = onClickValidate(
        { ...this.tempObj },
        this.arrayOfEvents
      );
    },
    showFormOnClickOnField(event) {
      if (
        forObjectOnClickOnField(
          event,
          generateArrayOfCurrentWeek(this.firstDayOfWeek)
        ) === null
      )
        return;
      this.tempObj = forObjectOnClickOnField(
        event,
        generateArrayOfCurrentWeek(this.firstDayOfWeek)
      );
      this.isOpen = true;
      this.validateText = onClickValidate(
        { ...this.tempObj },
        this.arrayOfEvents
      );
    },
    showFormOnEditing(event) {
      this.tempObj = forObjectOnClickOnEvent(event, this.arrayOfEvents);
      this.isOpen = true;
      this.isEditing = this.tempObj._id;
      this.validateText = onCheckLateEffortOfDeleteOrEdite({ ...this.tempObj });
      const unacceptableEffortToDelete =
        "You can`t change or delete event after 15 minutes to event";
      if (
        onCheckLateEffortOfDeleteOrEdite({ ...this.tempObj }) ===
        unacceptableEffortToDelete
      ) {
        this.onLateEditing = true;
      }
    },
    onFormSubmit(event) {
      event.preventDefault();
      if (this.validateText !== "") return;
      if (this.isEditing) {
        const object = onFormObject();
        object._id = this.tempObj._id;
        onChangeEventAfterSubmit(object, this.tempObj.id)
          .then(() => this.onRenderAfterGetData())
          .catch((error) => alert(error.message));
      } else {
        const object = onFormObject();
        onCreateEventAfterSubmit(object)
          .then(() => this.onRenderAfterGetData())
          .catch((error) => alert(error.message));
      }
      this.hideForm();
    },
    onDeleteEvent() {
      const unacceptableEffortToDelete =
        "You can`t change or delete event after 15 minutes to event";
      if (this.validateText === unacceptableEffortToDelete) return;
      onDeleteEventInArray(this.tempObj.id)
        .then(() => this.onRenderAfterGetData())
        .catch((error) => alert(error.message));
      this.hideForm();
    },
    onValidate(event) {
      this.validateText = onInputValidate(
        event,
        this.isEditing,
        this.arrayOfEvents
      );
    },
  },
};
</script>

