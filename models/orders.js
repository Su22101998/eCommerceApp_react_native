import moment from 'moment';

class Order{
     constructor(id, items, totalAmount, date,image) {
        this.id =id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
        this.image =image;
     }
     get readableDate() {
      return moment(this.date).format('MMM Do YYYY, hh:mm')
     }
}
export default Order;