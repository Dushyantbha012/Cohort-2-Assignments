/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as temps value.
  Transaction - an object like { tempemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  let expenses = {}; // intempialise a expenses object

  for (let i = 0; i < transactions.length; i++) {
    let temp = transactions[i];
    if (expenses[temp.category]) {
      expenses[temp.category] += temp.price;
    }
    else {
      expenses[temp.category] = temp.price;
    }
  }
  let keys = Object.keys(expenses);

  let output = [];
  for (let i = 0; i < keys.length; i++) {
    let category = keys[i];
    let obj = {
      category: category,
      totalSpent: expenses[category]
    }
    output.push(obj);
  }

  return output;
}

module.exports = calculateTotalSpentByCategory;
