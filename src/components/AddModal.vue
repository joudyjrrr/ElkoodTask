<script>
import { computed } from "vue";
import axios from "axios";
export default {
  name: "AddModal",
  props: {
    filterPatients: Object,
  },
  data() {
    return {
      form: {
        name: "",
        Phone: "",
        blood: "",
        type: "Prior",
        date: "",
      },
      valid: false,
    };
  },
  methods: {
    async login() {
      this.valid = true;
      if (
        this.phoneIsValid &&
        this.NameIsValid &&
        this.bloodIsValid &&
        this.dateIsValid &&
        this.dateIsFutureValid
      ) {
        try {
          const { data } = await axios.post(
            "http://localhost:3000/Patients",
            this.form
          );
          this.$toast.success("Reservation has been added successfully", {});
          this.filterPatients.push(data);
          const modal = document.getElementById("my-id");
          UIkit.modal(modal).hide();
          this.form = {
            name: "",
            Phone: "",
            blood: "",
            type: "Prior",
            date: "",
          };
          this.valid = false;
        } catch (error) {
          console.error(error);
        }
      } else return;
    },
  },
  computed: {
    phoneIsValid() {
      return /09\d/.test(this.form.Phone);
    },
    NameIsValid() {
      return /([A-Z]|[أ-ي])/gi.test(this.form.name);
    },
    bloodIsValid() {
      return !this.form.blood ? false : true;
    },
    dateIsValid() {
      return !this.form.date ? false : true;
    },
    dateIsFutureValid() {
      const selectedDate = new Date(this.form.date);
      const currentDate = new Date();
      return selectedDate >= currentDate;
    },
  },
};
</script>

<template>
  <div id="my-id" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <form @submit.prevent="login">
        <fieldset class="uk-fieldset">
          <div class="uk-margin">
            <label>Name</label>
            <input
              v-model="form.name"
              class="uk-input"
              type="text"
              placeholder="Name"
              aria-label="Name"
            />
            <p v-if="valid && !NameIsValid">Please Enter Name Valid</p>
          </div>

          <div class="uk-margin">
            <label>PhoneNumber</label>
            <input
              v-model="form.Phone"
              class="uk-input"
              type="text"
              placeholder="PhoneNumber"
              aria-label="Name"
            />
            <p v-if="valid && !phoneIsValid">Please Enter Number Phone Valid</p>
          </div>
          <div class="uk-margin">
            <label>Date of Reservation</label>
            <input
              v-model="form.date"
              class="uk-input"
              type="datetime-local"
              placeholder="Date of Reservation"
              aria-label="Name"
            />
            <p v-if="valid && !dateIsValid">Please Enter Date Valid</p>
            <p v-if="valid && !dateIsFutureValid && dateIsValid">
              Please enter the login date today's date
            </p>
          </div>
          <div class="uk-margin">
            <label>Choose BloodType</label>
            <select class="uk-select" aria-label="Select" v-model="form.blood">
              <option selected value="">Choose BloodType</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
            </select>
            <p v-if="valid && !bloodIsValid">Please Enter Number Phone Valid</p>
          </div>
          <div class="form-label fw-bold mb-4">Type of Reservation:</div>
          <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
            <label
              ><input
                class="uk-radio"
                type="radio"
                v-model="form.type"
                name="radio2"
                value="Prior"
                checked
              />
              Prior</label
            >
            <label
              ><input
                class="uk-radio"
                type="radio"
                v-model="form.type"
                value="Dierct"
                name="radio2"
              />
              Dierct</label
            >
            <label
              ><input
                class="uk-radio"
                type="radio"
                v-model="form.type"
                name="radio2"
                value="Emergency Case"
              />
              Emergency Case</label
            >
          </div>

          <div class="btn">
            <button class="uk-button uk-button-primary" type="submit">
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>
<style lang="css">
.uk-margin label {
  color: black;
  font-size: 18px;
}
.uk-margin p {
  color: red;
  font-size: 15px;
  margin: 0 !important;
}
form .btn {
  display: flex;
  justify-content: center;
}
</style>
