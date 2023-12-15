
<script>
import moment from "moment";
export default {
  props: {
    dataInfo: Object,
    loadingInfo: Boolean,
  },
  data() {
    return {
      moment: moment,
    };
  },
};
</script>
<template>
  <div id="modal-close-default" uk-modal>
    <div class="uk-modal-dialog uk-modal-body" v-if="dataInfo">
      <div class="loading" v-if="loadingInfo">
        <h3>Loading Information...</h3>
      </div>
      <div class="info" v-else>
        <h4>Patient Name :</h4>
        <span>{{ dataInfo.name }}</span>
      </div>
      <div class="info">
        <h4>Patient phone :</h4>
        <span>{{ dataInfo.Phone }}</span>
      </div>
      <div class="info">
        <h4>Patient BloodType :</h4>
        <span>{{ dataInfo.blood }}</span>
      </div>
      <div class="info">
        <h4>Date of Reservation :</h4>
        <span>
          {{ moment(dataInfo.data).format("YY-MM-DD [&nbsp;] HH:mm") }}</span
        >
      </div>
      <div class="info">
        <h4>type of Reservation : :</h4>
        <span>{{ dataInfo.type }}</span>
      </div>
    </div>
  </div>
</template>



<style scoped>
.fa-circle-exclamation {
  margin-left: 10px !important;
  font-size: 20px;
  cursor: pointer;
  color: deepskyblue;
}
.info {
  display: flex;
  gap: 10px;
}
.info h4 {
  font-size: 18px;
  color: black;
  font-weight: 500;
}
.info span {
  margin-top: 3px;
}
.uk-modal-body {
  display: flex;
  flex-direction: column;
}
.loading {
  display: flex;
  justify-content: center;
}
</style>
