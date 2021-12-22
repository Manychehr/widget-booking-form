<template>
  <div class="page">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="svgsprite">
        <symbol viewBox="0 0 15 19" id="itrash">
          <path d="M13.706 2.237h-2.534V.59a.59.59 0 0 0-.598-.59l-.064.02-.043-.02h-6.04a.58.58 0 0 0-.59.59v1.647H1.295C.566 2.237 0 2.804 0 3.532v2.12h1.123v12.063A1.26 1.26 0 0 0 2.405 19h10.19a1.27 1.27 0 0 0 1.292-1.284V5.652H15v-2.12a1.28 1.28 0 0 0-1.294-1.295zm-8.692-1.06h4.972v1.06H5.014v-1.06zm7.687 16.54c0 .074-.03.106-.106.106H2.404c-.074 0-.105-.032-.105-.107V5.652h10.4v12.064zm1.113-13.243H1.187v-.942c0-.075.032-.118.107-.118h12.412c.075 0 .107.043.107.118v.942zm-4.16 2.56h1.188v9.74H9.655zm-2.736 0h1.187v9.74H6.917zm-2.737 0h1.187v9.74H4.18z"/>
        </symbol>
        <symbol viewBox="0 0 32 32" id="icalendar">
        <path d="M29.334 3H25V1a1 1 0 0 0-2 0v2h-6V1a1 1 0 0 0-2 0v2H9V1a1 1 0 0 0-2 0v2H2.667A2.666 2.666 0 0 0 0 5.666v23.667A2.666 2.666 0 0 0 2.667 32h26.667A2.665 2.665 0 0 0 32 29.333V5.666A2.665 2.665 0 0 0 29.334 3zM30 29.333c0 .368-.3.667-.666.667H2.667A.667.667 0 0 1 2 29.333V5.666C2 5.3 2.3 5 2.667 5H7v2a1 1 0 0 0 2 0V5h6v2a1 1 0 0 0 2 0V5h6v2a1 1 0 0 0 2 0V5h4.334c.367 0 .666.3.666.666v23.667zM7 12h4v3H7zm0 5h4v3H7zm0 5h4v3H7zm7 0h4v3h-4zm0-5h4v3h-4zm0-5h4v3h-4zm7 10h4v3h-4zm0-5h4v3h-4zm0-5h4v3h-4z" />
      </symbol>
      <symbol viewBox="0 0 8.937 9.994" id="irub">
        <path  fill-rule="evenodd" clip-rule="evenodd" d="M4.992 6.255c1.262 0 2.235-.278 2.92-.834s1.024-1.354 1.024-2.398c0-.993-.312-1.745-.933-2.256C7.38.256 6.445 0 5.197 0H2.32v6.994H0v1h2.32v2h1.633v-2H7v-1H3.953v-.74h1.04zm-1.04-4.888H5.09c.742 0 1.29.142 1.64.424.352.284.527.712.527 1.286 0 .62-.196 1.076-.588 1.367-.392.292-1.007.438-1.846.438h-.867V1.368z" />
      </symbol>
    </svg>

    <button class="b-button book-button" @click="showModal">забронировать</button>

    <transition name="modal">
        <div v-if="show" class="modal-shadow" @click.self="closeModal">
            <div class="modal"  v-if="shop !== null">
                <div class="modal-close" @click="closeModal">&#10006;</div>

                <h3 class="modal-title" v-text="shop.name"></h3>
                <div class="modal-content">

                    <section class="b-ptiming" v-if="!toBook">
                        <div class="b-timing" style="padding: 10px;">
                            <p>{{ shop.comment }}</p>

                            <div v-if="shop.billing_objects.length > 1">
                                <div style="display: block;">
                                    <div class="b-short-calendar">
                                        <div class="roomm_list">
                                            <div class="roomm_item" v-for="(item, index) in shop.billing_objects" :key="index" @click="clickRom(item.id)">
                                                <div :class="[item.id === selectedRom ? 'roomm_selected' : '']">{{ item.name }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="ordered" v-if="ordered">
                                <div class="b-ordered__list">
                                    <table class="b-otable">
                                        <tbody>
                                            <tr v-for="(item, index) in ordered.orders" :key="index">
                                                <td>{{ item.date }}</td>
                                                <td>{{ item.name }}</td>
                                                <td>на {{ item.totaltime }} час{{ (item.totaltime > 1 ? (item.totaltime > 4 ? 'ов' : 'а') :'') }}</td>
                                                <td>с {{ item.timeng[0] }} до {{ item.timeng[1] }}</td>
                                                <td><b>{{ item.total }}</b> р</td>
                                                <td><a href="#" class="b-icon btn-remove-from-cart" @click="removeOrder(index)"><svg><use xlink:href="#itrash"></use></svg></a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                                <!-- <a href="#fullOrder" class="b-action-button _block fbox">Показать все брони - <span></span></a> -->
                                </div>

                                <div class="b-ordered__total" style="margin-top: 0;">
                                      <span>{{ ordered.totals }}</span><svg><use xlink:href="#irub"/></svg>
                                </div>

                                <div>
                                    <a href="#" class="b-button book-button" @click="clickToBook()">забронировать</a>
                                </div>
                            </div>

                            <div style="display: flex;padding: 20px;flex-direction: row;justify-content: space-between;">
                                <v-date-picker class="inline-block h-full" v-model="date">
                                    <template v-slot="{ inputValue, togglePopover }">
                                        <div class="b-dpcontrol">
                                            <svg><use xlink:href="#icalendar"></use></svg>
                                            <div class="b-dpcontrol__name" @click="togglePopover()" >{{ selectDate }}</div>
                                            <input type="hidden" name="date" :value="inputValue">
                                        </div>
                                    </template>
                                </v-date-picker>
                                <!-- <a v-show="!ordered" href="javascript:void(0)" class="b-button book-button _disabled" style="display: inline-block;" disabled>забронировать</a> -->
                            </div>
    
                            <div class="b-timing-block cf">
                              <div class="b-timing-block__list">
                                <div class="b-timing-block__list-in">
                                  <table class="b-timing__table">
                                    <tbody>
                                      <tr>
                                        <th>&nbsp;</th>
                                        <th><b>{{ billingObjects.name }}</b></th>
                                      </tr>
                                      <tr v-for="(item, index) in periodsPrice" :key="index">
                                        <td class="b-timing__time__td" data-time=""><div class="b-timing__time" v-text="item.start"></div></td>
                                        <td>
                                          <div class="b-point tdlink" :class="{ _disabled: !item.active,  _selected: selectPeriodsPrice(index)}" @click="clickPeriodsPrice(index)">
                                            {{ item.price }}<br />
                                            <span>{{ item.start }} - {{ item.end }}</span>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                        </div>
                    </section>
                    <section class="b-pclub" v-if="toBook && !bookingResult">
                        <div class="wrap">
                            <h2>Оформление бронирования</h2>

                            <div class="b-clubblock">
                                <!-- <h4>Оформление бронирования</h4> -->

                                <div class="b-totalcount b-total">
                                    <div class="b-totalcount__name">Итого</div>
                                    <div class="b-totalcount__value">
                                        <span>{{ ordered.totals }}</span><svg><use xlink:href="#irub"></use></svg>
                                    </div>
                                </div>

                                <table class="b-otable">
                                    <tbody>
                                        <tr v-for="(item, index) in ordered.orders" :key="index">
                                            <td>{{ item.date }}</td>
                                            <td>{{ item.name }}</td>
                                            <td>на {{ item.totaltime }} час{{ (item.totaltime > 1 ? (item.totaltime > 4 ? 'ов' : 'а') :'') }}</td>
                                            <td>с {{ item.timeng[0] }} до {{ item.timeng[1] }}</td>
                                            <td><b>{{ item.total }}</b> р</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>

                            <div class="b-cluborder">
                                <b>На кого оформлять бронирование?</b>
                                <br><br>

                                <!-- <form id="booking-form" method="post" novalidate="novalidate"> -->
                                    <div class="b-formblock">

                                        <div class="b-fieldset _half-width">
                                            <div class="b-fieldset__field">
                                                <input type="text" name="name" v-model="user.name" placeholder="Имя" class="b-tfield">
                                                <label for="name" class="error"  v-text="errors.name"></label>
                                            </div>
                                        </div>

                                        <div class="b-fieldset _half-width">
                                            <div class="b-fieldset__field">
                                                <input type="text" name="lastname" v-model="user.lastname" placeholder="Фамилия" class="b-tfield">
                                                <label for="name" class="error" v-text="errors.lastname"></label>
                                            </div>
                                        </div>

                                        <div class="b-fieldset">
                                            <div class="b-fieldset__field">
                                                <input
                                                    type="tel" 
                                                    v-model="user.phone"
                                                    name="phone"
                                                    id="phone"
                                                    placeholder="+7 (555) 555-5555"
                                                    autocomplete="tel"
                                                    maxlength="19"
                                                    class="b-tfield phone"
                                                    v-phonemask
                                                  />
                                                  <label for="name" class="error" v-text="errors.phone"></label>
                                            </div>
                                        </div>

                                        <div class="b-fieldset">
                                            <div class="b-fieldset__field">
                                                <input type="text" name="email" v-model="user.email" placeholder="E-mail" class="b-tfield">
                                                <label for="email" class="error" v-text="errors.email"></label>
                                            </div>
                                        </div>

                                        <div class="b-fieldset">
                                            <div class="b-fieldset__field">
                                                <label class="b-checkbox _checked">
                                                    <input type="checkbox" name="is_oferta" v-model="user.is_oferta">
                                                    <label for="is_oferta" class="error" v-text="errors.is_oferta"></label>
                                                    Я согласен с <!-- <a href="/oferta/" target="_blank"> -->условиями оферты и обработкой персональных данных<!-- </a> -->
                                                </label>
                                            </div>
                                        </div>

                                        <div class="b-formblock__corner"></div>
                                        <div class="alert-error"></div>
                                        <div class="alert-ok"></div>

                                        <div class="b-fieldset__submit">
                                            <button type="submit" class="b-button _lower _block" @click="submitForm()">Забронировать</button>
                                        </div>

                                    </div>
                                <!-- </form> -->
                            </div>
                            
                        </div>
                    </section>
                    <section class="b-pclub" v-if="bookingResult">
                        <div class="wrap">
                            <h2>Оформление бронирования</h2>

                            <div class="b-cluborder">
                                <b>{{ bookingResult }}</b>
                                <br><br>
                                <div class="b-fieldset__submit">
                                    <button type="submit" class="b-button _lower _block" @click="submitOk()">ok</button>
                                </div>
                            </div>
                            
                        </div>
                    </section>
                </div>

                <div class="modal-footer">
                    <!-- <button class="modal-footer__button" @click="closeModal">Ок</button> -->
                </div>
                
            </div>
        </div>
    </transition>
</div>
</template>

<script>
import { DatePicker } from 'v-calendar'
// import ModalWindow from './components/modal-window.vue'

export default {
  // setup() {},
    props: {
        apiurl: {
            type: String,
            default: 'https://sauna-crm.ru/widget/shops/'
        }, 
        apitoken: {
            type: String,
            required: true
        },
        shopsid: {
            type: Number,
            required: true
        },
    },
    components: { DatePicker /* , ModalWindow */ },
    data() {
        return {
            date: new Date(),
            months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
            url: 'http://localhost:3000/2.json',
            shop: null,
            selectedPeriodsPrice: {},
            selectedRom: 0,
            ordered: false,
            show: false,
            toBook: false,
            bookingResult: false,
            user: {
                name: '',
                lastname: '',
                phone: '',
                email: '',
                is_oferta: true
            },
            autovalidate: false,
            errors: {
                name: '',
                lastname: '',
                phone: '',
                email: '',
                is_oferta: ''
            }
        }
    },

    created() {
        this.getShop()
    },

    computed: {
        selectDate() {
            return this.date.getDate() + ' ' + this.months[this.date.getMonth()] + ' ' + this.date.getFullYear()
        },
        billingObjects() {
            return this.shop.billing_objects.find(el => el.id == this.selectedRom)
        },
        periodsPrice() {
            return this.shop.billing_objects.find(el => el.id == this.selectedRom).periods_price ?? []
        },
        curDateTime() {
            return this.date.getTime()
        },
    },

    watch: {
        user: {
            handler(val, oldVal){
                if (this.autovalidate) {
                    this.checkForm()
                }
            },
            deep: true
        }
    },

    methods: {

        getShop(id) {

            fetch(this.apiurl + this.shopsid, { 
                    method: 'get', 
                    headers: {
                        "authorization": `Bearer ${this.apitoken}`,
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    credentials: "same-origin",
                    mode: "cors",
                    referrer: "Widget 0.01"
                })
                .then(response => response.json())
                .then((response) => {
                    // console.log(response.data);
                    this.shop = response.data
                    if (this.shop.billing_objects[0]) {
                        this.selectedRom = this.shop.billing_objects[0].id
                    } else {
                        this.selectedRom = 0
                    }
                    this.selectedPeriodsPrice = {}
                })
                .catch(function(error) {
                    console.log(error);
                });
        },

        getBillingObjects(id) {
            return this.shop.billing_objects.find(el => el.id == id)
        },

        getPeriodsPrice(row_id, index) {
            const billing_objects = this.getBillingObjects(row_id)
            return billing_objects.periods_price[index]?? false
        },

        clickPeriodsPrice(index) {
        if (! this.selectedPeriodsPrice[this.curDateTime]) {
            this.selectedPeriodsPrice[this.curDateTime] = []
        }
        if (! this.selectedPeriodsPrice[this.curDateTime][this.selectedRom]) {
            this.selectedPeriodsPrice[this.curDateTime][this.selectedRom] = []
        }

        this.selectedPeriodsPrice[this.curDateTime][this.selectedRom][index] = this.selectedPeriodsPrice[this.curDateTime][this.selectedRom][index] ? false : this.getPeriodsPrice(this.selectedRom, index)
        this.ordered = this.calculationOrder()
        // console.log(this.ordered);
        },

        selectPeriodsPrice(index) {
            if (! this.selectedPeriodsPrice[this.curDateTime]) {
                return false
            }
            if (! this.selectedPeriodsPrice[this.curDateTime][this.selectedRom]) {
                return false
            }
            return this.selectedPeriodsPrice[this.curDateTime][this.selectedRom][index]
        },

        clickRom(id) {
            this.selectedRom = id
        },

        calculationOrder() {
            let selectedPP = this.selectedPeriodsPrice
            let orders = []
            let totals = 0

            for (const datetime in selectedPP) {
                const roms = selectedPP[datetime]
                for (const rom_id in roms) {
                    const period = this.getBillingObjects(rom_id)
                    const interval = this.intervalToTime(period.interval)
                    const calcrom = this.calculationOrderRom(datetime, rom_id, interval, period.name)
                    totals = totals + calcrom.total
                    calcrom.id = `${datetime}_${rom_id}`
                    // console.log(calcrom);
                    orders.push(calcrom)
                }
            }

            if (totals == 0) {
                return false
            }
            return { orders: orders, totals: totals }
        },

        calculationOrderRom(datetime, rom_id, interval, name) {
            let cdate = new Date(Number(datetime))
            let selected = this.selectedPeriodsPrice[datetime][rom_id]
            // let hours = 1*60*60*1000
            // console.log(this.selectedPeriodsPrice,selected);
            let start = 0, end = 0, total = 0
            let strstart = '', strend = ''

            selected.forEach(function(item, i, arr) {
                if (item) {
                    if (start == 0) {
                        start = item.id 
                        end = item.id + interval
                        total = item.price
                        strstart = item.start 
                        strend = item.end
                    } else {
                        end = item.id + interval
                        total = total + item.price
                        strend = item.end
                    }
                }
            })

            return {
                date: cdate.getDate() + ' ' + this.months[cdate.getMonth()], 
                name: name, 
                totaltime: (end-start) / 3600, // на ' + hours + ' час'+(hours>1?(hours>4?'ов':'а'):'')+'
                timeng: [strstart, strend], 
                total: total
            }
        },

        intervalToTime(interval) {
            if (interval == 1) {
                return 1*60*60 // *1000
            }
            if (interval == 2) {
                return 30*60 // *1000
            }
            if (interval == 4) {
                return 15*60 // *1000
            }
            return 0
        },

        showModal() {
            this.show = true
        },

        closeModal() {
            this.show = false
            if (this.bookingResult) {
                this.submitOk()
            }
        },

        removeOrder(index) {
            this.ordered.orders.splice(index, 1);
        },

        clickToBook() {
            this.toBook = true
        },

        submitForm() {
            this.autovalidate = true

            if (!this.checkForm()) {
                return;
            }

            let periods = []

            for (const datetime in  this.selectedPeriodsPrice) {
                const roms =  this.selectedPeriodsPrice[datetime]

                for (const rom_id in roms) {
                    const rom = this.getBillingObjects(rom_id)
                    let period = {datetime, shop_id: this.shopsid, rom_id: rom.id, periods: []}

                    roms[rom_id].forEach(function(item, i, arr) {
                        period.periods.push(item)
                    })

                    periods.push(period)
                }
            }

            fetch(this.apiurl + this.shopsid + '/tobook', { 
                    method: 'post', 
                    headers: {
                        "authorization": `Bearer ${this.apitoken}`,
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    credentials: "same-origin",
                    mode: "cors",
                    body: JSON.stringify({client: this.user, tobooks: periods})
                })
                .then(response => response.json())
                .then((response) => {
                    console.log(response);
                    if (response.status === 'successfully') {
                        this.bookingResult = response.message
                    }
                    else {
                        this.bookingResult = 'ошибка бронирование'
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },

        errorTap(novalid, key, message) {
            if (novalid) {
                this.errors[key] = message
            }
            return !novalid
        },

        checkForm() {
            this.errors = { name: '', lastname: '', phone: '', email: '', is_oferta: '' };
            let valid = true

            valid = this.errorTap(!this.user.name, 'name', 'Это поле обязательно для заполнения')
            valid = this.errorTap(!this.user.lastname, 'lastname', 'Это поле обязательно для заполнения')
            valid = this.errorTap(!this.user.phone, 'phone', 'Это поле обязательно для заполнения')
            valid = this.errorTap(!this.user.is_oferta, 'is_oferta', 'Нужно Ваше согласие с условиями оферты')

            if (this.user.email) {
                valid = this.errorTap(!this.validEmail(this.user.email), 'email', 'E-mail введен некорректно')
            }

            return valid;
        },

        validEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },

        submitOk() {
            this.bookingResult = false
            this.toBook = false
            this.show = false
            if (this.shop.billing_objects[0]) {
                this.selectedRom = this.shop.billing_objects[0].id
            } else {
                this.selectedRom = 0
            }
            this.selectedPeriodsPrice = {}
            this.bookingResult = false
            this.ordered = false
        }

    },

    directives: {
        phonemask: {
            beforeMount(el) { 
                function replaceNumberForInput(value) {
                    let val = ''
                    const x = value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/) 
                    x[1] = '+7' 
                    val = !x[3] ? x[1] + ' (' + x[2] : x[1] + ' (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '')
                    return val
                }

                function replaceNumberForPaste(value) {
                    const r = value.replace(/\D/g, '')
                    let val = r
                    if (val.charAt(0) === '8') {
                        val = '7' + val.slice(1)
                    }
                    return replaceNumberForInput(val)
                }

                el.oninput = function(e) {
                    if (!e.isTrusted) {
                        return
                    }
                    console.log(replaceNumberForInput(this.value), this.value);
                    this.value = replaceNumberForInput(this.value)
                }

                el.onpaste = function() {
                    setTimeout(() => {
                        const pasteVal = el.value
                        this.value = replaceNumberForPaste(pasteVal)
                    })
                }

            }
        }
    },

}
</script>

<style scoped>
  @import './assets/styles/settings.css';
  @import './assets/styles/booking.css';
  @import './assets/styles/style.css';

  h3 {
    text-align: center;
  }
  .ordered {
    display: flex;
    padding: 20px;
    flex-direction: row;
    justify-content: space-between;
  }

  .h-full {
        height: 100%;
  }
  .roomm_list {
    display: flex;
    flex-direction: row;
    padding: 10px 0;
    border-bottom: solid 1px #eee;
  }
  .roomm_item {
    font-size: 16px;
    text-align: left;
    cursor: pointer;
    padding: 0 5px 0 5px;
    border-right: solid 1px #eee;
  }
  .roomm_selected {
    font-weight: bold;
  }

    .modal-shadow {
        position: absolute;
        top: 0;
        left: 0;
        min-height: 500%;
        width: 100%;
        background: rgba(0, 0, 0, 0.39);
    }

    .modal {
        background: #fff;
        border-radius: 8px;
        padding: 15px;
        width: 90%;
        min-width: 420px;
        /* max-width: 480px; */
        position: absolute;
        top: 1%;
        left: 50%;
        transform: translate(-50%, -1%);
    }

    .modal-close {
            border-radius: 50%;
            color: #000;
            background: none;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 7px;
            right: 7px;
            width: 30px;
            height: 30px;
            cursor: pointer;
    }

    .modal-title {
            color: #0971c7;
    }

    .modal-content {
            margin-bottom: 20px
    }

    .modal-footer .modal-footer__button {
                background-color: #0971c7;
                color: #fff;
                border: none;
                text-align: center;
                padding: 8px;
                font-size: 17px;
                font-weight: 500;
                border-radius: 8px;
                min-width: 150px;
    }

    .modal-enter-active, .modal-leave-active {
        transition: opacity 2s
    }

    .modal-enter, .modal-leave-to {
        opacity: 0
    }
</style>
