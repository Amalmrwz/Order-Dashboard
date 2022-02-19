import React from 'react'

const data = [
  { orderId: "1", customerId: 1011, deliveryPincode: 560000, orderDate: "12/11/2019", items: "Sugar:5;Onion:3;Carrot:9;Bread:9;" },
  { orderId: "1", customerId: 1011, deliveryPincode: 560000, orderDate: "12/11/2019", items: "Sugar:5;Onion:3;Carrot:9;Bread:9;" },
  { orderId: "1", customerId: 1011, deliveryPincode: 560000, orderDate: "12/11/2019", items: "Sugar:5;Onion:3;Carrot:9;Bread:9;" },
  { orderId: "1", customerId: 1011, deliveryPincode: 560000, orderDate: "12/11/2019", items: "Sugar:5;Onion:3;Carrot:9;Bread:9;" },
  { orderId: "1", customerId: 1011, deliveryPincode: 560000, orderDate: "12/11/2019", items: "Sugar:5;Onion:3;Carrot:9;Bread:9;" },
  { orderId: "1", customerId: 1011, deliveryPincode: 560000, orderDate: "12/11/2019", items: "Sugar:5;Onion:3;Carrot:9;Bread:9;" }
  ]
  

function Filters() {
  return (
    <div>
          Pincode : &nbsp;&nbsp;<input id="pincode-search" onekeyup="pincodeSearch()" type="text" placeholder="Search Pincode"/>
          Date  : &nbsp;&nbsp;<input id="date-search" class="form-control" type="text"placeholder="Search Date"/>
          -
        
    </div>
  )
}

export default Filters
