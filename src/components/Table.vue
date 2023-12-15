<script>
import axios from "axios";
import InfoModal from "./InfoModal.vue";
import AddModal from "./AddModal.vue";


export default {
  name: "Table",
  components: {
    InfoModal,
    AddModal,
  },
  data() {
    return {
      Patients: {},
      dataInfo: {},
      filterPatients: {},
      loading: false,
      loadingInfo: false,
    };
  },
  methods: {
    async getPatients() {
      try {
        this.loading = true;
        const { data } = await axios.get("http://localhost:3000/Patients");
        this.loading = false;
        this.Patients = data;
        this.filterPatients = data;
      } catch (error) {
        console.error(error);
        this.$toast.error("Please write in your cmd serve-jseon to run the server", {});
      }
    },
    async handleDeletePatient(id) {
      try {
        await axios.delete(`http://localhost:3000/Patients/${id}`);
        this.filterPatients = this.filterPatients.filter(
          (patient) => patient.id !== id
        );
      } catch (error) {
        console.error(error);
      }
    },
    async handleCheckPatient(data) {
      if (data.type === "Dierct" || data.type === "Emergency Case") {
        data.type = "Current";
        document.querySelectorAll(".fa-check").forEach((element) => {
          element.classList.add("isDi");
        });
        setTimeout(() => {
          this.handleDeletePatient(data.id);
          document.querySelectorAll(".fa-check").forEach((element) => {
            element.classList.remove("isDi");
          });
        }, 5000);
      }
    },
    filteredPatients() {
      if (this.filterType === "") {
        this.filterPatients = Object.assign([], this.Patients); // نسخ البيانات الأصلية
      } else {
        this.filterPatients = this.Patients.filter(
          (patient) => patient.type === this.filterType
        );
      }
    },
    SearchInPatients(search) {
      if (search === "") {
        this.filterPatients = Object.assign([], this.Patients);
      } else {
        this.filterPatients = this.Patients.filter((patient) =>
          patient.name.toLowerCase().includes(search.toLowerCase())
        );
      }
    },
    async getById(id) {
      try {
        this.infoId = id;
        this.loadingInfo = true;
        const { data } = await axios.get(
          `http://localhost:3000/Patients/${id}`
        );
        this.loadingInfo = false;
        this.dataInfo = data;
      } catch (error) {
        console.error(error);
      }
    },
    addPatients(data) {
      this.filterPatients.push(data);
      // console.log(data);
    },
  },
  mounted() {
    this.getPatients();
  },
};
</script>
<template>
  <div class="content">
    <div class="title"><h1>Patient information</h1></div>
    <div class="filters">
      <div class="name">
        <label for="name">Search by name :</label>
        <input
          id="name"
          v-model="search"
          type="text"
          class="uk-input"
          placeholder="Name"
          aria-label="Name"
          @input="SearchInPatients(search)"
        />
      </div>
      <div class="select">
        <label for="reservation-type">Reservation Type:</label>
        <select
          class="uk-select"
          aria-label="Select"
          id="reservation-type"
          v-model="filterType"
          @change="filteredPatients"
        >
          <option selected value="">All</option>
          <option value="Dierct">Dierct</option>
          <option value="Prior">Prior</option>
          <option value="Emergency Case">Emergency Case</option>
          <option value="Current">Current</option>
        </select>
      </div>
    </div>
    <div v-if="loading" class="loading">
      <h1>Loading.....</h1>
    </div>
    <div class="loading" v-else-if="filterPatients.length === 0">
      <h1>No Patients</h1>
    </div>
    <table v-else class="uk-table uk-table-striped uk-table-responsive">
      <thead>
        <tr>
          <th>-</th>
          <th>Patient Name</th>
          <th>waiting Status</th>
          <th>Type of Reservation</th>
          <th>Handling</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(data, index) in filterPatients"
          :key="index"
          :id="`state${data.id}`"
        >
          <td>{{ data.id }}</td>
          <td>{{ data.name }}</td>
          <td>
            <span v-if="data.type === 'Prior'">is Coming</span>
            <span
              v-else-if="data.type === 'Dierct'"
              class="wait"
              :id="`state${data.id}`"
              >is Waiting</span
            >
            <span v-else-if="data.type === 'Current'" class="cur"
              >is Current</span
            >
            <span v-else class="danger" :id="`state${data.id}`"
              >Dangerous Situation</span
            >
          </td>
          <td>{{ data.type }}</td>
          <td class="icons">
            <!-- قالب المكون -->
            <i
              class="fa-solid fa-circle-exclamation"
              uk-toggle="target: #modal-close-default"
              @click="getById(data.id)"
            ></i>

            <InfoModal :dataInfo="dataInfo" :loadingInfo="loadingInfo" />
            <i
              v-if="data.type === 'Prior'"
              @click="handleDeletePatient(data.id)"
              class="fa-solid fa-trash"
            ></i>
            <i
              @click="handleCheckPatient(data)"
              v-else
              class="fa-solid fa-check"
            ></i>
          </td>
        </tr>
      </tbody>
    </table>
    <AddModal :filterPatients="filterPatients" @addPatients="addPatients" />
  </div>
</template>
<style scoped>
.content {
  margin: 30px 0;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 10px;
}
.uk-table {
  width: 90%;
  margin: 0 auto;
}
.uk-table th {
  color: black;
  font-weight: 300;
}
.icons i {
  margin-left: 10px !important;
  font-size: 20px;
  cursor: pointer;
}
.fa-circle-exclamation {
  color: deepskyblue;
}
.fa-trash {
  color: red;
}
.fa-check {
  color: green;
}
.cur {
  color: red;
}
.isDi {
  color: #e6dcdc;
  cursor: no-drop !important;
}
.filters {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}
.filters .name,
.filters .select {
  display: flex;
  flex-direction: column;
}
.uk-input {
  width: fit-content;
}
.select label,
.name label {
  color: black;
}
.loading {
  display: flex;
  justify-content: center;
}
@media (max-width: 767px) {
  .filters {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
