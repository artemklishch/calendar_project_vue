<template>
  <div v-if="isOpen" class="popup-layer">
    <form class="popup event" @submit="onCreateEvent">
      <span class="popup__btn-close" @click="onHideForm"
        ><img
          class="close"
          src="https://img.icons8.com/color/48/000000/close-window.png"
          alt="close"
      /></span>
      <input
        class="event__name"
        name="header"
        type="text"
        placeholder="Add title "
        :defaultValue="tempObj.header"
        :disabled="onLateEditing"
      />
      <div class="popup__picker" @input="onValidate">
        <img
          class="clock"
          src="https://img.icons8.com/pastel-glyph/64/000000/time.png"
          alt="clock"
        />
        <input
          class="event__date-start input"
          name="startDate"
          required
          type="date"
          :defaultValue="tempObj.startDate"
          :disabled="onLateEditing"
        />
        <input
          type="time"
          class="startTime_place input"
          name="startTimePlace"
          :defaultValue="tempObj.startTime"
          :disabled="onLateEditing"
        />
        <span class="line"></span>
        <input
          type="time"
          class="endTime_place input"
          name="endTimePlace"
          :defaultValue="tempObj.endTime"
          :disabled="onLateEditing"
        />
        <input
          class="event__date-end input"
          name="endDate"
          required
          type="date"
          :defaultValue="tempObj.endDate"
          :disabled="onLateEditing"
        />
      </div>
      <div class="centerData">
        <img
          class="multiline"
          src="https://img.icons8.com/windows/32/000000/multiline-text.png"
          alt="mutiline"
        />
        <textarea
          class="multiline__text"
          placeholder="add description"
          name="description"
          :defaultValue="tempObj.description"
          :disabled="onLateEditing"
        ></textarea>
        <input
          type="color"
          class="pick_color"
          name="backgroundColor"
          :defaultValue="backgroundColor"
        />
      </div>
      <div class="footer-popup">
        <p class="message_validation">{{ validateText }}</p>
        <div class="buttons">
          <img
            id="delete-img"
            :class="['event__btn-delete', { 'btn-delete_block': isEditing }]"
            src="https://img.icons8.com/windows/32/000000/trash.png"
            alt="basket"
            @click="onDeleteEvent"
          />
          <button type="submit" class="event__btn-save btn_save">Save</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import "./popup.scss";
export default {
  props: [
    "isOpen",
    "onHideForm",
    "tempObj",
    "onCreateEvent",
    "backgroundColor",
    "isEditing",
    "onDeleteEvent",
    "onValidate",
    "validateText",
    "onLateEditing",
  ],
};
</script>