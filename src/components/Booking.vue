<template>
  <div class="b-timing-block__list">
    <div class="b-timing-block__list-in">
      <table class="b-timing__table">
        <tbody>
          <tr>
            <th>&nbsp;</th>
            <th>
              <b>Корт 1</b>
            </th>
            <!-- <th>
              <b>Корт 2</b>
              <br />открытый <br />грунт
            </th> -->
          </tr>
          <tr v-for="(item, index) in list" :key="index">
            <td class="b-timing__time__td" data-time="">
              <div class="b-timing__time" v-text="item.start"></div>
            </td>
            <td>
              <div class="b-point tdlink" :class="{ _disabled: !item.active,  _selected: selected[index]}" @click="tdSelected(index)">
                {{ item.price }}<br />
                <span>{{ item.start }} - {{ item.end }}</span>
              </div>
            </td>
            <!-- <td class="c1391">
              <a href="#" class="b-point _disabled" style="height: auto"
                >750 р<br /><span>08:00 - 08:30</span></a
              >
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  // setup() {},
  data() {
        return {
            url: 'http://localhost:3000/1.json',
            list: [],
            selected: []
        }
  },

  created() {
      this.getList()
        // console.log(this.list)
  },

  methods: {
    getList() {
      fetch(this.url, {
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json, text-plain, */*",
              "X-Requested-With": "XMLHttpRequest",
              // "X-CSRF-TOKEN": token
          },
                // method: 'post',
                method: 'get',
                credentials: "same-origin",
                // body: JSON.stringify({
                //     name: 'Tushar',
                //     number: '78987'
                // })
      })
      .then(response => response.json())
      .then((response) => {
          console.log(response.data);
          this.list = response.data;
      })
      .catch(function(error) {
          console.log(error);
      });
    },

    tdSelected(index) {
      this.selected[index] = this.selected[index] ? false : this.list[index]
    }
  }
};
</script>

<style>
  .tdlink {
    height: auto;
    cursor: pointer;
  }
</style>